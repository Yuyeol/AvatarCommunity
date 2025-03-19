import { updatePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

function useUpdatePost() {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (postId) => {
      // 수정한 게시글 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      //   모든 게시글 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      router.back();
    },
  });
}

export default useUpdatePost;
