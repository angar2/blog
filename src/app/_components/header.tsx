'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderMenuType {
  path: string;
  name: string;
}

const headerMenu: HeaderMenuType[] = [
  { path: '/blog', name: 'Blog' },
  { path: '/projects', name: 'Projects' },
];

const Header = () => {
  const pathname = usePathname();

  const NavLink = ({ path, name }: HeaderMenuType) => {
    const isActive = pathname === path || pathname.startsWith(`${path}/`);
    return (
      <Link
        href={path}
        className={`ml-4 first:ml-0 ${
          isActive ? 'text-gray-900' : 'text-gray-400'
        } font-normal transition-colors duration-300 hover:text-gray-900`}
      >
        {name}
      </Link>
    );
  };

  return (
    <header className="flex justify-between mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-3xl md:tracking-tighter">
      <Link href="/">mtseo</Link>
      <nav className="flex justify-start">
        {headerMenu.map((menu) => (
          <NavLink key={menu.path} {...menu} />
        ))}
      </nav>
    </header>
  );
};

export default Header;
