import { EXPERIENCE_BANNER_403_IMAGE_URL } from '@/lib/constants';
import BannerImage from './common/banner-image';

export default function ExperienceFobidden() {
  return (
    <section className="max-w-xl mx-auto">
      <BannerImage imageUrl={EXPERIENCE_BANNER_403_IMAGE_URL} />
      <div className="flex flex-col items-center rounded-md p-2 md:rounded-2xl">
        <p className="mx-auto my-6 text-base font-semibold md:text-2xl md:font-bold">
          일반 접근이 허용되지 않은 페이지입니다.
        </p>
        <p className="mx-auto mb-2 text-sm font-semibold text-gray-500 md:text-xl md:font-semibold ">
          제공받은 링크로 접속해 주세요.
        </p>
      </div>
    </section>
  );
}
