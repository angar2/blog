import { type Author } from '@/interfaces/author';
import Link from 'next/link';
import DateFormatter from '../common/date-formatter';

type Props = {
  category: string;
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  category,
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <Link as={`/blog/${slug}`} href="/blog/[slug]">
      <div className="p-4 mb-4 rounded-lg hover:shadow-sm md:p-6 md:m-0">
        <div className="w-fit h-fit mb-2 px-1.5 rounded-sm bg-[#2C2C2C] md:mb-3">
          <p className="text-xs text-[#FFF5EF] md:text-sm">{category}</p>
        </div>
        <h3 className="mb-3 text-lg font-bold leading-snug md:text-xl">
          {title}
        </h3>
        <p className="mb-3 text-sm leading-relaxed md:text-base line-clamp-3">
          {excerpt}
        </p>
        <div className="text-sm text-gray-500 ">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </Link>
  );
}
