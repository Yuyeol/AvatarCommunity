import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import useUploadImages from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/app/utils/images";
import { useFormContext, useWatch } from "react-hook-form";

export default function PostWriteFooter() {
  const inset = useSafeAreaInsets();
  const { control, setValue } = useFormContext();
  const imageUris = useWatch({ control, name: "imageUris" });
  const uploadImages = useUploadImages();
  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert("이미지 개수 초과", "최대 5개까지 업로드 가능합니다.");
      return;
    }
    setValue("imageUris", [...imageUris, ...uris.map((uri) => ({ uri }))]);
  };
  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
    });
    if (result.canceled) {
      return;
    }
    const formData = getFormDataImages("images", result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data) => addImageUris(data),
    });
  };
  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name="camera" size={24} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
    flexDirection: "row",
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    borderRadius: 5,
  },
});
