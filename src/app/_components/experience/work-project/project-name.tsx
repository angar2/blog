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
        <div className="flex justify-center items-center max-w-16 w-12 p-2 aspect-square overflow-hidden shadow-d  border-black rounded-md md:w-full">
          {/* <img alt="logo" src="" className="w-auto" /> */}
          <div className="w-full h-full rounded-md bg-[#008B6B]"></div>
        </div>
        <div className="ml-2 md:ml-4">
          <h3 className="ml-1 text-2xl font-bold md:text-4xl md:mb-0">
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
