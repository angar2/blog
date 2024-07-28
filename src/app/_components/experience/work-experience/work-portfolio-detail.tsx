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
          className="object-cover w-full"
          width={160}
          height={90}
        />
      </div>
      <div className="flex items-center justify-center">
        <span className="text-sm md:text-base cursor-pointer">
          포트폴리오 자세히 보기
        </span>
      </div>
      {showModal && <PortfolioModal clickModal={clickModal} />}
    </div>
  );
}
