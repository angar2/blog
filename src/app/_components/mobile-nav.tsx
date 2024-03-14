import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderMenuType {
  path: string;
  name: string;
}

interface MobileNavProps {
  headerMenu: HeaderMenuType[];
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav = ({
  headerMenu,
  isMenuOpen,
  setIsMenuOpen,
}: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={`md:hidden absolute transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out flex flex-col bg-white right-0 w-3/4 h-full top-0 pt-24 z-50 border-l border-gray-200 shadow-lg`}
    >
      <button
        className="absolute top-0 right-0 mt-8 mr-8 text-2xl"
        onClick={() => setIsMenuOpen(false)}
      >
        &#x2715;
      </button>
      {headerMenu.map((menu) => {
        const isActive =
          pathname === menu.path || pathname.startsWith(`${menu.path}/`);
        return (
          <Link
            key={menu.path}
            href={menu.path}
            className={`ml-0 md:ml-4 first:ml-0 ${
              isActive ? 'text-gray-900' : 'text-gray-400'
            } font-normal transition-colors duration-300 hover:text-gray-900 p-4`}
            onClick={() => setIsMenuOpen(false)}
          >
            {menu.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
