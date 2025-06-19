import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId) => {
      const res = await API.delete(`/categories/${categoryId}`);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Kategori başarıyla silindi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Kategori silinirken bir hata oluştu."
      );
    },
  });
};
