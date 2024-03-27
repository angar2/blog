'use client';
import { MAIN_ARROW_IMAGE_URL, MAIN_BANNER_IMAGE_URL } from '@/lib/constants';
import React, { useState, useEffect } from 'react';

const texts = [
  '# Efficiency rather than emotion',
  '# Accurately rather than quickly',
  '# Planning before doing',
  '# Finding reasons before just skipping',
  '# Talking louder than being quiet',
];
export default function Main() {
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        const newText = currentText.substring(0, currentIndex + 1);
        setText(newText);

        if (newText === currentText) {
          // Start deleting after typing is complete
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Wait for 2 seconds before starting to delete
        }
      } else {
        // Deleting
        const newText = currentText.substring(0, currentIndex);
        setText(newText);

        if (newText === '') {
          // Reset index and stop deleting when text is completely deleted
          setIsDeleting(false);
          setCurrentIndex(0);

          // Move to the next text
          const nextIndex = (textIndex + 1) % texts.length;
          setTextIndex(nextIndex);
        }
      }

      // Update index for next iteration
      setCurrentIndex((prevIndex) => prevIndex + (isDeleting ? -1 : 1));
    };

    const typingInterval = isDeleting ? 80 : 80; // Adjust the typing and deleting speed here

    const typingTimer = setTimeout(() => {
      handleTyping();
    }, typingInterval);

    return () => clearTimeout(typingTimer);
  }, [textIndex, text, isDeleting, currentIndex]);
  return (
    <section className="max-w-5xl mx-auto pt-4 3xl:max-w-6xl sm:pt-16">
      <div className="flex flex-col items-center mx-auto gap-1 sm:gap-[10%] lg:flex-row lg:m-0 lg:justify-between lg:items-start">
        {/* Left */}
        <div className="flex flex-col min-w-[20rem] flex-shrink-1 mb-8 lg:mb-0">
          {/* Comment */}
          <p className="mb-0.5 tracking-tighter text-right font-semibold">
            매번 <span className="text-[#CE0004]">이유</span>를 찾는 개발자
          </p>
          {/* Image */}
          <div className="flex justify-center items-center w-[20rem] max-w-[32rem] max-h-[14rem] overflow-hidden rounded-sm border-[0.15rem] border-black sm:w-full sm:max-h-[24rem] lg:max-h-full 2xl:max-w-full">
            <img
              alt="banner"
              src={MAIN_BANNER_IMAGE_URL}
              className="mb-8 lg:m-0 sm:mb-16 lg:mb-0"
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col flex-shrink-0 w-[20rem] min-w-[20rem] gap-6 sm:w-full sm:max-w-[32rem] max-w-[20rem] lg:pt-6">
          {/* Stack */}
          <div className="flex rounded-sm border-[0.0625rem] border-black sm:w-full lg:min-h-[15rem]">
            <div className="flex justify-center items-center w-1/4 bg-[#2C2C2C]">
              <p className="rotate-[-90deg] text-2xl font-black text-white sm:text-4xl">
                Stack
              </p>
            </div>
            <div className="flex flex-col items-end py-3 px-5 w-3/4 text-center text-xs font-medium text-[#FFF5EF] sm:py-5 sm:px-6 sm:text-base">
              <div className="flex gap-3 box-border sm:gap-6">
                <div className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md">
                  <p>Typescript</p>
                </div>
                <div className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md">
                  <p>C#</p>
                </div>
              </div>
              <div className="flex justify-start gap-3 mt-2.5 sm:gap-6">
                <div className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md">
                  <p>Node.js</p>
                </div>
                <div className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md">
                  <p>.NET</p>
                </div>
              </div>
              <div className="flex justify-start gap-3 mt-2.5 sm:gap-6">
                <div className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md">
                  <p>Nest.js</p>
                </div>
                <div className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-white rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md">
                  <p></p>
                </div>
              </div>
              <div className="flex justify-start gap-3 mt-5 sm:gap-6 sm:mt-8">
                <div className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md">
                  <p>MySQL</p>
                </div>
                <div className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md">
                  <p>AWS</p>
                </div>
              </div>
            </div>
          </div>
          {/* Label */}
          <div className="w-full h-full py-2 px-6 rounded-sm bg-[#2C2C2C]">
            <div className="text-end text-xs text-white sm:text-base">
              <p className="inline animate-blink">{text}</p>
            </div>
          </div>
          {/* Menu */}
          <div className="flex justify-end items-center gap-3 text-center text-xs font-normal sm:text-base">
            <div className="w-[3rem] mr-1 overflow-hidden sm:w-[5rem] sm:mr-6">
              <img alt="arrow" src={MAIN_ARROW_IMAGE_URL} />
            </div>
            <a
              href="/blog"
              className="flex justify-center items-center w-[6.75rem] h-[2rem] bg-[#008B6B] text-[#FFF5EF] rounded-sm transition-colors duration-300 hover:bg-[#9D4AD1] sm:w-[10.75rem] sm:h-[3.5rem]"
            >
              <p>Blog</p>
            </a>
            <a
              href="/projects"
              className="flex justify-center items-center w-[6.75rem] h-[2rem] bg-white border-[0.0625rem] border-black  text-black rounded-sm transition-colors duration-300 hover:bg-[#2C2C2C] hover:border-0 hover:text-[#FFF5EF] sm:w-[10.75rem] sm:h-[3.5rem]"
            >
              <p>Projects</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
