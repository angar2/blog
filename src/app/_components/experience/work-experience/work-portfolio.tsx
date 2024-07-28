'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PortfolioModal } from '../common/portfolio-modal';

export function WorkPortfolio() {
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <div onClick={clickModal} className="w-fit cursor-pointer hover:underline">
      <div className="flex items-center text-sm md:text-lg font-medium cursor-pointer">
        <span className="mr-1">포트폴리오 자세히 보기</span>
      </div>
      <div className="w-32 md:w-40 overflow-hidden border rounded-md">
        <Image
          src="/assets/images/experience/portfolio_cover.png"
          alt="Portfolio"
          className="object-cover w-full"
          width={160}
          height={90}
        />
      </div>
      {showModal && <PortfolioModal clickModal={clickModal} />}
    </div>
  );
}
