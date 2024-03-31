import { TextFormat } from '@/lib/utils/textUtils';

interface BulletedListProps {
  list: string[];
}
export default function BulletedList({ list }: BulletedListProps) {
  return (
    <ul className="pl-2 sm:pl-4">
      {list.map((content, index) => (
        <li key={index} className="ml-4 mb-2 text-sm list-disc md:text-lg">
          {TextFormat(content)}
        </li>
      ))}
    </ul>
  );
}
