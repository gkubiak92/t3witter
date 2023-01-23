import { useSession } from "next-auth/react";

export const useIsAuthenticated = () => {
  const session = useSession();

  return session.status === "authenticated";
};
