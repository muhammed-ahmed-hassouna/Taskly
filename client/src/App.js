import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { reactQueryClientOptions } from "./configs/reactQueryClientOptions";
import ReactPublicContextProvider from "./providers/PublicContextProvider"
import ToastifyProvider from "./providers/ToastifyProvider"
import LoadingProvider from "./providers/LoadingProvider"
import Index from "./pages/index";
const queryClient = new QueryClient(reactQueryClientOptions);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ReactPublicContextProvider>
      <ToastifyProvider>
        <LoadingProvider>
          <Index />
        </LoadingProvider>
      </ToastifyProvider>
    </ReactPublicContextProvider>
  </QueryClientProvider>
  );
}

export default App;
