import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, categoryData }) => {
      console.log("Updating category with ID:", id, "Data:", categoryData);
      const res = await API.put(`/categories/${id}`, categoryData);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Kategori başarıyla güncellendi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Kategori güncellenirken bir hata oluştu."
      );
    },
  });
};
