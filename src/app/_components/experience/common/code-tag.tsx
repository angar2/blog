interface CodeTagProps {
  codes: string[];
  color?: string;
}
export default function CodeTag({ codes, color }: CodeTagProps) {
  const codeColor = color ? color : '9D4AD1';
  return (
    <>
      {codes.map((code, index) => (
        <pre
          key={index}
          className={`my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#${codeColor}]`}
        >
          <code className={`text-xs text-[#${codeColor}] md:text-sm`}>
            {code}
          </code>
        </pre>
      ))}
    </>
  );
}
