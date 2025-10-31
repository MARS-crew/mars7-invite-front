import { useState } from "react";
import ArrowDown from "../../assets/icon/ArrowDown.png";
import ArrowUp from "../../assets/icon/ArrowUp.png";
import gray from "../../assets/icon/check/gray.png";
import lightGray from "../../assets/icon/check/lightGray.png";
import blue from "../../assets/icon/check/blue.png";
import white from "../../assets/icon/check/white.png";

const PrivacyConsent = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className="mb-[18px]">
      <div className="flex items-end mb-2">
        <div className="font-bold">개인정보 동의서</div>
        <div className="text-[#4173FF] font-medium mb-0.5 ml-0.5">*</div>
      </div>

      <div className="w-full rounded-[10px]">
        <div
          className={`rounded-t-[10px] flex items-center ${
            checked ? "bg-[#4173FF]" : "bg-[#DDDDDD]"
          } h-[65px] px-3.5`}
        >
          <div
            onClick={() => setChecked(!checked)}
            className={`rounded-full w-5 h-5 border ${
              checked ? "border-white" : "border-[#919191]"
            }  flex items-center justify-center`}
          >
            <img width={8.7} height={5.22} src={checked ? white : gray} />
          </div>
          <div
            className={`font-bold ml-[11px] text-${
              checked ? "white" : "black"
            }`}
          >
            전체동의
          </div>
        </div>

        {modal ? (
          <div className="rounded-b-[10px] h-60 bg-white border border-[#cfcfcf] px-3.5">
            <div className="flex items-center justify-between mt-[21px]">
              <div className="flex items-center">
                <div
                  onClick={() => setChecked(!checked)}
                  className={`rounded-full w-5 h-5 border ${
                    checked ? "border-[#4173FF]" : "border-[#cfcfcf]"
                  }  flex items-center justify-center`}
                >
                  <img
                    width={8.7}
                    height={5.22}
                    src={checked ? blue : lightGray}
                  />
                </div>
                <div className="ml-[11px] text-[#676767]">
                  개인정보 수집 및 이용 동의
                </div>
              </div>
              <img
                onClick={() => setModal(!modal)}
                src={modal ? ArrowUp : ArrowDown}
                width={12}
                height={6}
              />
            </div>
            <div className="font-light text-[14px] w-[300px] h-[154px] m-auto mt-[11px]">
              마스외전은 신청결과 안내를 위해 이름, 연락처, <br /> 학번 등의
              최소한의 개인정보를 수집하며, 해당 <br /> 정보는 결과 전달 후 즉시
              파기됩니다.
              <br /> 수집된 개인정보는 위 목적 외에는 사용되지 않으며,
              <br /> 제3자에게 제공되지 않습니다. 개인정보 제공을
              <br /> 거부할 경우에는 신청에 불이익이 있을 수 있음을 <br />
              알려드립니다.
            </div>
          </div>
        ) : (
          <div
            className={`rounded-b-[10px] flex items-center justify-between h-[65px] px-3.5 bg-white border border-[#cfcfcf]`}
          >
            <div className="flex items-center">
              <div
                onClick={() => setChecked(!checked)}
                className={`rounded-full w-5 h-5 border ${
                  checked ? "border-[#4173FF]" : "border-[#cfcfcf]"
                }  flex items-center justify-center`}
              >
                <img
                  width={8.7}
                  height={5.22}
                  src={checked ? blue : lightGray}
                />
              </div>
              <div className="ml-[11px] text-[#676767]">
                개인정보 수집 및 이용 동의
              </div>
            </div>

            <img
              onClick={() => setModal(!modal)}
              src={modal ? ArrowUp : ArrowDown}
              width={12}
              height={6}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyConsent;
