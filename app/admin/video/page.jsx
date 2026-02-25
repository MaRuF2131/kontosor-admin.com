"use client";

import FinishIndicator from "@/components/admin/FinishIndicator";
import NoDataIndicator from "@/components/admin/NodataIndicator";
import VideoList from "@/components/admin/VideoList";
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
      type:"all",
      search:""
    }
  });
   const D=DeleteFunction(); 
  const [video, setvideo] = useState([]);
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
      url:"/admin/video",
      keyValuepair:{
        search:debouncedSearchTerm || '',
        status:'all',
        category:'all'
        },
        page:1,limit:10
      });
    
      const handleDelete = (id) => {
        confirmDelete(()=>{
          D.mutate({
            url:`/admin/${id}?database=video`,
            query:{
              url:"/admin/video",
              search:debouncedSearchTerm || '',
              status:'all',
              category:'all'
              },
          });
        })

      }; 
 
    useEffect(()=>{
      console.log("data",data);
        if(data){ 
          const value=data?.pages?.flatMap((page) => page?.data?.data) || []; 
          setvideo(value);
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
      <VideoList videos={video} del={handleDelete}></VideoList>
                    {/* Load more / end indicator */}
        <div ref={loadMoreRef} className="w-full text-center mt-8">
              {(isFetching || isFetchingNextPage)  && <TableLoader ms={"Video"}></TableLoader>}
        </div>
        {/* no data indicator  */}
        {(!hasNextPage && video?.length <= 0 && !isFetching && !isFetchingNextPage && status==="success") &&(
          <NoDataIndicator message="Video"></NoDataIndicator>
        )}
        {!hasNextPage && data?.pages[0]?.data?.data.length > 0 && (
             <FinishIndicator ms={"All Video Loaded"}></FinishIndicator>
          )}
    </div>
  );
}
