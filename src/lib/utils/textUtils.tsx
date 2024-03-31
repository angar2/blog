// 강조 텍스트를 감싸는 함수
export const emphasizeText = (text: string) => {
  const parts = text.split('**');
  return parts.map((part, index) => {
    return index % 2 === 0 ? part : <strong key={index}>{part}</strong>;
  });
};
