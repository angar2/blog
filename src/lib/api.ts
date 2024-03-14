import { Post } from '@/interfaces/post';
import { Experience } from '@/interfaces/experience';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

const experiencesDirectory = join(process.cwd(), '_experiences');

export function getExperienceSlugs() {
  return fs.readdirSync(experiencesDirectory);
}

export function getExperienceBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(experiencesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Experience;
}

export function getExperience(): Experience {
  const slugs = getExperienceSlugs();
  const experiences = getExperienceBySlug(slugs[0]);
  return experiences;
}
