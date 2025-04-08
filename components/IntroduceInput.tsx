import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

export default function IntroduceInput() {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="introduce"
      render={({ field: { ref, onChange, value } }) => (
        <InputField
          ref={ref}
          label="소개"
          placeholder="소개를 입력해주세요."
          returnKeyType="next"
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}
