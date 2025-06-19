import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookData) => {
      const res = await API.post("/books", bookData);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Kitap başarıyla eklendi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Kitap eklenirken bir hata oluştu."
      );
    },
  });
};
