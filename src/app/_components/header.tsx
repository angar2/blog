import Link from 'next/link';

const Header = () => {
  return (
    <h2 className="flex justify-between mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-3xl md:tracking-tighter">
      <Link href="/">mtseo</Link>
      <div className="flex justify-start">
        <Link
          href="/blog"
          className="font-normal text-gray-400 transition-colors duration-300 hover:text-gray-900"
        >
          blog
        </Link>
        <Link
          href="/projects"
          className="ml-4 font-normal text-gray-400 transition-colors duration-300 hover:text-gray-900"
        >
          Projects
        </Link>
      </div>
    </h2>
  );
};

export default Header;
