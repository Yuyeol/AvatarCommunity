import {
  getBottoms,
  getFaces,
  getHands,
  getHats,
  getSkins,
  getTops,
} from "@/api/avatar";
import { queryKeys } from "@/constants";
import { useQueries } from "@tanstack/react-query";

function useGetAvatarItems() {
  const [
    hatsQuery,
    facesQuery,
    topsQuery,
    bottomsQuery,
    handsQuery,
    skinsQuery,
  ] = useQueries({
    queries: [
      {
        queryKey: [queryKeys.AVATAR, "hats"],
        queryFn: getHats,
      },
      {
        queryKey: [queryKeys.AVATAR, "faces"],
        queryFn: getFaces,
      },
      {
        queryKey: [queryKeys.AVATAR, "tops"],
        queryFn: getTops,
      },
      {
        queryKey: [queryKeys.AVATAR, "bottoms"],
        queryFn: getBottoms,
      },
      {
        queryKey: [queryKeys.AVATAR, "hands"],
        queryFn: getHands,
      },
      {
        queryKey: [queryKeys.AVATAR, "skins"],
        queryFn: getSkins,
      },
    ],
  });
  return {
    hats: hatsQuery.data || [],
    faces: facesQuery.data || [],
    tops: topsQuery.data || [],
    bottoms: bottomsQuery.data || [],
    hands: handsQuery.data || [],
    skins: skinsQuery.data || [],
  };
}

export default useGetAvatarItems;
