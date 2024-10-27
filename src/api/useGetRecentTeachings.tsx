import { Teaching } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

const getRecentTeachings = async (): Promise<Teaching[]> => {
  const response = await axiosInstance.get<Teaching[]>("/teachings/date-near");
  return response.data;
};

const useGetRecentTeachings = () => {
  return useQuery({
    queryFn: () => getRecentTeachings(),
    queryKey: ["teachingsDateNear"],
  });
};

export default useGetRecentTeachings;
