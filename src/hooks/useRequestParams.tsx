import { RequestParams } from "@/api/types";
import { useReducer } from "react";

enum RequestActions {
  SET_PAGE,
  SET_LIMIT,
  SET_ORDER,
  SET_ORDER_BY,
  SET_SEARCH,
}

type RequestAction = {
  type: RequestActions;
  payload: any;
};

const initialState: RequestParams = {
  page: 1,
  limit: 10,
};

const requestReducer = (state: RequestParams, action: RequestAction) => {
  const { type, payload } = action;

  switch (type) {
    case RequestActions.SET_PAGE:
      return { ...state, page: payload as number };
    case RequestActions.SET_LIMIT:
      return { ...state, limit: payload as number };
    case RequestActions.SET_ORDER:
      return { ...state, order: payload as "asc" | "desc" };
    case RequestActions.SET_ORDER_BY:
      return { ...state, order_by: payload as string };
    case RequestActions.SET_SEARCH:
      return { ...state, search: payload as string };
    default:
      return state;
  }
};

const useRequestParams = () => {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  const setPage = (page: number) => {
    dispatch({ type: RequestActions.SET_PAGE, payload: page });
  };

  const setLimit = (limit: number) => {
    dispatch({ type: RequestActions.SET_LIMIT, payload: limit });
  };

  const setOrder = (order: "asc" | "desc") => {
    dispatch({ type: RequestActions.SET_ORDER, payload: order });
  };

  const setOrderBy = (orderBy: string) => {
    dispatch({ type: RequestActions.SET_ORDER_BY, payload: orderBy });
  };

  const setSearch = (search: string) => {
    dispatch({ type: RequestActions.SET_SEARCH, payload: search });
  };

  return {
    state,
    setPage,
    setLimit,
    setOrder,
    setOrderBy,
    setSearch,
  };
};

export default useRequestParams;
