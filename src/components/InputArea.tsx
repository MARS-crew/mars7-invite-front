import { useState } from "react";
import Send from "../assets/send.png";

interface InputAreaProps {
  onSend: (text: string) => void;
}

export default function InputArea({ onSend }: InputAreaProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <div className="w-full p-4 pb-6">
      <div className="flex gap-2 items-center max-w-4xl mx-auto">
        <input
          className="flex-1 h-14 border-[0.5px] border-[#D9D9D9] px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ boxShadow: "0px 1px 3px 1px rgba(162, 162, 162, 0.22)" }}
          placeholder="마스외전에 관해서 물어보세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="h-14 w-14 bg-[#4173FF] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
        >
          <img src={Send} className="h-8 w-8" alt="Send" />
        </button>
      </div>
      <div className="text-center mt-2">
        <span className="text-xs text-gray-500">
          AI가 생성한 답변은 정확하지 않을 수 있습니다.
        </span>
      </div>
    </div>
  );
}
