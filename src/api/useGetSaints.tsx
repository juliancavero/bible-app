import { Saint } from "@/types/saints";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";
import { ResponseMapper } from "./mappers";
import { Meta, RequestParams } from "./types";

type SaintsResponse = {
  data: Saint[];
  meta: Meta;
};

type Params = RequestParams & {
  day?: string;
  month?: string;
};

const getSaints = async (params: Params): Promise<SaintsResponse> => {
  const { page, limit, order_by, order, search, day, month } = params;
  const response = await axiosInstance.get<SaintsResponse>("/saints", {
    params: {
      ...(search && { search }),
      ...(day && { day }),
      ...(month && { month }),
      page,
      limit,
      ...(order_by && { order_by }),
      ...(order && { order }),
    },
  });
  return ResponseMapper(response);
};

const useGetSaints = (params: Params) => {
  const { order_by, order, page, limit, search, day, month } = params;
  return useQuery({
    queryFn: () => getSaints(params),
    queryKey: ["saints", page, limit, order_by, order, search, day, month],
    enabled: !!search || (!!day && !!month),
  });
};

export default useGetSaints;
