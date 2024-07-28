'use client';
import Image from 'next/image';

type Props = {
  clickModal: () => void;
};

export function PortfolioModal({ clickModal }: Props) {
  return (
    <div
      onClick={clickModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white px-3 rounded-md max-w-5xl h-[94vh] overflow-auto"
      >
        <button
          onClick={clickModal}
          className="sticky top-1 left-full text-2xl text-black bg-transparent border-none cursor-pointer z-50"
        >
          &#x2715;
        </button>
        <Image
          src="/assets/images/experience/portfolio.png"
          alt="Portfolio"
          className="w-full"
          width={1024}
          height={5184}
        />
      </div>
    </div>
  );
}
