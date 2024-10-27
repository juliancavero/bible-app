import useGetLastTeaching from "@/api/useGetLastTeaching";
import AppRoutes from "@/context/router/routes";
import useNav from "@/hooks/useNav";

const useTodaysQuote = () => {
  const { goTo } = useNav();
  const { data, isLoading, isError } = useGetLastTeaching();

  const goToTodaysQuote = () => {
    if (!data) return;

    return goTo(AppRoutes.TEACHINGS, data.id);
  };

  const goToAllQuotes = () => {
    goTo(AppRoutes.TEACHINGS);
  };

  return {
    data,
    isLoading,
    isError,
    goToTodaysQuote,
    goToAllQuotes,
  };
};

export default useTodaysQuote;
