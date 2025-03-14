import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 20 * 3000,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
