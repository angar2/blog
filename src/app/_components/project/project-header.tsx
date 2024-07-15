import { type Author } from '@/interfaces/author';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  stacks: string[];
};

export function ProjectHeader({
  title,
  stacks,
}: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tighter md:text-4xl">
        {title}
      </h1>
      <div className="my-2 md:my-4">
        {/* <div className="mb-4 text-sm md:mb-6 text-gray-500 md:text-lg">
          <DateFormatter dateString={date} />
        </div> */}
        <div className="flex flex-wrap mb-6 md:mb-8">
          {stacks.map((stack, index) => (
            <pre
              key={index}
              className={`my-1 mr-2 px-2 border-[0.0625rem] rounded-md`}
            >
              <code className={`text-xs text-[#9D4AD1] md:text-sm`}>
                #{stack}
              </code>
            </pre>
          ))}
        </div>
      </div>
    </div>
  );
}
