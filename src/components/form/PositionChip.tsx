interface PositionChipProps {
  position: string;
  selectPosition: string[];
  setSelectPosition: (array: string[]) => void;
}

const PositionChip = ({
  position,
  selectPosition,
  setSelectPosition,
}: PositionChipProps) => {
  let style;
  if (selectPosition.includes(position)) {
    style = `bg-[#4173FF] text-white border border-[#4173FF]`;
  } else {
    style = `bg-white text-[#757575] border border-[#d8d8d8]`;
  }

  const onSelect = () => {
    if (selectPosition.includes(position)) {
      setSelectPosition(selectPosition.filter((item) => item != position));
    } else {
      setSelectPosition([...selectPosition, position]);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`h-10 rounded-full px-4 py-3.5 font-semibold items-center flex justify-center w-fit ${style}`}
    >
      {position}
    </div>
  );
};

export default PositionChip;
