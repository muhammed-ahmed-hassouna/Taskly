import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ui/ScrollToTop";
import NotFound from "./website/NotFound";
import UnAuthorized from "./website/Unauthorized";
import Home from "./website/Home";

export default function Index() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
}
