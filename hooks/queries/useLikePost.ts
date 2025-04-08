import { useMutation } from "@tanstack/react-query";
import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/app/types";

function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    // optimistic update: api 요청을 기다리지 않고 처리. api 요청이 느릴때 사용하자.
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);
      const userId = Number(user?.id);
      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST,
        postId,
      ]);
      const newPost = { ...previousPost };
      const likeIndex =
        previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;
      likeIndex >= 0
        ? newPost.likes?.splice(likeIndex, 1)
        : newPost.likes?.push({ userId });
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, postId],
        newPost
      );
      return { previousPost, newPost };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, context?.previousPost?.id],
        context?.previousPost
      );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, variables],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useLikePost;
