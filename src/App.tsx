import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Sidebar from "./components/Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

export default function App(){
  return(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="flex">
          <Sidebar/>
          <div className="fixed top-0 right-0 left-22 bottom-0 h-screen bg-background-dark text-text">
            <Routes>
              <Route path="/home" element={<Home/>}/>
            </Routes>
          </div>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  )
}