import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, bookData }) => {
      console.log("Updating book with ID:", id, "Data:", bookData);
      const res = await API.put(`/books/${id}`, bookData);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Kitap başarıyla güncellendi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Kitap güncellenirken bir hata oluştu."
      );
    },
  });
};
