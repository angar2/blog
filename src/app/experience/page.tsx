import Container from '@/app/_components/container';
import Header from '../_components/header';
import { Metadata } from 'next';
import Experience from '../_components/experience';

export const metadata: Metadata = {
  title: 'Projects',
  description: `My Crafted Projects.`,
};

export default async function ExperienceMain() {
  return (
    <main>
      <Container>
        <Header />
        <Experience />
      </Container>
    </main>
  );
}
