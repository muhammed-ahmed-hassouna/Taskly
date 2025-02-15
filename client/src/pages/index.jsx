import { Routes, Route } from "react-router-dom";
import ScrollToTop from "components/ui/ScrollToTop";
import NotFound from "pages/website/NotFound";
import UnAuthorized from "pages/website/Unauthorized";
import Home from "pages/website/Home/Todo/index";
import Login from "pages/website/Auth/Login";
import SignUp from "pages/website/Auth/Signup";
import AuthProvider from "providers/AuthProvider";
import TopNav from "./shared/TopNav";
export default function Index() {
  return (
    <>
      <ScrollToTop />
      <TopNav />
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route index path="/signup" element={<SignUp />} />

        <Route element={<AuthProvider />}>
          <Route index path="/" element={<Home />} />
        </Route>

        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
