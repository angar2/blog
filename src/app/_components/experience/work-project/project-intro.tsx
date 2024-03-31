type ComponentProps = {
  component: React.ComponentType;
};
export default function ProjectIntro({ component: Component }: ComponentProps) {
  return (
    <div className="w-full pl-4 sm:pl-24 lg:w-2/4 lg:pl-0 lg:border-0">
      <Component />
    </div>
  );
}
