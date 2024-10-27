import { Saint } from "@/types/saints";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

const getNearDatesSaints = async (
  month: string,
  day: string
): Promise<Saint[]> => {
  const response = await axiosInstance.get<Saint[]>("saints/date-near", {
    params: {
      ...(day && { day }),
      ...(month && { month }),
    },
  });
  return response.data;
};

const useGetNearDatesSaints = (month: string, day: string) => {
  return useQuery({
    queryFn: () => getNearDatesSaints(month, day),
    queryKey: ["nearDatesSaints", month, day],
    enabled: !!month && !!day,
  });
};

export default useGetNearDatesSaints;
