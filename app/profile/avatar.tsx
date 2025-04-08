import { baseUrls } from "@/api/axios";
import AvatarItem from "@/components/AvatarItem";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import Tab from "@/components/Tab";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useGetAvatarItems from "@/hooks/queries/useGetAvatarItems";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Fragment, useEffect, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import Toast from "react-native-toast-message";
import { SvgUri } from "react-native-svg";
export default function AvatarScreen() {
  const navigation = useNavigation();
  const { auth, profileMutation } = useAuth();
  const pagerRef = useRef<PagerView>(null);
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const [currentTab, setCurrentTab] = useState(0);
  const [avatarItem, setAvatarItem] = useState({
    hatId: auth?.hatId ?? "",
    faceId: auth?.faceId ?? "",
    topId: auth?.topId ?? "",
    bottomId: auth?.bottomId ?? "",
    handId: auth?.handId ?? "",
    skinId: auth?.skinId ?? "01",
  });

  const getImageId = (item: string) => {
    const fileName = item.split("/").pop() ?? "";
    const [id] = fileName.split(".");
    return id;
  };

  const handlePressItem = (name: string, item: string) => {
    setAvatarItem({ ...avatarItem, [name]: getImageId(item) });
  };

  const handlePressTab = (index: number) => {
    setCurrentTab(index);
    pagerRef.current?.setPage(index);
  };

  const handleSaveAvatar = () => {
    profileMutation.mutate(avatarItem, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "저장되었습니다.",
        });
        router.back();
      },
    });
  };

  const getAvatarItemUrl = (category: string, id?: string) => {
    const baseUrl = Platform.OS === "ios" ? baseUrls.ios : baseUrls.android;

    if (category === "default" || !Boolean(id)) {
      return `${baseUrl}/default/frame.svg`;
    }
    return `${baseUrl}/items/${category}/${id}.svg`;
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, []);
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            {avatarItem.skinId && (
              <SvgUri
                uri={getAvatarItemUrl("skins", avatarItem.skinId)}
                style={styles.avatar}
              />
            )}
            <SvgUri uri={getAvatarItemUrl("default")} style={styles.avatar} />
            {avatarItem.topId && (
              <SvgUri
                uri={getAvatarItemUrl("tops", avatarItem.topId)}
                style={styles.avatar}
              />
            )}
            {avatarItem.bottomId && (
              <SvgUri
                uri={getAvatarItemUrl("bottoms", avatarItem.bottomId)}
                style={styles.avatar}
              />
            )}
            {avatarItem.hatId && (
              <SvgUri
                uri={getAvatarItemUrl("hats", avatarItem.hatId)}
                style={styles.avatar}
              />
            )}
            {avatarItem.faceId && (
              <SvgUri
                uri={getAvatarItemUrl("faces", avatarItem.faceId)}
                style={styles.avatar}
              />
            )}
            {avatarItem.handId && (
              <SvgUri
                uri={getAvatarItemUrl("hands", avatarItem.handId)}
                style={styles.avatar}
              />
            )}
          </View>
        </View>
        <View style={styles.tabContainer}>
          {["모자", "얼굴", "상의", "하의", "손", "피부"].map((tab, index) => (
            <Tab
              key={index}
              isActive={currentTab === index}
              onPress={() => handlePressTab(index)}
            >
              {tab}
            </Tab>
          ))}
        </View>
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
        >
          {[
            { data: hats, name: "hatId", id: avatarItem.hatId },
            { data: faces, name: "faceId", id: avatarItem.faceId },
            { data: tops, name: "topId", id: avatarItem.topId },
            { data: bottoms, name: "bottomId", id: avatarItem.bottomId },
            { data: hands, name: "handId", id: avatarItem.handId },
            { data: skins, name: "skinId", id: avatarItem.skinId },
          ].map((list) => (
            <FlatList
              key={list.name}
              data={list.data}
              keyExtractor={(_, index) => String(index)}
              numColumns={3}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <AvatarItem
                  uri={item}
                  isSelected={getImageId(item) === list.id}
                  onPress={() => handlePressItem(list.name, item)}
                />
              )}
            />
          ))}
        </PagerView>
      </View>
      <FixedBottomCTA label="저장" onPress={handleSaveAvatar} />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 115,
    marginBottom: 115,
  },
  avatarContainer: {
    width: 229,
    height: 229,
    borderRadius: 229,
    backgroundColor: colors.WHITE,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  avatar: {
    width: 229,
    height: 229,
    position: "absolute",
  },
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
  },
  pagerView: {
    flex: 1,
  },
});
