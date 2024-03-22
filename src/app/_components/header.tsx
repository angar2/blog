'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ACCESS_PASSWORD, LOGO_IMAGE_URL } from '@/lib/constants';
import { useState } from 'react';
import MobileNav from './mobile-nav';
import Portal from './portal';
import { createHash } from 'crypto';

interface HeaderMenuType {
  path: string;
  name: string;
}

const headerMenu: HeaderMenuType[] = [
  { path: '/experience', name: 'Experience' },
  { path: '/blog', name: 'Blog' },
  { path: '/projects', name: 'Projects' },
];

function generateSHA256Hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ path, name }: HeaderMenuType) => {
    const isActive = pathname === path || pathname.startsWith(`${path}/`);
    return (
      <Link
        href={path}
        className={`h-fit first:ml-0 ${
          isActive ? 'text-[#008B6B]' : 'text-[#2C2C2C]'
        } font-medium transition-colors duration-300 hover:text-[#008B6B]`}
      >
        {name}
      </Link>
    );
  };

  return (
    <header className="flex justify-between items-center pt-3 pb-4 px-4 text-xl font-bold leading-tight tracking-tight md:tracking-tighter">
      <div>
        <Link
          href={`/experience?accessKey=${generateSHA256Hash(ACCESS_PASSWORD)}`}
        >
          <div className="absolute top-0 left-0 w-2 h-2"></div>
        </Link>
        <Link href="/">
          <img alt="logo" src={LOGO_IMAGE_URL} className="w-12 sm:w-20" />
          {/* <Image
            alt="logo"
            src={LOGO_IMAGE_URL}
            width={192}
            height={192}
            style={{ width: 48, height: 'auto' }}
          /> */}
        </Link>
      </div>
      <button className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg
          width="20"
          height="15"
          viewBox="0 0 40 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="6" fill="#2C2C2C" />
          <rect y="12" width="40" height="6" fill="#2C2C2C" />
          <rect y="24" width="40" height="6" fill="#2C2C2C" />
        </svg>
      </button>
      <nav className="hidden sm:flex sm:justify-end sm:w-full sm:mr-4 sm:gap-3">
        {headerMenu.map((menu) => (
          <NavLink key={menu.path} {...menu} />
        ))}
      </nav>
      <Portal>
        <MobileNav
          headerMenu={headerMenu}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </Portal>
    </header>
  );
};

export default Header;
