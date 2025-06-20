import { useQuery } from "@tanstack/react-query";
import API from "./../../services/api";

export const useBooks = (page = 1) => {
  return useQuery({
    queryKey: ["books", page],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await API.get(`/books?page=${page}`);
      return res.data ?? [];
    },
  });
};
