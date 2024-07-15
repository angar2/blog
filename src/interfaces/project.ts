import { type Author } from './author';

export type Project = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  description: string;
  ogImage: {
    url: string;
  };
  content: string;
  stacks: string[];
  preview?: boolean;
};
