interface FormInputProps {
  width: string;
  text: string;
}

const FormInput = ({ width, text }: FormInputProps) => {
  return (
    <div className="mb-[18px]">
      <div className="flex items-end mb-2">
        <div className="font-bold">{text}</div>
        <div className="text-[#4173FF] font-medium mb-0.5 ml-0.5">*</div>
      </div>
      <input
        style={{ width: width }}
        className={`h-[54px] border border-[#dddddd] p-4 rounded-[10px] bg-white`}
      />
    </div>
  );
};

export default FormInput;
