import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../data";

export function usePost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
}
