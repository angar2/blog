import { type Author } from '@/interfaces/author';
import Link from 'next/link';
import Avatar from './avatar';
import CoverImage from './cover-image';
import DateFormatter from './date-formatter';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div className="my-6 p-6 animate-slideUp rounded-lg hover:shadow-sm">
      <Link as={`/blog/${slug}`} href="/blog/[slug]">
        {/* <div className="mb-5">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div> */}
        <h3 className="mb-3 text-lg font-bold leading-snug md:text-2xl">
          {title}
        </h3>
        <p className="mb-3 text-sm leading-relaxed md:text-base line-clamp-3">
          {excerpt}
        </p>
        <div className="text-sm text-gray-500 ">
          <DateFormatter dateString={date} />
        </div>
        {/* <Avatar name={author.name} picture={author.picture} /> */}
      </Link>
    </div>
  );
}
