import useGetMonthDaySaint from "@/api/useGetMonthDaySaint";
import AppRoutes from "@/context/router/routes";
import useNav from "@/hooks/useNav";
import { useMemo } from "react";

const useSaintsBook = () => {
  const today = new Date();
  const { goTo } = useNav();
  const { data, isLoading, isError } = useGetMonthDaySaint(
    (today.getMonth() + 1).toString(),
    today.getDate().toString()
  );

  const goToTodaysSaint = () => {
    if (!data) return;
    return goTo(AppRoutes.SAINTS, data[0].id);
  };
  const goToAllSaints = () => {
    return goTo(AppRoutes.SAINTS);
  };

  const renderSaint = useMemo(() => {
    if (!data) return undefined;
    const saint = data.find((saint) => saint.isMain);
    if (!saint) return data[0];
    return saint;
  }, [data]);

  return {
    isError,
    isLoading,
    renderSaint,
    goToAllSaints,
    goToTodaysSaint,
  };
};

export default useSaintsBook;
