import { useQuery,QueryKey, UseQueryOptions } from "react-query";

export const useRequest = (key:QueryKey,func:any, options?: Omit<UseQueryOptions<any, unknown, any, QueryKey>, "queryKey" | "queryFn"> | undefined) => {
  return useQuery(key, func, options ? options : {
        enabled:false,
        retry: false,
      });
};

