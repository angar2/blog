import { Metadata } from 'next';
import { createHash } from 'crypto';
import Container from '@/app/_components/container';
import Header from '../_components/header/header';
import Experience from '../_components/experience/experience';
import ExperienceFobidden from '../_components/experience/experience-fobidden';
import { ACCESS_PASSWORD } from '@/lib/constants';

interface ExperienceMainProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: 'Experience',
  description: `My Experience.`,
};

// function generateSHA256Hash(value: string): string {
//   return createHash('sha256').update(value).digest('hex');
// }

export default function ExperienceMain({ searchParams }: ExperienceMainProps) {
  // const isAccessible =
  //   searchParams?.accessKey === generateSHA256Hash(ACCESS_PASSWORD);

  return (
    <main>
      <Container>
        {/* {isAccessible ? <Experience /> : <ExperienceFobidden />} */}
        <Experience />
      </Container>
    </main>
  );
}
