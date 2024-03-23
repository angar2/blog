type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto py-8 px-5 ">{children}</div>;
};

export default Container;
