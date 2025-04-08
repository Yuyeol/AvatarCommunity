import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/InputField";

export default function NicknameInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      control={control}
      name="nickname"
      rules={{
        validate: (data: string) => {
          if (data.length < 2) {
            return "닉네임은 2글자 이상이어야 합니다.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          inputMode="text"
          returnKeyType="next"
          submitBehavior="submit"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("introduce")}
          error={error?.message}
        />
      )}
    />
  );
}
