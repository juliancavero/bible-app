export type RequestParams = {
  order_by?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  search?: string;
};

export type Meta = {
  total: number;
  page: number;
  limit: number;
};
