import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from './axios';
function PostFuntion(reset) {
   const queryClient = useQueryClient();
   const mutation = useMutation({
    mutationFn: async ({data,query}=info) => {
      if (query?.id) {
          await api.put(`${query?.url}/${query?.id}`, data);
          return query
      }
       await api.post(`${query?.url}`, data);
       return query
    },
    onSuccess: (query) => {
      toast.success(" সফলভাবে সংরক্ষণ হয়েছে");
      if (!(query?.id))reset() 
      queryClient.invalidateQueries([query?.url,query?.breaking,query?.search,query?.status,query?.locationType,query?.subcategory,query?.category]);
    },
    onError: (error) => {
          console.log("error",error);  
          toast.error("কিছু সমস্যা হয়েছে" || error?.response?.data?.message);

    },
  });
  return mutation
}

export default PostFuntion