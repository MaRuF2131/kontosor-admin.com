"use client";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/lib/useDebounce";
import Pagination from "@/lib/Pagination";
import NewsList from "@/components/admin/NewsList";
import NoDataIndicator from "@/components/admin/NodataIndicator";
import FinishIndicator from "@/components/admin/FinishIndicator";
import TableLoader from "@/components/loader/TableLoader";
import DeleteFunction from "@/lib/DeleteFunction";
import { confirmDelete } from "@/components/Alert";

export default function AllNews() {

  const {register, watch,reset, formState: { errors }} = useForm({
    mode:"onChange", 
    criteriaMode: "all",
    defaultValues:{
      status:"all",
      search:""
    }
  });
   const D=DeleteFunction(); 
  const [news, setnews] = useState([]);
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
      url:"/admin/news",
      keyValuepair:{
        breaking:'all',
        search:debouncedSearchTerm || '',
        status:filterStatus||'all',
        locationType:'all',
        },
        page:1,limit:10
      });
    
      const handleDelete = (id) => {
        confirmDelete(()=>{
          D.mutate({
            url:`/admin/${id}?database=news`,
            query:{
              url:"/admin/news",
              breaking:'all',
              search:debouncedSearchTerm || '',
              status:'all',
              locationType:'all',
              subcategory:'all',
              category:'all'
              },
          });
        })

      }; 
 
    useEffect(()=>{
      console.log("data",data);
        if(data){ 
          const value=data?.pages?.flatMap((page) => page?.data?.data) || []; 
          setnews(value);
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
      <NewsList news={news} del={handleDelete}></NewsList>
                    {/* Load more / end indicator */}
        <div ref={loadMoreRef} className="w-full text-center mt-8">
              {(isFetching || isFetchingNextPage)  && <TableLoader ms={"News"}></TableLoader>}
        </div>
        {/* no data indicator  */}
        {(!hasNextPage && news?.length <= 0 && !isFetching && !isFetchingNextPage && status==="success") &&(
          <NoDataIndicator message="News"></NoDataIndicator>
        )}
          {!hasNextPage && data?.pages[0]?.data?.data.length > 0 && (
             <FinishIndicator ms={"All News Loaded"}></FinishIndicator>
          )}
    </div>
  );
}
