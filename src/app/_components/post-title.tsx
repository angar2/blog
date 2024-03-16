import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="max-w-2xl mx-auto text-2xl font-bold tracking-tighter md:text-4xl">
      {children}
    </h1>
  );
}
