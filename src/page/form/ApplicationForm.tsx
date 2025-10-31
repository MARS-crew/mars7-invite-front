import FormInput from "../../components/form/FormInput";
import PositionSelect from "../../components/form/PositionSelect";
import TextArea from "../../components/form/TextArea";
import TopBar from "../../components/form/TopBar";
import PrivacyConsent from "../../components/form/PrivacyConsent";
import { useNavigate } from "react-router-dom";
import LongButton from "../../components/button/LongButton";

const ApplicationForm = () => {
  const navigate = useNavigate();

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

        <LongButton
          text="제출하기"
          onClickHandler={() => navigate("/submit")}
        />
      </div>
    </div>
  );
};

export default ApplicationForm;
