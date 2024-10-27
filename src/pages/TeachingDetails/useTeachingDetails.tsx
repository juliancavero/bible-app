import useGetTeachingDetails from "@/api/useGetTeachingDetails";
import AppRoutes from "@/context/router/routes";
import useNav from "@/hooks/useNav";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const useTeachingDetails = () => {
  const { id = "" } = useParams();
  const { data, isLoading, isError } = useGetTeachingDetails(id);
  const { goTo } = useNav();

  const [imageOpen, setImageOpen] = useState(false);

  const contiguousDates = useMemo(() => {
    return {
      previous: data?.links.prev ? data?.links.prev.toString() : undefined,
      next: data?.links.next ? data?.links.next.toString() : undefined,
    };
  }, [data]);

  const onAnotherDay = (dir: "previous" | "next") => {
    const direction =
      dir === "previous" ? contiguousDates.previous : contiguousDates.next;

    goTo(AppRoutes.TEACHINGS, direction);
  };

  const onBack = () => {
    goTo(AppRoutes.HOME);
  };

  const teaching = useMemo(() => {
    if (!data) return null;
    return data.data;
  }, [data]);

  return {
    isLoading,
    isError,
    teaching,
    onBack,
    onAnotherDay,
    contiguousDates,
    imageOpen,
    setImageOpen,
  };
};

export default useTeachingDetails;
