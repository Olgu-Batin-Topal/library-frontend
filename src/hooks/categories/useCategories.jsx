import { useQuery } from "@tanstack/react-query";
import API from "./../../services/api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await API.get("/categories");
      return res.data?.data ?? [];
    },
  });
};
