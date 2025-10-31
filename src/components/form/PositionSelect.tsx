import { useState } from "react";
import PositionChip from "./PositionChip";

const PositionSelect = () => {
  const position = [
    "프론트엔드",
    "백엔드",
    "디자이너",
    "기획자",
    "AI 엔지니어",
  ];
  const [selectPosition, setSelectPosition] = useState<string[]>([]);

  return (
    <div className="mb-[18px]">
      <div className="flex items-end">
        <div className="font-bold">포지션</div>
        <div className="text-[#4173FF] font-medium mb-0.5 ml-0.5">*</div>
      </div>
      <div className="mb-2 text-[12px] text-[#a6a6a6] font-normal">
        중복선택 가능
      </div>
      <div className="flex flex-wrap gap-4">
        {position.map((item) => (
          <PositionChip
            position={item}
            selectPosition={selectPosition}
            setSelectPosition={setSelectPosition}
          />
        ))}
      </div>
    </div>
  );
};

export default PositionSelect;
