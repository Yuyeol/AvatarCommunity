import FeedItem from "@/components/FeedItem";
import { colors } from "@/constants";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import { useScrollToTop } from "@react-navigation/native";
import useGetInfiniteUserPosts from "@/hooks/queries/useGetInfiniteUserPosts";

interface UserFeedListProps {
  userId: number;
}

export default function UserFeedList({ userId }: UserFeedListProps) {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteUserPosts(userId);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      // 스크롤이 맨끝에 닿기전에 미리 reached 처리
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>게시물이 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
