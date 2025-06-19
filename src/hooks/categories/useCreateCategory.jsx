import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryData) => {
      const res = await API.post("/categories", categoryData);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Kategori başarıyla eklendi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Kategori eklenirken bir hata oluştu."
      );
    },
  });
};
