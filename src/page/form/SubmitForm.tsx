import { useNavigate } from "react-router-dom";
import white from "../../assets/icon/check/white.png";
import progress from "../../assets/progress.png";
import LongButton from "../../components/button/LongButton";

const SubmitForm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="rounded-full bg-[#4173FF] w-[49px] h-[49px] flex items-center justify-center">
        <img src={white} width={21.3} height={12.78} />
      </div>
      <div className="font-bold text-[25px] mt-[15px]">
        신청이 완료되었습니다!
      </div>
      <div className="font-[15px] text-[#666666] text-center mt-2.5 mb-[35px]">
        지원해주신 분들께는 빠른 시일내에
        <br /> 면접관련 연락을 드릴 예정입니다. <br />
        지원해 주셔서 감사합니다.
      </div>
      <img src={progress} width={277} height={68} />
      <div className="mt-[78px] mb-[66px]">
        <div className="mb-3 ml-px font-bold">요약 정보</div>
        <div className="w-[335px] h-[162px] border border-[#DDDDDD] rounded-[10px]">
          <div className="h-[54px] flex justify-between px-4 items-center">
            <div className="font-bold text-[#626262]">모집 기간</div>
            <div className="font-semibold">11.10 - 11.21</div>
          </div>
          <hr className="border-[#DCDADA] w-[312px] h-px m-auto" />
          <div className="h-[54px] flex justify-between px-4 items-center">
            <div className="font-bold text-[#626262]">이름</div>
            <div className="font-semibold">최혜림</div>
          </div>
          <hr className="border-[#DCDADA] w-[312px] h-px m-auto" />
          <div className="h-[54px] flex justify-between px-4 items-center">
            <div className="font-bold text-[#626262]">전화번호</div>
            <div className="font-semibold">010 7132 8582</div>
          </div>
        </div>
      </div>
      <LongButton
        text="처음으로 돌아가기"
        onClickHandler={() => navigate("/")}
      />
    </div>
  );
};

export default SubmitForm;
