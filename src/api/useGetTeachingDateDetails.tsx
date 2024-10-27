import { Teaching } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

const getTeachingDateDetails = async (
  year: number,
  month: number,
  day: number
): Promise<Teaching> => {
  const response = await axiosInstance.get<Teaching>(
    "teachings/date/" + year + "/" + month + "/" + day
  );
  return response.data;
};

const useGetTeachingDateDetails = (
  year: number,
  month: number,
  day: number
) => {
  return useQuery({
    queryFn: () => getTeachingDateDetails(year, month, day),
    queryKey: ["teaching_date", year, month, day],
    enabled: !!year && !!month && !!day,
  });
};

export default useGetTeachingDateDetails;
