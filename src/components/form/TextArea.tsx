interface TextAreaProps {
  text: string;
  name: string;
  onChange: (e: any) => void;
}

const TextArea = ({ text, name, onChange }: TextAreaProps) => {
  return (
    <div className="mb-[18px]">
      <div className="flex justify-between mb-2">
        <div className="font-bold">지원 동기 및 포부</div>
        <div className="text-[#4173FF] font-semibold text-[14px]">
          {text.length}/500
        </div>
      </div>
      <textarea
        name={name}
        value={text}
        onChange={onChange}
        className="w-full h-56 rounded-[10px] p-4 border border-[#dddddd] resize-none bg-white"
        maxLength={500}
      />
    </div>
  );
};

export default TextArea;
