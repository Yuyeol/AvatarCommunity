import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

export default function DescriptionInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="description"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length <= 5) {
            return "5글자 이상 입력해주세요.";
          }
        },
      }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          autoFocus
          label="내용"
          placeholder="내용을 입력해주세요."
          returnKeyType="next"
          value={value}
          onChangeText={onChange}
          error={error?.message}
          multiline
        />
      )}
    />
  );
}
