import * as ImagePicker from "expo-image-picker";

function getFormDataImages(
  key: string,
  images: ImagePicker.ImagePickerAsset[]
) {
  const formData = new FormData();
  images.forEach(({ uri, mimeType = "image/jpeg" }) => {
    const file = {
      uri,
      type: mimeType,
      name: uri.split("/").pop(),
    };
    // 좋지않은 타입 우회방식인듯
    formData.append(key, file as unknown as File);
  });
  return formData;
}

export { getFormDataImages };
