import { Teaching } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

const getLastTeaching = async (): Promise<Teaching> => {
  const response = await axiosInstance.get<Teaching>("/teachings/today");
  return response.data;
};

const useGetLastTeaching = () => {
  return useQuery({
    queryFn: () => getLastTeaching(),
    queryKey: ["teaching_last"],
  });
};

export default useGetLastTeaching;
