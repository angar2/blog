import Container from '@/app/_components/container';
import Header from '../_components/header/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: `My Crafted Projects.`,
};

export default function ProjectsMain() {
  return (
    <main>
      <Container></Container>
    </main>
  );
}
