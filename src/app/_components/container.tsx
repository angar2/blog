type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="container mx-auto py-8 sm:py-12 px-5 2xl:py-36">
      {children}
    </div>
  );
};

export default Container;
