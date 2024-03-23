export default function ExperienceFobidden() {
  return (
    <section className='max-w-xl mx-auto'>
      <div className='w-auto h-24 mb-2 flex items-center overflow-hidden rounded-md md:h-40 md:mb-6 md:rounded-xl'>
        <img
          src='/assets/images/experience/banner-image-403.jpg'
          alt='banner'
        />
      </div>
      <div className='flex flex-col items-center rounded-md p-2 md:rounded-2xl'>
        <p className='mx-auto my-6 text-base font-semibold md:text-2xl md:font-bold'>
          일반 접근이 허용되지 않은 페이지입니다.
        </p>
        <p className='mx-auto mb-2 text-sm font-semibold text-gray-500 md:text-xl md:font-semibold '>
          제공받은 링크로 접속해 주세요.
        </p>
      </div>
    </section>
  );
}
