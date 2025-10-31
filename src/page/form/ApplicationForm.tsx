import { useState } from "react";
import FormInput from "../../components/form/FormInput";
import PositionSelect from "../../components/form/PositionSelect";
import TextArea from "../../components/form/TextArea";
import TopBar from "../../components/form/TopBar";
import PrivacyConsent from "../../components/form/PrivacyConsent";

const ApplicationForm = () => {
  return (
    <div>
      <TopBar />
      <div className="px-4 py-[29px] bg-[#FAFBFF]">
        <FormInput width="100%" text="이름" />
        <FormInput width="100%" text="학과" />
        <FormInput width="25%" text="나이" />
        <FormInput width="100%" text="전화번호" />
        <PositionSelect />
        <TextArea />
        <PrivacyConsent />

        <button className="w-full h-[51px] mt-[95px] rounded-[10px] bg-[#4173FF] text-white font-bold drop-shadow-[0_1px_3px_rgba(0,21,104,0.37)]">
          제출하기
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;
