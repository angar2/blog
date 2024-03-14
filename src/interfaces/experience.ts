import { type Author } from './author';

export type Experience = {
  slug: string;
  title: string;
  date: string;
  author: Author;
  description: string;
  content: string;
  preview?: boolean;
};
