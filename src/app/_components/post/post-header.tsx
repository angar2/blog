import DateFormatter from '../common/date-formatter';
import { type Author } from '@/interfaces/author';
import Link from 'next/link';

type Props = {
  category: string;
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: string[];
};

export function PostHeader({
  category,
  title,
  coverImage,
  date,
  author,
  tags,
}: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-fit h-fit mb-2 px-1.5 rounded-sm bg-[#2C2C2C] md:mb-4">
        <p className="text-sm text-[#FFF5EF] md:text-base">{category}</p>
      </div>
      <h1 className="text-2xl font-bold tracking-tighter md:text-4xl">
        {title}
      </h1>
      <div className="my-2 md:my-4">
        <div className="mb-4 text-sm md:mb-6 text-gray-500 md:text-lg">
          <DateFormatter dateString={date} />
        </div>

        <div className="flex flex-wrap mb-6 md:mb-8">
          {tags.map((tag, index) => (
            <pre
              key={index}
              className={`my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]`}
            >
              <Link href={`/blog?tag=${tag}`}>
                <code className={`text-xs text-[#9D4AD1] md:text-sm`}>
                  #{tag}
                </code>
              </Link>
            </pre>
          ))}
        </div>
      </div>
    </div>
  );
}
