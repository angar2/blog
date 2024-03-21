export default function Main() {
  return (
    <section className="flex max-w-5xl mx-auto">
      <div className="flex flex-col mx-auto gap-1 md:flex-row md:m-0 md:gap-56">
        {/* Image */}
        <div className="flex flex-col max-w-[318px] mb-8 md:mb-0">
          <p className="mb-0.5 tracking-tighter text-right font-medium">
            맨날 더 나은 것을 <span className="text-[#CE0004]">고민</span>하는
            개발자
          </p>
          <div className="flex justify-center items-center w-fill h-56 overflow-hidden rounded-sm border-2 border-black md:h-full">
            <img
              alt="main"
              src="assets/images/main.png"
              className="mb-8 md:m-0"
            />
          </div>
        </div>
        {/* Contact */}
        <div className="flex flex-col max-w-[500px] gap-6">
          {/* Stack */}
          <div className="flex w-full rounded-sm border-[0.0625rem] border-black md:border-[0.0625rem]">
            <div className="flex">
              <div className="flex justify-center items-center w-1/4 bg-[#2C2C2C]">
                <p className="rotate-[-90deg] text-2xl font-black text-white md:text-4xl">
                  Stack
                </p>
              </div>
              <div className="flex flex-col self-end py-3 mx-5 w-3/4 text-center text-xs font-medium text-[#FFF5EF] md:py-5 md:ml-16 md:mr-6 md:text-base">
                <div className="flex gap-3 md:gap-6">
                  <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#2C2C2C] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                    <p>Typescript</p>
                  </div>
                  <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#2C2C2C] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                    <p>C#</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-2.5 md:gap-6">
                  <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#2C2C2C] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                    <p>Node.js</p>
                  </div>
                  <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#2C2C2C] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                    <p>.NET</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-2.5 md:gap-6">
                  <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#2C2C2C] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                    <p>Nest.js</p>
                  </div>
                  <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-white rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                    <p></p>
                  </div>
                </div>
                <div className="flex gap-3 mt-5 md:gap-6 md:mt-8">
                  <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#2C2C2C] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                    <p>MySQL</p>
                  </div>
                  <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#2C2C2C] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                    <p>AWS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Menu */}
          <div className="flex self-end gap-3 text-center text-xs font-normal md:text-base">
            <div className="flex justify-center items-center w-[108px] h-[32px] bg-[#008B6B] text-white rounded-sm hover:shadow-2xl md:w-[172px] md:h-[56px]">
              Blog
            </div>
            <div className="flex justify-center items-center w-[108px] h-[32px] bg-white border-[0.0625rem] border-black  text-black rounded-sm hover:shadow-2xl md:w-[172px] md:h-[56px] md:border-[0.0625rem]">
              Projects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
