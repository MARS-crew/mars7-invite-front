interface LongButtonProps {
  text: string;
  onClickHandler: () => void;
}

const LongButton = ({ text, onClickHandler }: LongButtonProps) => {
  return (
    <button
      onClick={onClickHandler}
      className="w-full h-[51px] rounded-[10px] bg-[#4173FF] text-white font-bold drop-shadow-[0_1px_3px_rgba(0,21,104,0.37)]"
    >
      {text}
    </button>
  );
};

export default LongButton;
