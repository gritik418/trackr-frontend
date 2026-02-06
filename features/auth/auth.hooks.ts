import { useQuery } from "@tanstack/react-query";
import { getMe } from "./auth.service";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });
};
