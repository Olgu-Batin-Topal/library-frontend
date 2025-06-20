import { useQuery } from "@tanstack/react-query";
import API from "./../../services/api";

export const useBooks = ({ search = "", page = 1 }) => {
  const isSearch = search.trim().length > 0;

  return useQuery({
    queryKey: ["books", page],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (isSearch) {
        const res = await API.get(`/books/search`, {
          params: { q: search },
        });
        return res.data ?? [];
      }

      const res = await API.get(`/books?page=${page}`);
      return res.data ?? [];
    },
  });
};
