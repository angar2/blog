import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="max-w-2xl mx-auto mb-12 text-5xl font-bold leading-tight tracking-tighter text-center md:leading-none md:text-left">
      {children}
    </h1>
  );
}
