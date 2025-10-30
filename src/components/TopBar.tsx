import Robot from '../assets/Robot.png';

export const TopBar = () =>  {
    return (
        <div className="flex items-center gap-3 h-[72px] w-full px-4 bg-white border-b border-[#E5E5E5] mb-9">
          {/* 아이콘 박스 */}
          <div className="grid place-items-center w-11 h-11 rounded-2xl bg-[#4173FF] shadow-[0_1px_6px_rgba(0,40,150,0.47)]">
            <img src={Robot} alt="Robot" className="w-7 h-7" />
          </div>
      
          {/* 텍스트 */}
          <div className="leading-tight">
            <div className="text-[17px] font-semibold text-gray-900">마스외전 챗봇</div>
            <div className="text-[13px] text-gray-500">
              마스외전에 대해 궁금한게 있다면 질문해주세요.
            </div>
          </div>
        </div>
      );
}