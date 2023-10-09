import { QueryClient } from '@tanstack/react-query'

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false
  }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
