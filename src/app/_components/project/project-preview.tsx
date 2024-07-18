import { type Author } from '@/interfaces/author';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  stacks: string[];
};

export function ProjectPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  stacks,
}: Props) {
  return (
    <Link as={`/project/${slug}`} href="/project/[slug]">
      <div className="flex flex-col p-4 mb-4 rounded-lg hover:shadow-sm md:flex-row md:p-6 md:mb-6">
        <div className="mb-4 md:mb-0 md:w-1/2">
          <div className="flex items-center justify-center rounded-lg overflow-hidden ">
            <Image
              src={coverImage}
              alt={`Cover Image for ${title}`}
              className={'object-cover'}
              width={1300}
              height={630}
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="md:ml-8">
            <h3 className="mb-3 text-lg font-bold leading-snug md:text-xl">
              {title}
            </h3>
            <p className="mb-3 text-sm leading-relaxed md:text-base line-clamp-6">
              {excerpt}
            </p>
            <div className="flex flex-wrap">
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
      </div>
    </Link>
  );
}
