'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PortfolioModal } from '../common/portfolio-modal';

export function WorkPortfolioDetail() {
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <div
      onClick={clickModal}
      className="w-fit px-4 md:px-0 cursor-pointer hover:underline"
    >
      <div className="w-32 md:w-40 overflow-hidden rounded-md border hover:shadow-d">
        <Image
          src="/assets/images/experience/portfolio_cover.png"
          alt="Portfolio"
          className="object-cover w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
          width={160}
          height={90}
        />
      </div>
      <div className="flex items-center justify-center">
        <span className="mr-0.5 text-xs md:text-base cursor-pointer">
          포트폴리오 자세히 보기
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2ZM21 20H3V6H21V20ZM6 8V18H10V16H8V10H10V8H6ZM16 16H14V18H18V8H14V10H16V16Z"
            fill="black"
          />
        </svg>
      </div>
      {showModal && <PortfolioModal clickModal={clickModal} />}
    </div>
  );
}
