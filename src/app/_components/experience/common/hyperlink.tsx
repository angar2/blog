import Link from 'next/link';

interface HyperlinkProps {
  size: number;
  text: string;
  url: string;
}
export default function Hyperlink({ size, text, url }: HyperlinkProps) {
  return (
    <Link
      className="flex items-center text-sm font-medium text-[#4744FF] md:text-lg"
      href={url}
    >
      <span className="mr-1">{text}</span>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 12H18.8L16.3 9.5L17.7 8.1L22.6 13L17.7 17.9L16.3 16.5L18.8 14H9V12ZM21 17.4V20H3V6H21V8.6L23 10.6V4C23 2.9 22.1 2 21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V15.4L21 17.4Z"
          fill="#4744FF"
        />
      </svg>
    </Link>
  );
}