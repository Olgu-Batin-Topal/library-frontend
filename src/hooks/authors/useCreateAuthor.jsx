import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (authorData) => {
      const res = await API.post("/authors", authorData);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast.success("Yazar başarıyla eklendi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Yazar eklenirken bir hata oluştu."
      );
    },
  });
};
