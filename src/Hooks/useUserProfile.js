// src/Hooks/useUserProfile.js
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../Services/productService"; 

const useUserProfile = (userId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId, 
    staleTime: 1000 * 60 * 5, 
  });

  return { user: data, isLoading, isError };
};

export default useUserProfile;
