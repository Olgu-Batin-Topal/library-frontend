import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./../../services/api";
import { toast } from "react-toastify";

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, authorData }) => {
      console.log("Updating author with ID:", id, "Data:", authorData);
      const res = await API.put(`/authors/${id}`, authorData);
      return res.data?.data ?? [];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast.success("Yazar başarıyla güncellendi.");
      return data;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Yazar güncellenirken bir hata oluştu."
      );
    },
  });
};
