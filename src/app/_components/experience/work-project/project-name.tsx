import Image from 'next/image';

export interface projectNameProps {
  name: string;
  description: string;
  period: string;
  image: string;
}
export default function ProjectName(project: projectNameProps) {
  return (
    <div className="w-full mb-4 lg:mb-0 pb-4 lg:w-2/4 sm:mb-8">
      <div className="flex items-start pl-2 md:mb-2">
        {/* 이미지 */}
        <div className="flex justify-center items-center w-12 h-12 md:w-16 md:h-16 p-2 overflow-hidden shadow-d border-black rounded-md">
          {project.image ? (
            <Image
              src={project.image}
              alt="Project Logo"
              className="object-cover"
              width={48}
              height={48}
            />
          ) : (
            <div className="w-full h-full rounded-md bg-[#008B6B]"></div>
          )}
        </div>
        <div className="ml-2 md:ml-4">
          <h3 className="ml-1 text-xl font-bold md:text-3xl md:mb-0">
            {project.name}
          </h3>
          <h5 className="ml-1 text-sm font-medium md:text-base">
            {project.description}
          </h5>
          <div className="flex items-center">
            <p className="ml-1 text-xs text-gray-500 md:text-sm">
              {project.period}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
