import { colors } from "@/constants";
import Feather from "@expo/vector-icons/build/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function ImageZoomScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={28} color={colors.WHITE} />
      </Pressable>
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{ width: Dimensions.get("window").width, height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 1,
    backgroundColor: colors.BLACK,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
