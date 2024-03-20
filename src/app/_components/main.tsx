export default function Main() {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex flex-col mb-10 gap-6 max-md:gap-0">
        {/* Top */}
        <div className="flex justify-center gap-6 max-md:flex-col max-md:gap-0">
          {/* Intro */}
          <div className="flex flex-col grow shrink-0 basis-0 justify-center items-start pl-2 rounded-2xl w-fit max-md:px-5">
            <div className="flex flex-col ml-2 max-md:ml-0">
              <h2 className="mb-5 text-5xl font-black max-md:text-3xl max-md:mb-4">
                안녕하세요 <span className="text-[#BEA6A0]">.</span>
              </h2>
              <div className="text-3xl font-semibold max-md:text-lg max-md:tracking-tight">
                <h3 className="mb-2.5 max-md:mb-0.5">
                  사용자와 함께 일하는 백엔드 개발자,
                </h3>
                <h3 className="mb-3 max-md:mb-1">
                  <span className="text-[#794E4C] font-bold">엄관용</span>
                  입니다.
                </h3>
              </div>
            </div>
          </div>
          {/* Contact */}
          <div className="flex items-end mt-6 max-md:max-w-full max-md:m-0 max-md:justify-end">
            <div className="flex mb-3 gap-6 max-md:gap-3">
              {/* Github */}
              <div className="flex w-6/12">
                <a
                  href="https://github.com/angar2"
                  className="flex flex-col w-[100px] h-[100px] rounded-2xl shadow-lg hover:shadow-2xl bg-[#FFF5EF] max-md:w-[50px] max-md:h-[50px] max-md:rounded-lg"
                >
                  <img
                    src="assets/images/github.png"
                    className="w-full h-full"
                  />
                </a>
              </div>
              {/* Email */}
              <div className="flex w-6/12">
                <div className="flex justify-center items-center w-[100px] h-[100px] font-black text-center text-[#281713] rounded-2xl shadow-lg hover:shadow-2xl max-md:w-[50px] max-md:h-[50px] max-md:rounded-lg">
                  <p className="text-2xl max-md:text-xs">
                    <span className="text-2xl max-md:text-xs">e</span>mail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="flex gap-6 max-md:flex-col max-md:gap-0">
          {/* Left */}
          <div className="w-1/2 gap-6 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
              {/* Stack */}
              <div className="flex max-md:max-w-full rounded-2xl border-[0.05rem] border-[#F4E9E9] shadow-lg hover:shadow-2xl">
                <div className="flex">
                  <div className="flex justify-center items-center w-[119px] shrink-0 border-r-2 border-[#F4E9E9] max-md:w-[78px]">
                    <p className="rotate-[-90deg] text-4xl font-black max-md:text-2xl">
                      Stack
                    </p>
                  </div>
                  <div className="flex flex-col max-md:w-full w-[381px] max-md:w-[234px]">
                    <div className="flex flex-col grow font-medium text-center text-[#FFF5EF] whitespace-nowrap">
                      <div className="flex flex-col items-start pt-5 pb-5 pr-7 pl-16 text-lg border-b-2 border-[#F4E9E9] max-md:py-3 max-md:px-5 max-md:text-xs">
                        <div className="flex gap-3 justify-between">
                          <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#281713] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                            <p>Typescript</p>
                          </div>
                          <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#281713] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                            <p>C#</p>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-between mt-2.5">
                          <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#281713] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                            <p>Node.js</p>
                          </div>
                          <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#281713] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                            <p>.NET</p>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-between mt-2.5">
                          <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#281713] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                            <p>Nest.js</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start pt-5 pb-5 pr-7 pl-16 text-xs max-md:py-3 max-md:px-5">
                        <div className="flex gap-3 justify-between">
                          <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#281713] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                            <p>MySQL</p>
                          </div>
                          <div className="flex justify-center items-center w-[132px] h-[34px] p-2 bg-[#281713] rounded-lg max-md:w-[91px] max-md:h-[28px] max-md:rounded-md">
                            <p>AWS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="w-1/2 gap-6 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
              {/* Than */}
              <div className="flex max-md:max-w-full rounded-2xl border-[0.05rem] border-[#F4E9E9] shadow-lg hover:shadow-2xl">
                <div className="flex">
                  <div className="flex justify-center items-center w-[119px] rounded-l-2xl bg-[#281713] max-md:ml-0 max-md:w-full shrink-0 border-r-2 border-[#F4E9E9] max-md:w-[78px]">
                    <p className="rotate-[-90deg] text-4xl font-black text-white max-md:text-2xl">
                      Than
                    </p>
                  </div>
                  <div className="max-md:ml-0 max-md:w-full w-[381px] h-[238px] max-md:w-[234px] max-md:h-[180px]">
                    <div className="flex flex-col grow whitespace-nowrap">
                      <div className="flex flex-col w-full h-full pt-4 pb-5 px-8 text-2xl font-semibold max-md:px-5 max-md:py-2.5 max-md:max-w-full max-md:text-lg">
                        <div className="self-end mt-2.5 mr-12 max-md:mr-2.5 max-md:mt-1">
                          <span className="text-[#794E4C] font-black mr-4 max-md:font-bold">
                            효율
                          </span>{' '}
                          감성
                        </div>
                        <div className="self-center mt-2 max-md:mt-1">
                          빠르게{' '}
                          <span className="text-[#794E4C] font-black ml-4">
                            확실하게
                          </span>
                        </div>
                        <div className="mt-2 max-md:mt-1">
                          일단 하기{'    '}
                          <span className="text-[#794E4C] font-black ml-4">
                            계획하고 하기
                          </span>
                        </div>
                        <div className="self-end mt-2 max-md:mt-1">
                          <span className="text-[#794E4C] font-black mr-4">
                            고민하기
                          </span>{' '}
                          물어보기
                        </div>
                        <div className="self-center mt-2 max-md:mt-1">
                          <span className="text-[#794E4C] font-black mr-4">
                            떠들기
                          </span>{' '}
                          조용히하기
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
