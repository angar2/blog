interface StyleProps {
  title: string;
  descriptions: string[];
}
export default function StylePart(style: StyleProps) {
  return (
    <div className="mt-2 text-2xs tracking-wider sm:text-sm sm:mt-4">
      <code className="text-purple-800">export class </code>
      <code className="font-semibold text-red-600">{style.title} </code>
      <code>{'{'}</code>
      <div className="flex flex-col my-1 ml-6 sm:my-2 sm:ml-8">
        {style.descriptions.map((text, j) => (
          <code key={j} className="mt-1 sm:mt-2">
            {text}
          </code>
        ))}
      </div>
      <code>{'}'}</code>
    </div>
  );
}
