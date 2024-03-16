'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOGO_IMAGE_URL } from '@/lib/constants';
import { useState } from 'react';
import MobileNav from './mobile-nav';
import Portal from './portal';

interface HeaderMenuType {
  path: string;
  name: string;
}

const headerMenu: HeaderMenuType[] = [
  { path: '/experience', name: 'Experience' },
  { path: '/blog', name: 'Blog' },
  { path: '/projects', name: 'Projects' },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ path, name }: HeaderMenuType) => {
    const isActive = pathname === path || pathname.startsWith(`${path}/`);
    return (
      <Link
        href={path}
        className={`ml-4 first:ml-0 ${
          isActive ? 'text-gray-900' : 'text-gray-400'
        } font-semibold transition-colors duration-300 hover:text-gray-900`}
      >
        {name}
      </Link>
    );
  };

  return (
    <header className='flex justify-between mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-3xl md:tracking-tighter'>
      <Link href='/'>
        <Image
          alt='logo'
          src={LOGO_IMAGE_URL}
          width={192}
          height={192}
          style={{ width: '42%', height: 'auto' }}
        />
      </Link>
      <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg
          width='24'
          height='18'
          viewBox='0 0 40 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='40' height='6' fill='#333' />
          <rect y='12' width='40' height='6' fill='#333' />
          <rect y='24' width='40' height='6' fill='#333' />
        </svg>
      </button>
      <nav className='hidden md:flex md:justify-start'>
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
