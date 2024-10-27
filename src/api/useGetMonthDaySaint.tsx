import { Saint } from "@/types/saints";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

const getMonthDaySaint = async (
  month: string,
  day: string
): Promise<Saint[]> => {
  const response = await axiosInstance.get<Saint[]>(
    "saints/date/" + month + "/" + day
  );
  return mapSaints(response.data);
};

const useGetMonthDaySaint = (month: string, day: string) => {
  return useQuery({
    queryFn: () => getMonthDaySaint(month, day),
    queryKey: ["saint", month, day],
    enabled: !!month && !!day,
  });
};

export default useGetMonthDaySaint;

const mapSaints = (saints: Saint[]) => {
  return saints.sort((a, b) => (a.isMain === b.isMain ? 0 : a.isMain ? -1 : 1));
};
