"use client";

import AudioList from "@/components/admin/AudioList";
import FinishIndicator from "@/components/admin/FinishIndicator";
import NoDataIndicator from "@/components/admin/NodataIndicator";
import { confirmDelete } from "@/components/Alert";
import TableLoader from "@/components/loader/TableLoader";
import DeleteFunction from "@/lib/DeleteFunction";
import Pagination from "@/lib/Pagination";
import useDebounce from "@/lib/useDebounce";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function VideoListPage() {
   const {register, watch,reset, formState: { errors }} = useForm({
    mode:"onChange", 
    criteriaMode: "all",
    defaultValues:{
      status:"all",
      search:""
    }
  });
   const D=DeleteFunction(); 
  const [audios, setaudios] = useState([]);
  const [edit,setedit]=useState(null)
  const [details,setdetails]=useState(null)
  const [total,settotal]=useState(0)
  const searchTerm = watch("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filterStatus= watch("status");
  const filterType= watch("type");
  const loadMoreRef = useRef();

    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isFetching,
      status
     } = Pagination({
      url:"/admin/audio",
      keyValuepair:{
        search:debouncedSearchTerm || '',
        status:filterStatus||'all',
        category:'all'
        },
        page:1,limit:10
      });
    
      const handleDelete = (id) => {
        confirmDelete(()=>{
          D.mutate({
            url:`/admin/${id}?database=audio`,
            query:{
              url:"/admin/audio",
              search:debouncedSearchTerm || '',
              status:filterStatus||'all',
              category:'all'
              },
          });
        })

      }; 
 
    useEffect(()=>{
      console.log("data",data);
        if(data){ 
          const value=data?.pages?.flatMap((page) => page?.data?.data) || []; 
          setaudios(value);
          const len=data?.pages.length || 0
          const tl=data?.pages[len-1]?.data?.total || 0
          settotal(parseInt(tl));
        }
      },[data])

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


  return (
    <div>

    <div className="mb-6 flex flex-col md:flex-row gap-3">

        {/* Search */}
        <input
          type="text"
          placeholder="Search news...."
          {...register("search")}
          className="border px-3 py-2 rounded w-full md:w-80"
        />

        {/* Status Filter */}
        <select
          {...register("status")}
          className="border px-3 py-2 rounded w-full md:w-40"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Reset Button */}
        <button
          onClick={() =>
            reset({
              status: "all",
              search: "",
            })
          }
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Reset
        </button>
     </div>
      <AudioList audios={audios} del={handleDelete}></AudioList>
                    {/* Load more / end indicator */}
        <div ref={loadMoreRef} className="w-full text-center mt-8">
              {(isFetching || isFetchingNextPage)  && <TableLoader ms={"Audio"}></TableLoader>}
        </div>
        {/* no data indicator  */}
        {(!hasNextPage && audios?.length <= 0 && !isFetching && !isFetchingNextPage && status==="success") &&(
          <NoDataIndicator message="Audio"></NoDataIndicator>
        )}
        {!hasNextPage && data?.pages[0]?.data?.data.length > 0 && (
             <FinishIndicator ms={"All Audios Loaded"}></FinishIndicator>
          )}
    </div>
  );
}
