import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "./axios";

function DeleteFunction() {
    const queryClient = useQueryClient();
    const Mutation = useMutation({
    mutationFn: async ({url,query}=info) => {
      const res = await api.delete(url);
      return query ;
    },
    onSuccess: (query) => {
      queryClient.invalidateQueries([query?.url,query?.breaking,query?.search,query?.status,query?.locationType,query?.subcategory,query?.category]);
      toast.success("Delete Successfully");
    },
   onError:(data)=>{
         toast.error(data?.response?.data?.message); 
         console.log(data);
        
    }
  });
  return Mutation;
}

export default DeleteFunction