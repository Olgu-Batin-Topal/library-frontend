import { useQuery } from "@tanstack/react-query";
import API from "./../../services/api";

export const useAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await API.get("/authors");
      return res.data?.data ?? [];
    },
  });
};
