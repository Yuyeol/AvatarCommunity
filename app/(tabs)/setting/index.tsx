import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthRoute from "@/components/authRoute";
import useAuth from "@/hooks/queries/useAuth";
export default function SettingScreen() {
  const { logout } = useAuth();
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text onPress={logout}>로그아웃</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
