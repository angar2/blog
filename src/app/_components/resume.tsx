import { Experience } from '@/interfaces/experience';
import markdownStyles from './markdown-styles.module.css';

type Props = {
  experience: Experience;
};

export function Resume({ experience }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: experience.content }}
      />
    </div>
  );
}
