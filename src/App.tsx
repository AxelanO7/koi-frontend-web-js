import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not_found";

// auth
import Signin from "./pages/auth/sign_in";
import Signup from "./pages/auth/sign_up";
import ForgotPassword from "./pages/auth/forgot_password";
import CheckEmail from "./pages/auth/check_email";
import ResetPasswordAuth from "./pages/auth/reset_password";
import HomePage from "./pages/user/home-page";
import Organization from "./pages/user/organization";
import DetailEvent from "./pages/user/detail-event";
import EventPage from "./pages/user/register";
import ProfilePage from "./pages/user/profile/profile";
import EditProfilePage from "./pages/user/profile/edit-profile";
import ResetPasswordProfilePage from "./pages/user/profile/forgot_password";

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
        <Route path="/reset-password" element={<ResetPasswordAuth />} />

        {/* user */}
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/detail-event" element={<DetailEvent />} />
        <Route path="/organization" element={<Organization />} />

        {/* event */}
        <Route path="/event/register" element={<EventPage />} />

        {/* profile */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route
          path="/profile/reset-password"
          element={<ResetPasswordProfilePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
