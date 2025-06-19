import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId) => {
      const res = await API.delete(`/books/${bookId}`);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Kitap başarıyla silindi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Kitap silinirken bir hata oluştu."
      );
    },
  });
};
