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
    <div className="my-6 animate-slideUp">
      {/* <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div> */}
      <h3 className="mb-3 text-2xl leading-snug md:text-3xl">
        <Link
          as={`/blog/${slug}`}
          href="/blog/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>

      <p className="mb-3 text-lg leading-relaxed">{excerpt}</p>
      <div className="text-lg text-gray-500 ">
        <DateFormatter dateString={date} />
      </div>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  );
}
