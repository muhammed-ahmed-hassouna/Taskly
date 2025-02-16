import { Routes, Route } from "react-router-dom";
import ScrollToTop from "components/ui/ScrollToTop";
import NotFound from "pages/website/NotFound";
import UnAuthorized from "pages/website/Unauthorized";
import Home from "pages/website/Home/Todo/index";
import Login from "pages/website/Auth/Login";
import SignUp from "pages/website/Auth/Signup";
import AuthProvider from "providers/AuthProvider";
import TopNav from "./shared/TopNav";
import Dashboard from "./admin/dashboard";
import ProtectedRoute from "providers/ProtectedRoute";
import { useAuth } from "providers/AuthContext";

export default function Index() {
  const { user } = useAuth();
  const showTopNav = user?.role === 2;

  return (
    <>
      <ScrollToTop />
      {showTopNav && <TopNav />}
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route index path="/signup" element={<SignUp />} />

        <Route element={<AuthProvider />}>
          <Route element={<ProtectedRoute allowedRoles={[2]} />}>
            <Route index path="/" element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[1]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
