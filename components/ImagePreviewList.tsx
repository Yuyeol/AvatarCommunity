import { baseUrls } from "@/api/axios";
import { ImageUri } from "@/app/types";
import { router } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

type ImagePreviewListProps = {
  imageUris: ImageUri[];
};
export default function ImagePreviewList({
  imageUris = [],
}: ImagePreviewListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${
          Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
        }/${uri}`;
        return (
          <Pressable
            key={uri + index}
            style={styles.imageContainer}
            onPress={() => {
              router.push({ pathname: "/image", params: { uri: imageUri } });
            }}
          >
            <Image source={{ uri: imageUri }} style={styles.image} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 5,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
