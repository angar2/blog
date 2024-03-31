interface StackChipTagProps {
  stacks: string[];
}
export default function StackChipTag({ stacks }: StackChipTagProps) {
  return (
    <>
      {stacks.map((stack, index) => (
        <div
          key={index}
          className="flex justify-center items-center w-[5.5rem] h-[1.75rem] p-2 bg-[#2C2C2C] rounded-lg sm:w-[8.25rem] sm:h-[2.25rem] max-lg:rounded-md"
        >
          <p>{stack}</p>
        </div>
      ))}
    </>
  );
}
