import { GITHUB_PROFILE_URL } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from '../footer';

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
      className={`md:hidden fixed transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out flex flex-col bg-white right-0 w-3/5 h-full top-0 pt-24 z-50 border-l border-gray-200 shadow-lg`}
    >
      <button
        className="absolute top-0 right-0 mt-8 mr-8 text-2xl hover:font-black"
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
            className={`ml-4 md:ml-4 first:ml-0 ${
              isActive ? 'text-gray-900' : 'text-[#2C2C2C]'
            } text-xl font-medium transition-colors duration-300 hover:font-semibold hover:text-[#008B6B] p-4`}
            onClick={() => setIsMenuOpen(false)}
          >
            {menu.name}
          </Link>
        );
      })}
      {/* <Link
        href={GITHUB_PROFILE_URL}
        className="ml-4 p-4 self-start"
        onClick={() => setIsMenuOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="32"
          height="32"
        >
          <path
            d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
            className="fill-[#2C2C2C]"
          ></path>
        </svg>
      </Link> */}
      <div className="fixed bottom-16 ml-4">
        <Footer />
      </div>
    </nav>
  );
};

export default MobileNav;
