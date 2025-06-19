import { useQuery } from "@tanstack/react-query";
import API from "./../../services/api";

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books");
      return res.data?.data ?? [];
    },
  });
};
