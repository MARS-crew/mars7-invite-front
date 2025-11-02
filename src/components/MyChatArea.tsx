
interface MyChatAreaProps {
  chatContent: string;
  className?: string;
}

export default function MyChatArea({ chatContent, className = "" }: MyChatAreaProps) {
  return (
    <div className={`bg-[#4173FF] py-3.5 px-4 text-white text-base rounded-2xl my-8 inline-block font-medium max-w-[336px] ${className}`}>
      {chatContent}
    </div>
  );
}