interface BannerImageProps {
  imageUrl: string;
}
export default function BannerImage({ imageUrl }: BannerImageProps) {
  return (
    <div className="w-auto min-w-[20rem] min-h-20 mt-6 mb-8 flex items-start overflow-hidden rounded-sm border-[0.15rem] border-black md:h-48 md:mb-12 md:rounded-ls">
      <img src={imageUrl} alt="banner" />
    </div>
  );
}
