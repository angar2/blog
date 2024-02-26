'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderMenuTypes = {
  path: string;
  name: string;
};

const headerMenu: HeaderMenuTypes[] = [
  { path: '/blog', name: 'Blog' },
  { path: '/projects', name: 'Projects' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <h2 className="flex justify-between mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-3xl md:tracking-tighter">
      <Link href="/">mtseo</Link>
      <div className="flex justify-start">
        {headerMenu.map((menu, i) => (
          <Link
            key={menu.path}
            href={`${menu.path}`}
            className={`${i > 0 ? `ml-4` : ``} ${
              pathname === menu.path || pathname.startsWith(`${menu.path}/`)
                ? `text-gray-900`
                : `text-gray-400`
            } font-normal text-gray-400 transition-colors duration-300 hover:text-gray-900`}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </h2>
  );
};

export default Header;
