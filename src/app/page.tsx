import Container from '@/app/_components/container';
import Header from './_components/header/header';
import Main from './_components/main/main';

export default function Index() {
  return (
    <main className="flex-grow">
      <Container>
        <Main />
      </Container>
    </main>
  );
}
