import { StyleSheet, View } from "react-native";
import { colors } from "@/constants";
import CustomButton from "./CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}
export default function FixedBottomCTA({
  label,
  onPress,
}: FixedBottomCTAProps) {
  const inset = useSafeAreaInsets();
  return (
    <View
      // 아이폰의 경우 inset bottom이 확보되어야하므로 넣었고, 12는 안드로이드에 넣을 기본값으로 사용
      style={[styles.container, { paddingBottom: inset.bottom || 12 }]}
    >
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});
