import useGetNearDatesSaints from "@/api/useGetNearDatesSaints";
import useGetSaints from "@/api/useGetSaints";
import { useFavouriteContext } from "@/context/custom/favourites";
import AppRoutes from "@/context/router/routes";
import useNav from "@/hooks/useNav";
import useRequestParams from "@/hooks/useRequestParams";
import { Saint } from "@/types/saints";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export enum FilterOptions {
  SEARCH = "search",
  DATE = "date",
}

export const PAGINATION_SIZE = 5;

const useAllSaints = () => {
  const { goTo } = useNav();
  const [searchParams, setSearchParams] = useSearchParams();

  const { state: allSaintsParams, setSearch } = useRequestParams();
  const { favSaints } = useFavouriteContext();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [openFilter, setOpenFilter] = useState<FilterOptions | null>(null);
  const [page, setPage] = useState(0);

  const selectedDate = useMemo(() => {
    return {
      day: date ? String(date.getDate()) : "",
      month: date ? String(date.getMonth() + 1) : "",
    };
  }, [date]);

  const { data: allSaints } = useGetSaints({
    ...allSaintsParams,
    day: selectedDate.day,
    month: selectedDate.month,
  });
  const { data: nearDatesSaints } = useGetNearDatesSaints(
    String(new Date().getMonth() + 1),
    String(new Date().getDate())
  );

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onSaintSelected = (saint: Saint) => {
    updateSearchParams();
    return goTo(AppRoutes.SAINTS, saint.id);
  };

  const updateSearchParams = () => {
    const searchParams = new URLSearchParams();
    if (allSaintsParams.search) {
      searchParams.set("search", allSaintsParams.search);
    } else if (selectedDate.day && selectedDate.month) {
      searchParams.set("day", selectedDate.day);
      searchParams.set("month", selectedDate.month);
    }
    setSearchParams(searchParams);
  };

  const onFilterSelect = (filter: FilterOptions) => {
    setSearch("");
    setDate(undefined);
    if (openFilter === filter) {
      return setOpenFilter(null);
    }
    switch (filter) {
      case FilterOptions.DATE:
        return setOpenFilter(filter);
      case FilterOptions.SEARCH:
        return setOpenFilter(filter);
    }
  };

  useEffect(() => {
    if (searchParams.get("search")) {
      setSearch(searchParams.get("search") || "");
      setOpenFilter(FilterOptions.SEARCH);
    } else if (searchParams.get("day") && searchParams.get("month")) {
      const date = new Date();
      date.setDate(Number(searchParams.get("day")));
      date.setMonth(Number(searchParams.get("month")) - 1);
      setDate(date);
      setOpenFilter(FilterOptions.DATE);
    }
  }, []);

  return {
    date,
    setDate,
    favSaints,
    allSaints,
    setSearch,
    allSaintsParams,
    onSaintSelected,
    nearDatesSaints,
    openFilter,
    onFilterSelect,
    page,
    onPageChange,
  };
};

export default useAllSaints;
