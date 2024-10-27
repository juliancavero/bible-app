import { Teaching } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";
import { ResponseMapper } from "./mappers";
import { Meta, RequestParams } from "./types";

type TeachingsResponse = {
  data: Teaching[];
  meta: Meta;
};

type Params = RequestParams & {
  book?: string;
};

const getTeachings = async (params: Params): Promise<TeachingsResponse> => {
  const { page, limit, order_by, order, search, book } = params;
  const response = await axiosInstance.get<TeachingsResponse>("/teachings", {
    params: {
      ...(search && { search }),
      ...(book && { book }),
      page,
      limit,
      ...(order_by && { order_by }),
      ...(order && { order }),
    },
  });
  return ResponseMapper(response);
};

const useGetTeachings = (params: Params) => {
  const { order_by, order, page, limit, search, book } = params;
  return useQuery({
    queryFn: () => getTeachings(params),
    queryKey: ["teachings", page, limit, order_by, order, search, book],
    enabled: !!search || !!book,
  });
};

export default useGetTeachings;
