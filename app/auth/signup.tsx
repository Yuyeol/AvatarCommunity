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

export default function SignupScreen() {
  const { signupMutation } = useAuth();
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const onSubmit = (formValues: FormValues) => {
    const { email, password } = formValues;
    signupMutation.mutate({ email, password });
  };
  return (
    <FormProvider {...signupForm}>
      <View style={styles.inputContainer}>
        <EmailInput />
        <PasswordInput submitBehavior="submit" />
        <PasswordConfirmInput />
      </View>
      <FixedBottomCTA
        label="회원가입"
        onPress={signupForm.handleSubmit(onSubmit)}
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
