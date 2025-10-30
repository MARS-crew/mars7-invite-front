// TypingWaveDots.tsx
export function TypingWaveDots() {
    return (
      <div className="flex items-center justify-center gap-3 h-6" role="status" aria-label="로딩 중">
        {/* 왼쪽 점 */}
        <span
          aria-hidden
          className="inline-block w-[10px] h-[10px] rounded-full bg-neutral-300
                     [animation:wave_1.2s_ease-in-out_infinite] [animation-delay:-.2s]"
        />
        {/* 가운데 점 (조금 크게) */}
        <span
          aria-hidden
          className="inline-block w-[14px] h-[14px] rounded-full bg-neutral-300
                     [animation:wave_1.2s_ease-in-out_infinite]"
        />
        {/* 오른쪽 점 */}
        <span
          aria-hidden
          className="inline-block w-[12px] h-[12px] rounded-full bg-neutral-300
                     [animation:wave_1.2s_ease-in-out_infinite] [animation-delay:.2s]"
        />
  
        {/* keyframes: 물결처럼 위로 살짝 튕겼다가 내려오기 */}
        <style>{`
          @keyframes wave {
            0%, 60%, 100% { transform: translateY(0) scale(1); opacity: .55; }
            30%            { transform: translateY(-6px) scale(1.15); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
  