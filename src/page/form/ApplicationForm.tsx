import FormInput from "../../components/form/FormInput";
import PositionSelect from "../../components/form/PositionSelect";
import TextArea from "../../components/form/TextArea";
import TopBar from "../../components/form/TopBar";
import PrivacyConsent from "../../components/form/PrivacyConsent";
import { useNavigate } from "react-router-dom";
import LongButton from "../../components/button/LongButton";
import { useEffect, useState } from "react";
import type { formData } from "../../types/form";
import axios from "axios";
import { positionMapToEng, positionMapToKor } from "../../utils/position";

const ApplicationForm = () => {
  const [data, setData] = useState<formData>({
    name: "",
    department: "",
    age: 0,
    phoneNumber: "",
    positions: [],
    motivation: "",
    privacyAgreement: false,
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiAiUrl = import.meta.env.VITE_AI_API_URL;
  const navigate = useNavigate();

  const onChangeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const textAreaHandler = (e: any) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const agreePrivacy = () => {
    setData({ ...data, privacyAgreement: !data.privacyAgreement });
  };

  const onSubmit = () => {
    if (!data.name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!data.department.trim()) {
      alert("학과를 입력해주세요.");
      return;
    }
    if (!data.age || isNaN(Number(data.age)) || Number(data.age) <= 0) {
      alert("나이를 올바르게 입력해주세요.");
      return;
    }
    if (!data.phoneNumber.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!data.positions.length) {
      alert("포지션을 선택해주세요.");
      return;
    }

    if (!data.privacyAgreement) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    const cleanPhoneNumber = data.phoneNumber.replace(/-/g, "");

    const positionsInEng = data.positions.map((p) => positionMapToEng[p]);

    try {
      const payload = {
        ...data,
        positions: positionsInEng,
        phoneNumber: cleanPhoneNumber,
      };

      axios
        .post(`${apiUrl}/user`, payload)
        .then((res) => {
          if (res.status === 201) {
            console.log("데이터 전송 성공:", res);
            localStorage.setItem("name", payload.name);
            localStorage.setItem("phoneNumber", payload.phoneNumber);
            navigate("/submit");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("신청폼 전송 중 오류 발생");
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sessionId") != null) {
      try {
        axios
          .post(`${apiAiUrl}/chat/send`, {
            session_id: localStorage.getItem("sessionId"),
            message: "종료",
          })
          .then((res) => {
            console.log(res.data);

            const data = res.data.profile_data;
            setData({
              name: data.name || "",
              department: data.department || "",
              age: data.age || "",
              phoneNumber: "",
              positions: data.positions
                ? data.positions.map((p: string) => positionMapToKor[p])
                : [],

              motivation: data.motivation || "",
              privacyAgreement: false,
            });
            localStorage.removeItem("sessionId");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }

    console.log(data);
  }, []);

  return (
    <div>
      <TopBar />
      <div className="px-4 py-[29px] bg-[#FAFBFF]">
        <FormInput
          value={data.name}
          onChange={onChangeHandler}
          name="name"
          width="100%"
          text="이름"
        />
        <FormInput
          value={data.department}
          onChange={onChangeHandler}
          name="department"
          width="100%"
          text="학과"
        />
        <FormInput
          value={data.age}
          onChange={onChangeHandler}
          name="age"
          width="25%"
          text="나이"
        />
        <FormInput
          value={data.phoneNumber}
          onChange={onChangeHandler}
          name="phoneNumber"
          width="100%"
          text="전화번호"
        />
        <PositionSelect
          selectPosition={data.positions}
          setSelectPosition={(value) => setData({ ...data, positions: value })}
        />
        <TextArea
          text={data.motivation}
          name="motivation"
          onChange={textAreaHandler}
        />
        <PrivacyConsent
          data={data.privacyAgreement}
          agreePrivacy={agreePrivacy}
        />

        <LongButton text="제출하기" onClickHandler={onSubmit} />
      </div>
    </div>
  );
};

export default ApplicationForm;
