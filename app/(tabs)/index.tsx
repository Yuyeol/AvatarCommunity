import CustomButton from "@/components/CustomButton";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>홈스크린</Text>
      <CustomButton label="확인" onPress={() => console.log("확인")} />
    </SafeAreaView>
  );
}
