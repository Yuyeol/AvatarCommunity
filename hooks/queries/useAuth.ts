import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, postLogin, postSignup } from "@/api/auth";
import { router } from "expo-router";
import { deleteSecureStore, saveSecureStore } from "@/app/utils/secureStore";
import { removeHeader, setHeader } from "@/app/utils/header";
import queryClient from "@/api/queryClient";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });
  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);
  return { data };
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      // POST에서 리스폰스로 유저 정보를 주지 않기 때문에 getMe를 호출해서 데이터를 가져온다.
      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] });
      router.replace("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      router.replace("/auth/login");
    },
  });
}

function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");
    // 쿼리키 auth 관련 쿼리 데이터 초기화
    queryClient.resetQueries({ queryKey: ["auth"] });
  };

  return {
    auth: { id: data?.id || "", nickname: data?.nickname || "" },
    loginMutation,
    signupMutation,
    logout,
  };
}

export default useAuth;
