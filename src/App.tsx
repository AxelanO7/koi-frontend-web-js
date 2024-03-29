import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not_found";

// auth
import Signin from "./pages/auth/sign_in";
import Signup from "./pages/auth/sign_up";
import ForgotPassword from "./pages/auth/forgot_password";
import CheckEmail from "./pages/auth/check_email";
import ResetPassword from "./pages/auth/reset_password";
import HomePage from "./pages/user/home-page";
import Organization from "./pages/user/organization";
import DetailEvent from "./pages/user/detail-event";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Signin />} />
        {/* <Route path="/" element={<Login />} /> */}

        {/* auth */}
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* user */}
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/detail-event" element={<DetailEvent />} />
        <Route path="/organization" element={<Organization />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
