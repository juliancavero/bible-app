import useGetRecentTeachings from "@/api/useGetRecentTeachings";
import useGetTeachings from "@/api/useGetTeachings";
import AppRoutes from "@/context/router/routes";
import useNav from "@/hooks/useNav";
import useRequestParams from "@/hooks/useRequestParams";
import { Teaching } from "@/types/bible";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export enum TeachingFilterOptions {
  SEARCH = "SEARCH",
  BOOK = "BOOK",
}

const useAllTeachings = () => {
  const { goTo } = useNav();
  const [searchParams, setSearchParams] = useSearchParams();

  const { state: allTeachingsParams, setSearch } = useRequestParams();

  const [openFilter, setOpenFilter] = useState<TeachingFilterOptions | null>(
    null
  );
  const [book, setBook] = useState<string>("");

  const { data: allTeachings } = useGetTeachings({
    ...allTeachingsParams,
    ...(book && { book }),
  });

  const { data: recentTeachings } = useGetRecentTeachings();

  const onTeachingSelect = (teaching: Teaching) => {
    updateSearchParams();
    return goTo(AppRoutes.TEACHINGS, teaching.id);
  };

  const onBack = () => {
    return goTo(AppRoutes.HOME);
  };

  const updateSearchParams = () => {
    const searchParams = new URLSearchParams();
    if (allTeachingsParams.search) {
      searchParams.set("search", allTeachingsParams.search);
    } else if (book) {
      searchParams.set("book", book);
    }
    setSearchParams(searchParams);
  };

  const onFilterSelect = (filter: TeachingFilterOptions) => {
    setSearch("");
    setBook("");
    if (openFilter === filter) {
      return setOpenFilter(null);
    }
    switch (filter) {
      case TeachingFilterOptions.BOOK:
        return setOpenFilter(filter);
      case TeachingFilterOptions.SEARCH:
        return setOpenFilter(filter);
    }
  };

  useEffect(() => {
    if (searchParams.get("search")) {
      setSearch(searchParams.get("search") || "");
      setOpenFilter(TeachingFilterOptions.SEARCH);
    } else if (searchParams.get("book")) {
      setBook(searchParams.get("book") || "");
      setOpenFilter(TeachingFilterOptions.BOOK);
    }
  }, []);

  return {
    onBack,
    openFilter,
    setSearch,
    onFilterSelect,
    allTeachingsParams,
    book,
    setBook,
    onTeachingSelect,
    allTeachings,
    recentTeachings,
  };
};

export default useAllTeachings;
