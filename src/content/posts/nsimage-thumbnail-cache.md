---
title: '클립 하나에 33MB: NSImage 무캐시 로드를 NSCache로 잡다'
description: stash 클립보드 매니저의 이미지 썸네일이 매번 풀해상도로 로드되던 문제를, mach task_info 실측과 NSCache 캐시 레시피로 잡아낸 성능 개선 기록.
track: log
created: 2026-06-05T09:00
tags: [macos, performance, memory, swift]
---

내가 만든 macOS 메뉴바 클립보드 매니저 **stash**에 성능 개선을 붙여달라는 요청을 받았을 때, 근거로 따라온 건 코드가 아니라 비교 사례 하나였다. *"동종 도메인 다른 앱이 메모리 3GB+ 사용 케이스를 보고했다. 동일 유형의 누수·낭비 패턴이 stash에도 잠재해 있을 수 있다."* 남 얘기로 들리지 않았다. stash도 텍스트·URL·이미지·파일 클립을 최대 200건(unpinned, LRU)과 10건(pinned)까지 누적해두고 단축키로 붙여넣는 앱이라, 이미지 클립은 원본 파일이 디스크에 저장되고 클립 리스트의 각 행(`ClipRowView`)이 그 경로를 참조해 썸네일을 그린다.

더 중요한 전제가 하나 있었다. stash는 이미 완성적으로 동작하는 앱이라 <u>성능 개선으로 인한 기능 동작 변화·버그 발생을 절대 차단한다</u>는 조건이 못박혀 있었다. 그래서 시작은 개선이 아니라 정독이었다.

## 정독으로 잡은 hotspot: M1이 압도적이었다

Persistence·Services·UI·Models·App lifecycle 전 영역을 코드로 훑어 심각도순으로 정리하니, 원인이 한곳으로 모였다.

| ID | 위치 | 문제 | 영향 |
|---|---|---|---|
| **M1** | `ClipRowView.swift:163` | 메인 리스트 행이 `NSImage(contentsOfFile:)`로 풀해상도 무캐시 로드 | **Critical** — 4K 이미지 1장당 RGBA 약 33MB, 200건 누계 시 약 6GB 가능 |
| M4 | `PinSidebarView.swift:26` | `ClipRowView` 재사용 — 같은 이미지를 본체·사이드바 양쪽에서 각각 로드 | Medium |
| M5 | `PopoverPanel.swift:164` | 팝오버를 열 때마다 `NSHostingView`를 새로 만들며 이미지 재로드 | Medium |
| **B1** | `GRDBClipRepository.swift:124-143` | 손상 복구 로직이 V1~V3만 마이그레이션 등록, V4 누락 | Critical(버그) |

M1이 압도적으로 무거웠다. 이미지 한 장을 화면에 보여주자고 원본 해상도 그대로를 메모리에 올리고, 그걸 캐시 없이 매번 반복하는 구조였다. 액자에 걸 사진 한 장을 위해 매번 원본 필름을 통째로 인화해 걸었다가 버리는 셈이다. 축소 인화본을 한 번만 만들어두면 될 일을.

## 측정 인프라부터: 느낌이 아니라 숫자로

고치기 전에 먼저 쟀다. "빨라진 것 같다"는 증명이 아니다.

- **측정 도구**: `mach_task_self_`와 `task_vm_info`에서 `phys_footprint`를 뽑아내는 `MemoryProbe.residentBytes()`.
- **재현 시나리오**: 4K(3840×2160) PNG 50건 + 텍스트 100건(1KB) + 파일 50건(path만)으로 클립 200개를 만들고, 각 행을 실제 화면처럼 마운트해 이미지를 강제 디코딩한 뒤 전·후 delta를 5회 반복 평균.
- **베이스라인**: avg-delta **+1576.6MB**(2~5회차 안정값 +1580~1583MB). 회귀 게이트 452 tests 전부 PASS — 아직 코드를 안 건드렸으니 당연했다.

이미지 200장 중 실제 이미지는 절반인 50장뿐인데도 1.5GB가 넘게 튄 것이다.

## ThumbnailCache: NSCache와 다운스케일 한 줄

원인이 확정됐으니 해법은 단순했다. 화면에 필요한 크기만큼만 디코딩하고, 그 결과를 재사용하면 된다.

```swift title="Sources/UI/Theme/ThumbnailCache.swift"
@MainActor
final class ThumbnailCache {
    static let shared = ThumbnailCache()
    private let cache = NSCache<NSString, NSImage>()

    func thumbnail(for filePath: String, targetSize: NSSize) -> NSImage? {
        let key = filePath as NSString
        if let cached = cache.object(forKey: key) { return cached }
        guard let source = CGImageSourceCreateWithURL(URL(fileURLWithPath: filePath) as CFURL, nil),
              let cgImage = CGImageSourceCreateThumbnailAtIndex(source, 0, thumbnailOptions(for: targetSize))
        else { return nil }
        let nsImage = NSImage(cgImage: cgImage, size: targetSize)
        cache.setObject(nsImage, forKey: key, cost: cgImage.width * cgImage.height * 4)
        return nsImage
    }
}
```

핵심은 `CGImageSourceCreateThumbnailAtIndex`다. 원본 전체를 읽는 대신 요청한 픽셀 크기까지만 디코딩해 반환한다. 생성 옵션은 그 크기와 EXIF 방향 보정을 지정하고 원본 파일 자체의 캐싱은 꺼서, 캐시의 단일 진실을 `NSCache` 하나로 좁혔다. `totalCostLimit`은 50MB로 잡았다 — 썸네일 200장 × 평균 약 18KB ≈ 3.6MB면 충분히 커버되고 LRU eviction 여유도 넉넉하다.

> [!tip]
> 다운스케일 도입은 부작용이 아니라 이득이 될 수도 있다. 고해상도 원본을 화면 크기에 맞게 리샘플링하면서 미세한 sharpness가 오히려 개선될 여지가 있다는 점은, 개선 문서에 "부정적 회귀가 아닌 변경 가능 사항"으로 미리 못박아뒀다.

`ThumbnailCacheTests` 7개 케이스(캐시 hit 시 동일 인스턴스 반환, 다운스케일 확인, evict, totalCostLimit 검증 등)가 전부 PASS했다.

## 적용: 1줄 교체로 세 문제 동시 해소

실제 적용은 `ClipRowView.imageThumbnail`의 `NSImage(contentsOfFile:)` 호출 한 줄을 `ThumbnailCache.shared.thumbnail(for:targetSize:)`로 바꾼 게 전부였다. 반환 타입과 분기 구조는 손대지 않았다 — 회귀 0 원칙을 지키는 가장 안전한 변경이었다.

- **M1 직접 해소**: 무캐시 풀해상도 로드가 캐시된 다운스케일 로드로 바뀌었다.
- **M4 자연 해소**: `PinSidebarView`가 `ClipRowView`를 재사용하는 구조라 사이드바도 같은 캐시를 탄다.
- **M5 자연 해소**: `PopoverPanel`이 매번 뷰를 새로 만들어도 캐시 hit이라 재로드가 없다.

중복을 없애둔 재사용 구조 덕에, 수정 지점 하나의 레버리지가 셋으로 늘었다.

재측정 결과는 avg-delta **-10.1MB**(2~5회차 안정값 0~-2.1MB)였다. 즉, 베이스라인 +1576.7MB에서 약 1586MB를 줄여 **99.4% 감소**를 만든 것이다 — 같은 시나리오, 같은 잣대로 쟀으니 재현 가능한 숫자다. 회귀 게이트는 460 tests·45 suites 전부 PASS.

## 덤으로 잡은 것: 크리티컬 버그와 보류 판단

- **B1 버그**: 손상 복구 로직이 V1~V3 마이그레이션만 등록해 V4가 빠져 있었다 — multi-file 복구 시 크래시 가능. 등록 로직을 `registerAllMigrations` 헬퍼 하나로 추출해 `init`과 복구 경로 양쪽이 같은 목록을 쓰도록 고쳤다.
- **보류 판단(예: C2 — fileEntries JSON 디코드 캐시)**: *"hot-path 실제 영향이 측정으로 입증되지 않았고, 변경 site가 다수라 회귀 위험이 크다"*는 이유로 후속 task로 분리했다. 효과가 증명 안 된 개선을 위해 여러 곳을 건드리는 건 회귀 0 원칙과 맞지 않았다.
- **1-frame flicker 자율 패치**: Detail panel의 초기값이 nil이라 그라데이션 fallback이 한 프레임 깜빡이는 결함을 스스로 찾아, 초기화 시점 동기 로드로 즉시 고쳤다.

## 자가채점: 회귀 0 원칙은 지켜졌나

원칙은 명확했다.

> 성능 개선으로 인한 기능 동작 변화·버그 발생을 절대 차단한다.

결과로 보면 지켜졌다고 평가한다. 최종 `xcodebuild build`는 BUILD SUCCEEDED, `xcodebuild test`는 **461 tests·46 suites** 전부 PASS(신규 ThumbnailCache 7건, RecoverFromCorruptionV4 1건 포함)였다. 다만 무거운 메모리 측정 테스트는 기본 회귀 게이트에 상시 포함하지 않고, 임시 sentinel 파일이 있을 때만 실행되도록 격리해뒀다 — 매 빌드마다 200개 이미지를 강제 디코딩하는 비용을 일상 게이트에서 뺀 것이다.

## 마무리

이번 작업에서 남는 결론은 하나다. <u>측정 인프라를 먼저 만들고, 그다음 고친다.</u> Phase 1에서 실측 도구로 베이스라인(+1576.7MB)을 잡아뒀기 때문에, 나중의 개선 효과(-10.1MB)를 "빨라진 느낌"이 아니라 같은 시나리오로 재현 가능하게 증명할 수 있었다. 재사용 구조가 미리 정리돼 있으면, 한 곳을 고친 효과가 여러 곳으로 자연스럽게 퍼진다는 것도 이번에 확인했다.
