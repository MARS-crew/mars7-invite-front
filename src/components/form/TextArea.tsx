import { useState } from "react";

const TextArea = () => {
  const [text, setText] = useState<string>("");

  const onChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setText(value);
    }
  };
  return (
    <div className="mb-[18px]">
      <div className="flex justify-between mb-2">
        <div className="font-bold">지원 동기 및 포부</div>
        <div className="text-[#4173FF] font-semibold text-[14px]">
          {text.length}/500
        </div>
      </div>
      <textarea
        onChange={onChange}
        className="w-full h-56 rounded-[10px] p-4 border border-[#dddddd]"
        maxLength={500}
      />
    </div>
  );
};

export default TextArea;
