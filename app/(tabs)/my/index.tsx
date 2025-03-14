import AuthRoute from "@/components/authRoute";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>내 정보</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
