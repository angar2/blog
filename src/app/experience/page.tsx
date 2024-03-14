import Container from '@/app/_components/container';
import Header from '../_components/header';
import { Metadata } from 'next';
import { Resume } from '../_components/resume';
import markdownToHtml from '@/lib/markdownToHtml';
import { getExperience } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Projects',
  description: `My Crafted Projects.`,
};

export default async function ExperienceMain() {
  const experience = getExperience();

  experience.content = await markdownToHtml(experience.content || '');
  return (
    <main>
      <Container>
        <Header />
        <Resume experience={experience} />
      </Container>
    </main>
  );
}
