'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ACCESS_PASSWORD,
  GITHUB_PROFILE_URL,
  LOGO_IMAGE_URL,
} from '@/lib/constants';
import { useState } from 'react';
import MobileNav from './mobile-nav';
import Portal from './portal';
import { createHash } from 'crypto';

interface HeaderMenuType {
  path: string;
  name: string;
}

const headerMenu: HeaderMenuType[] = [
  { path: '/blog', name: 'Blog' },
  // { path: '/experience', name: 'Experience' },
  // { path: '/projects', name: 'Projects' },
];

// function generateSHA256Hash(value: string): string {
//   return createHash('sha256').update(value).digest('hex');
// }

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
    <header className="flex justify-between items-center w-full max-w-5xl mx-auto pt-3 pb-4 px-4 text-xl font-bold leading-tight tracking-tight md:tracking-tighter 3xl:max-w-6xl">
      <div>
        {/* <Link
          href={`/experience?accessKey=${generateSHA256Hash(ACCESS_PASSWORD)}`}
        >
          <div className="absolute top-0 left-0 w-2 h-2"></div>
        </Link> */}
        <Link href="/">
          <img alt="logo" src={LOGO_IMAGE_URL} className="w-12 sm:w-20" />
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
      <nav className="hidden sm:flex sm:justify-end sm:w-full sm:mr-2 sm:gap-3">
        {headerMenu.map((menu) => (
          <NavLink key={menu.path} {...menu} />
        ))}
        <Link href={GITHUB_PROFILE_URL} className="self-center ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
          >
            <path
              d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
              className="fill-[#2C2C2C]"
            ></path>
          </svg>
        </Link>
      </nav>
      <Portal>
        <MobileNav
          headerMenu={headerMenu}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm sm:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </Portal>
    </header>
  );
};

export default Header;
