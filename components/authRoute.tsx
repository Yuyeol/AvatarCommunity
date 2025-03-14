import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import { Fragment } from "react";

type AuthRouteProps = {
  children: React.ReactNode;
};

export default function AuthRoute({ children }: AuthRouteProps) {
  const { auth } = useAuth();
  useFocusEffect(() => {
    if (!auth.id) router.replace("/auth");
  });
  return <Fragment>{children}</Fragment>;
}
