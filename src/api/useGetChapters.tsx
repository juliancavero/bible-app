import { Chapter } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";
import { ResponseMapper } from "./mappers";
import { Meta, RequestParams } from "./types";

type ChaptersResponse = {
  data: Chapter[];
  meta: Meta;
};

const getChapters = async (
  params: RequestParams
): Promise<ChaptersResponse> => {
  const response = await axiosInstance.get<ChaptersResponse>("/chapters", {
    params,
  });
  return ResponseMapper(response);
};

const useGetChapters = (params: RequestParams) => {
  const { order_by, order, page, limit, search } = params;
  return useQuery({
    queryFn: () => getChapters(params),
    queryKey: ["chapters", page, limit, order_by, order, search],
  });
};

export default useGetChapters;
