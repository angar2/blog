import Avatar from '../common/avatar';
import CoverImage from '../common/cover-image';
import DateFormatter from '../common/date-formatter';
import { PostTitle } from '@/app/_components/post/post-title';
import { type Author } from '@/interfaces/author';
import CodeTag from '../experience/common/code-tag';
import Link from 'next/link';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: string[];
};

export function PostHeader({ title, coverImage, date, author, tags }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {/* <div className=" mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div> */}
      <div className="max-w-2xl mx-auto my-2 md:my-4">
        {/* <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
        <div className="mb-4 text-sm md:mb-6 text-gray-500 md:text-lg">
          <DateFormatter dateString={date} />
        </div>

        <div className="flex flex-wrap mb-6 md:mb-8">
          {/* <CodeTag codes={tagsWithHash} /> */}
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
    </>
  );
}
