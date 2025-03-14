import FixedBottomCTA from "@/components/FixedBottomCTA";
import { StyleSheet, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import PasswordConfirmInput from "@/components/PasswordConfirmInput";
import PasswordInput from "@/components/PasswordInput";
import EmailInput from "@/components/EmailInput";
import useAuth from "@/hooks/queries/useAuth";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function LoginScreen() {
  const { loginMutation } = useAuth();
  const loginForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (formValues: FormValues) => {
    const { email, password } = formValues;
    loginMutation.mutate({ email, password });
  };
  return (
    <FormProvider {...loginForm}>
      <View style={styles.inputContainer}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedBottomCTA
        label="로그인"
        onPress={loginForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
