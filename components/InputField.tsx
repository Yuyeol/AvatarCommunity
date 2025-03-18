import { colors } from "@/constants";
import { ForwardedRef, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  error?: string;
  rightChild?: React.ReactNode;
}

export default forwardRef(function InputField(
  {
    label,
    variant = "filled",
    error,
    rightChild = null,
    ...props
  }: InputFieldProps,
  ref: ForwardedRef<TextInput>
) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          styles[variant],
          props.multiline && styles.multiline,
          Boolean(error) && styles.error,
        ]}
      >
        <TextInput
          ref={ref}
          placeholderTextColor={colors.GRAY_500}
          style={[styles.input, styles[`${variant}Text`]]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
        {rightChild}
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.BLACK,
    marginBottom: 5,
  },
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standard: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  filledText: {},
  standardText: {
    color: colors.BLACK,
  },
  outlinedText: {
    color: colors.ORANGE_600,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  error: {
    fontSize: 12,
    color: colors.ORANGE_600,
    marginTop: 5,
  },
  multiline: {
    height: 200,
    alignItems: "flex-start",
    paddingVertical: 10,
  },
});
