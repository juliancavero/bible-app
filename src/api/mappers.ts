import { AxiosResponse } from "axios";

export const ResponseMapper = (response: AxiosResponse) => {
  return {
    data: response.data.data,
    meta: response.data.meta || {
      total: 0,
      page: 1,
      limit: 5,
    },
  };
};
