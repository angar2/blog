export default function Main() {
  return (
    <section className='max-w-5xl mx-auto'>
      <div className='flex flex-col items-center mx-auto gap-1 lg:flex-row lg:m-0 lg:justify-between lg:items-start'>
        {/* Left */}
        <div className='flex flex-col min-w-[20rem] flex-shrink-0 mb-8 lg:mb-0 lg:w-1/3 '>
          {/* Comment */}
          <p className='mb-0.5 tracking-tighter text-right font-semibold'>
            매번 <span className='text-[#CE0004]'>이유</span>를 찾는 개발자
          </p>
          {/* Image */}
          <div className='flex justify-center items-center w-[20rem] max-w-[32rem] max-h-[14rem] overflow-hidden rounded-sm border-[0.15rem] border-black sm:w-full sm:max-h-[24rem] lg:max-h-full'>
            <img
              alt='main'
              src='assets/images/main/banner.png'
              className='mb-8 lg:m-0 sm:mb-16 lg:mb-0'
            />
          </div>
        </div>
        {/* Right */}
        <div className='flex flex-col w-[20rem] min-w-[20rem] gap-6 lg:w-2/3 sm:w-full sm:max-w-[32rem] max-w-[20rem] lg:mt-6 lg:gap-8'>
          {/* Stack */}
          <div className='flex rounded-sm border-[0.0625rem] border-black sm:w-full lg:min-h-[15rem]'>
            <div className='flex justify-center items-center w-1/4 bg-[#2C2C2C]'>
              <p className='rotate-[-90deg] text-2xl font-black text-white sm:text-4xl'>
                Stack
              </p>
            </div>
            <div className='flex flex-col items-end py-3 px-5 w-3/4 text-center text-xs font-medium text-[#FFF5EF] sm:py-5 sm:px-6 sm:text-base'>
              <div className='flex gap-3 box-border sm:gap-6'>
                <div className='flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md'>
                  <p>Typescript</p>
                </div>
                <div className='flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md'>
                  <p>C#</p>
                </div>
              </div>
              <div className='flex justify-start gap-3 mt-2.5 sm:gap-6'>
                <div className='flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md'>
                  <p>Node.js</p>
                </div>
                <div className='flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md'>
                  <p>.NET</p>
                </div>
              </div>
              <div className='flex justify-start gap-3 mt-2.5 sm:gap-6'>
                <div className='flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md'>
                  <p>Nest.js</p>
                </div>
                <div className='flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-white rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md'>
                  <p></p>
                </div>
              </div>
              <div className='flex justify-start gap-3 mt-5 sm:gap-6 sm:mt-8'>
                <div className='flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md'>
                  <p>MySQL</p>
                </div>
                <div className='flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md'>
                  <p>AWS</p>
                </div>
              </div>
            </div>
          </div>
          {/* Menu */}
          <div className='flex justify-end items-center gap-3 text-center text-xs font-normal sm:text-base'>
            <div className='w-[3rem] mr-1 overflow-hidden sm:w-[5rem] sm:mr-6'>
              <img alt='arrow' src='assets/images/main/arrow.png' />
            </div>
            <a
              href='/blog'
              className='flex justify-center items-center w-[6.75rem] h-[2rem] bg-[#008B6B] text-[#FFF5EF] rounded-sm hover:shadow-2xl sm:w-[10.75rem] sm:h-[3.5rem]'
            >
              <p>Blog</p>
            </a>
            <a
              href='/projects'
              className='flex justify-center items-center w-[6.75rem] h-[2rem] bg-white border-[0.0625rem] border-black  text-black rounded-sm hover:shadow-2xl sm:w-[10.75rem] sm:h-[3.5rem]'
            >
              <p>Projects</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
