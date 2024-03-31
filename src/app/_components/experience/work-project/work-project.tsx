// import ProjectCommon, { ProjectCommonProps } from '../work/work-common';
// import ProjectIntro, { ProjectIntroProps } from '../work/work-project';

// const common: ProjectCommonProps = {
//   tasks: [
//     '**DB**: 데이터 모델링 및 스키마 설계',
//     '**Hosting**: AWS를 이용한 서비스 웹서버 호스팅',
//     '**Plan**: 서비스 기능 및 아키텍처 기획 부분 담당',
//     '**Develope**: 회원, 관리자 CRUD 등 주요 기능 API 구현',
//   ],
// };

// const projects: ProjectIntroProps[] = [
//   {
//     projectName: 'Fleet',
//     description: '선박 작업 관리 및 문서결재 플랫폼',
//     period: '2024.01. - 현재.',
//     tasks: [
//       '**전자문서 시스템**(결재 / 반려 / 재상신) 구현',
//       '**스케줄러** 일반 및 전자문서 연동 기능 구현',
//       '선박별 **데이터 통계** 구현',
//       '회원/관리자 타입별 **기능 권한** 설정',
//     ],
//     techStack: ['C#', '.NET', 'MySQL', 'AWS(EC2, RDS)'],
//   },
// ];

export default function WorkProject() {
  // 강조 텍스트를 감싸는 함수
  const emphasizeText = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => {
      return index % 2 === 0 ? part : <strong key={index}>{part}</strong>;
    });
  };
  return (
    <div className="mt-12 sm:mt-16">
      <div className="w-full mb-8 py-2 px-1 border-b-2 md:mb-12 md:py-4 md:px-2">
        <p className="text-xl font-medium md:text-2xl">
          Project <span className="text-2xl text-[#008B6B] md:text-4xl">.</span>
        </p>
      </div>
      <div className="flex-col lg:flex lg:flex-row lg:justify-start">
        {/* 프로젝트 */}
        <div className="w-full mb-4 lg:mb-0 pb-4 lg:w-2/4 sm:mb-8">
          <div className="flex items-start pl-2 md:mb-2">
            <div className="flex justify-center items-center max-w-16 w-12 p-2 aspect-square overflow-hidden shadow-d  border-black rounded-md md:w-full">
              {/* <img alt="logo" src="" className="w-auto" /> */}
              <div className="w-full h-full rounded-md bg-[#008B6B]"></div>
            </div>
            <div className="ml-2 md:ml-4">
              <h3 className="ml-1 text-2xl font-bold md:text-4xl md:mb-0">
                Daily Record
              </h3>
              <h5 className="ml-1 text-sm font-medium md:text-base">
                팀 프로젝트
              </h5>
              <div className="flex items-center">
                {/* <pre className="w-fit my-2 px-2 bg-gray-100 rounded-md">
              <code className="text-xs text-gray-800 md:text-sm">
                {position}
              </code>
            </pre> */}
                <p className="ml-1 text-xs text-gray-500 md:text-sm">
                  2023.12. - 현재.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 프로젝트 내용 */}
        <div className="w-full pl-4 sm:pl-24 lg:w-2/4 lg:pl-0 lg:border-0">
          <div className="pl-4 border-l-4 border-gray-400 rounded-md sm:pl-12 lg:border-0 lg:pl-4">
            <div className="mb-12 px-4 md:px-0 md:mb-16">
              <div className="mb-4 border-b-2 sm:mb-6">
                <p className="mt-2 py-1 text-base font-semibold italic md:mb-2 md:text-2xl">
                  INFORMATION .
                </p>
              </div>
              <div>
                <div className="mb-6 md:mb-8">
                  <p className="font-medium italic md:text-xl">
                    " 목표를 정하고 하루하루 채워나가는 성취 프로젝트형 플랫폼 "
                  </p>
                </div>
                <div className="flex flex-col mb-6 sm:mb-8">
                  <div className="w-fit h-fit mb-2 py-1 px-2 rounded-lg bg-[#2C2C2C] md:mb-4">
                    <p className="text-xs text-[#FFF5EF] md:text-sm">Team</p>
                  </div>
                  <ul className="pl-2 sm:pl-4">
                    {/* {tasks.map((text, index) => ( */}
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        'Back-end / Front-end(Web) / Front-end(App) - 3인'
                      )}
                    </li>
                    {/* ))} */}
                  </ul>
                </div>
                <div className="flex flex-col mb-6 sm:mb-8">
                  <div className="w-fit h-fit mb-2 py-1 px-2 rounded-lg bg-[#2C2C2C] md:mb-4">
                    <p className="text-xs text-[#FFF5EF] md:text-sm">Concept</p>
                  </div>
                  <ul className="pl-2 sm:pl-4">
                    {/* {tasks.map((text, index) => ( */}
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '**Project**: 챌린지 주제와 진행 기간 설정'
                      )}
                    </li>
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '**Task**: 달성을 위해 실천할 여러 과제를 구체적으로 계획'
                      )}
                    </li>
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '**Activity**: 과제를 실천할 때마다 체크하고 진행 현황 모니터'
                      )}
                    </li>
                    {/* ))} */}
                  </ul>
                </div>
                <div className="flex flex-wrap mb-6 md:mb-8">
                  {/* {techStack.map((text, index) => ( */}
                  <pre className="my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]">
                    <code className="text-xs text-[#9D4AD1] md:text-sm">
                      TypeScript
                    </code>
                  </pre>
                  <pre className="my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]">
                    <code className="text-xs text-[#9D4AD1] md:text-sm">
                      Nest.js
                    </code>
                  </pre>
                  <pre className="my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]">
                    <code className="text-xs text-[#9D4AD1] md:text-sm">
                      TypeORM
                    </code>
                  </pre>
                  <pre className="my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]">
                    <code className="text-xs text-[#9D4AD1] md:text-sm">
                      MySQL
                    </code>
                  </pre>
                  <pre className="my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]">
                    <code className="text-xs text-[#9D4AD1] md:text-sm">
                      AWS(EC2, RDS)
                    </code>
                  </pre>
                  <pre className="my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]">
                    <code className="text-xs text-[#9D4AD1] md:text-sm">
                      NGINX
                    </code>
                  </pre>
                  {/* ))} */}
                </div>
              </div>
            </div>
            <div className="mb-12 px-4 md:px-0 md:mb-16">
              <div className="mb-4 border-b-2 sm:mb-6">
                <p className="mt-2 py-1 text-base font-semibold italic md:mb-2 md:text-2xl">
                  WHAT DID I DO .
                </p>
              </div>
              <div>
                <div className="flex flex-col mb-6 sm:mb-8">
                  <div className="w-fit h-fit mb-2 py-1 px-2 rounded-lg bg-[#2C2C2C] md:mb-4">
                    <p className="text-xs text-[#FFF5EF] md:text-sm">
                      Designing
                    </p>
                  </div>
                  <ul className="pl-2 sm:pl-4">
                    {/* {tasks.map((text, index) => ( */}
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '기능의 특성을 살릴 수 있는 심플한 **UI/UX 디자인** → Figma 제작'
                      )}
                    </li>
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '메인/서브 콘텐츠의 **기능 및 아키텍처 설계**'
                      )}
                    </li>
                    {/* ))} */}
                  </ul>
                </div>
                <div className="flex flex-col mb-6 sm:mb-8">
                  <div className="w-fit h-fit mb-2 py-1 px-2 rounded-lg bg-[#2C2C2C] md:mb-4">
                    <p className="text-xs text-[#FFF5EF] md:text-sm">
                      developing
                    </p>
                  </div>
                  <ul className="pl-2 sm:pl-4">
                    {/* {tasks.map((text, index) => ( */}
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '최대한 **Nest.js(TypeORM)**의 기본 기능과 **Restful API**에 충실하게 활용해 서버 안정성 높히려 노력'
                      )}
                    </li>
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '메인 콘텐츠 요소(Project-Task-Activity)의 **기능 간 관계를 디테일하게 연결**하여 버그를 최대한 줄임'
                      )}
                    </li>
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        'Oauth, Email 등 **외부 라이브러리 및 API 활용**해 접근성과 확장성을 키움'
                      )}
                    </li>
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '**DB 테이블 관계**를 철저하게 설계해 무결성을 높힘'
                      )}
                    </li>
                    {/* ))} */}
                  </ul>
                </div>
                <div className="flex flex-col mb-6 sm:mb-8">
                  <div className="w-fit h-fit mb-2 py-1 px-2 rounded-lg bg-[#2C2C2C] md:mb-4">
                    <p className="text-xs text-[#FFF5EF] md:text-sm">
                      recording
                    </p>
                  </div>
                  <ul className="pl-2 sm:pl-4">
                    {/* {tasks.map((text, index) => ( */}
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText('각 기능 개발에 적용한 논리 로직 기록')}
                    </li>
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText('DB 및 API 명세서 작성 → 노션')}
                    </li>
                    <li className="ml-4 mb-2 text-sm list-disc md:text-lg">
                      {emphasizeText(
                        '프로젝트 일정/진행도, 팀 회의/기능요청 등 협업 내용 기록'
                      )}
                    </li>
                    {/* ))} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
