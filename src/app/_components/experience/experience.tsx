import WorkStyle from './work-style/work-style';
import WorkExperience from './work-experience/work-experience';
import WorkProject from './work-project/work-project';
import BannerImage from './common/banner-image';
import { EXPERIENCE_BANNER_IMAGE_URL } from '@/lib/constants';

export default function Experience() {
  return (
    <section className="max-w-5xl mx-auto 3xl:max-w-6xl">
      {/* <BannerImage imageUrl={EXPERIENCE_BANNER_IMAGE_URL} /> */}
      <WorkExperience />
      <WorkProject />
      <WorkStyle />
    </section>
  );
}
