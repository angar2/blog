// 텍스트 변환
export const TextFormat = (text: string) => {
  const parts = [];
  let lastIndex = 0;

  text.replace(
    /(\*\*(.*?)\*\*|@@(.*?)\[(.*?)\]@@)/g,
    (match, _, boldText, linkText, url, index) => {
      parts.push(text.slice(lastIndex, index));

      if (boldText) {
        // 강조 처리
        parts.push(<strong key={index}>{boldText}</strong>);
      } else if (linkText && url) {
        // 링크 처리
        parts.push(
          <a
            href={url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gray-500 italic underline"
          >
            {linkText}
          </a>
        );
      }

      lastIndex = index + match.length;
      return match;
    }
  );

  parts.push(text.slice(lastIndex));

  return parts;
};
