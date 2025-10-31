import Arrow from "../../assets/icon/Arrow.png";

const TopBar = () => {
  return (
    <div className="h-[73px] flex items-center px-[27px] border border-x-0 border-t-0 border-b-[#e4e4e4]">
      <div className="flex items-center">
        <div className="w-1.5 h-[11px] mr-[17px]">
          <img src={Arrow} width={6} height={11} />
        </div>
        <div className="font-bold items-center">마스외전 신청</div>
      </div>
    </div>
  );
};

export default TopBar;
