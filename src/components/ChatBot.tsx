
import { useState } from 'react';
import Robot from '../assets/Robot.png';
import { TypingWaveDots } from './Loding';

interface ChatBotProfileProps {
  message?: string;
  messageTitle? : string;
  timestamp?: string;
  isTyping?: boolean;
  className?: string;
  sendType?: string;
  onSelect?: (text: string, index: number) => void;
  options?: string[];
  isDisabled?: boolean;
  resultImage?: string;
  resultRole?: string;
  showLearnMore?: boolean;
}

const defaultOptions = [
    "아늑하고 예쁜 분위기, 인테리어 감성",
    "편하게 사용할 수 있는 실용성 중심",
    "방 구조나 수납 공간 효율성 고민",
    "스마트 기기나 최신 기술 활용 관심",
  ];

// 줄바꿈을 처리하는 함수
const formatMessage = (message: string) => {
  return message.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      {index < message.split('\n').length - 1 && <br />}
    </span>
  ));
};

export const ChatBotProfile = ({ 
  message = "안녕하세요! 무엇을 도와드릴까요?", 
  messageTitle = "",
  timestamp = "11:30", 
  isTyping = false,
  className = "",
  sendType = "chat",
  onSelect,
  options = defaultOptions,
  isDisabled = false,
  resultImage,
  resultRole,
  showLearnMore = false,
}: ChatBotProfileProps) => {
    const [selected, setSelected] = useState<number | null>(null);
    
  return (
    <div className={`flex ${className}`}>
      <div className='bg-[#4173FF] w-11 h-11 flex items-center justify-center rounded-full mr-2'>
        <img src={Robot} alt="Robot" className="w-7 h-7" />
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium text-gray-700">마외 봇</span>
        <div className='flex mt-1'>
          <div className="relative w-full rounded-2xl border border-neutral-200 bg-white p-4 drop-shadow-[0_0_2px_[#00000040]] inline-block">
            {sendType === "select" ? (
                <div className="flex flex-col gap-3 w-full max-w-md">
                <p className="text-[16px] font-medium mb-1">
                  {messageTitle}
                </p>
                {options.map((text, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelected(idx);
                        onSelect?.(text, idx);
                      }
                    }}
                    disabled={isDisabled}
                    className={`w-full border rounded-xl p-4 text-sm transition-all duration-200 
                      ${
                        selected === idx
                          ? "bg-[#4173FF]/[0.08] border-[#4173FF] text-black drop-shadow-[0_0_0_2px_[#4173FF40]] font-semibold"
                          : "border-neutral-200 text-[#000000] hover:bg-[#FFFFFF]"
                      }`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            ) : resultImage ? (
              <div className="flex flex-col items-center gap-3">
                <img src={resultImage} alt={resultRole} className="w-full max-w-[200px] object-contain" />
                <div className="font-normal text-base text-center">{formatMessage(message)}</div>
              </div>
            ) : showLearnMore ? (
              <div className="flex flex-col gap-3">
                <div className="font-normal text-base">{formatMessage(message)}</div>
                <button className="flex items-center justify-center gap-2 bg-[#4173FF] text-white px-4 h-12 rounded-lg hover:bg-[#4173FF]/90 transition-colors">
                  <span className="text-sm font-medium">마스외전 알아보기</span>
                  <img src="/search.svg" alt="search" className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
                isTyping ? <TypingWaveDots /> : <div className="font-normal text-base">{formatMessage(message)}</div>
            )}
          </div>
          <div className='ml-2 self-end'>
            <span className="text-xs text-gray-400">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
