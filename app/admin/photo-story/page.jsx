"use client";

import FinishIndicator from "@/components/admin/FinishIndicator";
import NoDataIndicator from "@/components/admin/NodataIndicator";
import PhotoStoryList from "@/components/admin/PhotoStoryList";
import { confirmDelete } from "@/components/Alert";
import TableLoader from "@/components/loader/TableLoader";
import DeleteFunction from "@/lib/DeleteFunction";
import Pagination from "@/lib/Pagination";
import useDebounce from "@/lib/useDebounce";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function PhotoStoryListPage() {

  const { register, watch, reset, formState: { errors } } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      status: "all",
      search: ""
    }
  });

  const D = DeleteFunction();

  const [stories, setStories] = useState([]);
  const [total, setTotal] = useState(0);

  const searchTerm = watch("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filterStatus = watch("status");

  const loadMoreRef = useRef();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status
  } = Pagination({
    url: "/admin/photo_story",
    keyValuepair: {
      search: debouncedSearchTerm || '',
      status: filterStatus || 'all',
    },
    page: 1,
    limit: 10
  });

  // Delete Handler
  const handleDelete = (id) => {
    confirmDelete(() => {
      D.mutate({
        url: `/admin/${id}?database=photo_story`,
        query: {
          url: "/admin/photo_story",
          search: debouncedSearchTerm || '',
          status: filterStatus || 'all',
        },
      });
    });
  };

  // Data Set
  useEffect(() => {
    if (data) {
      const value = data?.pages?.flatMap((page) => page?.data?.data) || [];
      setStories(value);

      const len = data?.pages.length || 0;
      const tl = data?.pages[len - 1]?.data?.total || 0;
      setTotal(parseInt(tl));
    }
  }, [data]);

  // Infinite Scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();

  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>

      <PhotoStoryList
        stories={stories}
        del={handleDelete}
      />

      {/* Loader */}
      <div ref={loadMoreRef} className="w-full text-center mt-8">
        {(isFetching || isFetchingNextPage) &&
          <TableLoader ms={"Photo Story"} />
        }
      </div>

      {/* No Data */}
      {(!hasNextPage && stories?.length <= 0 && !isFetching && !isFetchingNextPage && status === "success") && (
        <NoDataIndicator message="Photo Story" />
      )}

      {/* Finish */}
      {!hasNextPage && data?.pages[0]?.data?.data.length > 0 && (
        <FinishIndicator ms={"All Photo Story Loaded"} />
      )}

    </div>
  );
}