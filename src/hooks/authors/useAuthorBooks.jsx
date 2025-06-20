import { useQuery } from "@tanstack/react-query";
import API from "./../../services/api";

export const useAuthorBooks = (authorId) => {
  return useQuery({
    queryKey: ["authorBooks", authorId],
    queryFn: async () => {
      const res = await API.get(`/authors/${authorId}/books`);
      return res.data?.data ?? [];
    },
    enabled: !!authorId,
  });
};
