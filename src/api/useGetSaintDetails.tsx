import { Saint } from "@/types/saints";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

const getSaintDetails = async (id: number): Promise<Saint> => {
  const response = await axiosInstance.get<Saint>("saints/id/" + id);
  return response.data;
};

const useGetSaintDetails = (id: string) => {
  return useQuery({
    queryFn: () => getSaintDetails(Number(id)),
    queryKey: ["saint", id],
    enabled: !!id,
  });
};

export default useGetSaintDetails;
