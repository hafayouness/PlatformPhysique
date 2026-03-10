import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../stores/authStore";

export const useMe = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.me,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};
