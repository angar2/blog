import Avatar from '../common/avatar';
import CoverImage from '../common/cover-image';
import DateFormatter from '../common/date-formatter';
import { PostTitle } from '@/app/_components/post/post-title';
import { type Author } from '@/interfaces/author';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
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
        <div className="mb-6 text-sm md:mb-8 text-gray-500 md:text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
