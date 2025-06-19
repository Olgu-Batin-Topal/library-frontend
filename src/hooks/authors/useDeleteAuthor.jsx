import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (authorId) => {
      const res = await API.delete(`/authors/${authorId}`);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast.success("Yazar başarıyla silindi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Yazar silinirken bir hata oluştu."
      );
    },
  });
};
