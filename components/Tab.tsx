import { colors } from "@/constants";
import { Pressable, StyleSheet, Text } from "react-native";

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onPress?: () => void;
}

export default function Tab({ children, isActive, onPress }: TabProps) {
  return (
    <Pressable
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 38,
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: colors.WHITE,
  },
  activeContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.BLACK,
  },
  text: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  activeText: {
    color: colors.BLACK,
    fontWeight: 700,
  },
});
