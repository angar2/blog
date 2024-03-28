import { EXPERIENCE_BANNER_IMAGE_URL } from '@/lib/constants';
import ExperienceStyle from './experience-style';
import ExperienceWork from './experience-work';
import ExperienceProject from './experience-project';

export default function Experience() {
  return (
    <section className="max-w-5xl mx-auto 3xl:max-w-6xl">
      <div className="w-auto min-w-[20rem] min-h-20 mt-6 mb-8 flex items-start overflow-hidden rounded-sm border-[0.15rem] border-black md:h-48 md:mb-12 md:rounded-ls">
        <img src={EXPERIENCE_BANNER_IMAGE_URL} alt="banner" />
      </div>
      <ExperienceWork />
      <ExperienceProject />
      <ExperienceStyle />
    </section>
  );
}
