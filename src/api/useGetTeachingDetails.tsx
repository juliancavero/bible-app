import { Teaching } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

type TeachingDetailsResponse = {
  data: Teaching;
  links: {
    prev: number | null;
    next: number | null;
  };
};

const getTeaching = async (id: string): Promise<TeachingDetailsResponse> => {
  const response = await axiosInstance.get<TeachingDetailsResponse>(
    "/teachings/id/" + id
  );
  return response.data;
};

const useGetTeachingDetails = (id: string) => {
  return useQuery({
    queryFn: () => getTeaching(id),
    queryKey: ["teaching", id],
    enabled: !!id,
  });
};

export default useGetTeachingDetails;
