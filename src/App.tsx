import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not_found";

// auth
import SigninPage from "./pages/auth/sign-in";
import SignupPage from "./pages/auth/sign-up";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import CheckEmailPage from "./pages/auth/check-email";
import ResetPasswordAuthPage from "./pages/auth/reset-password";
// user
import HomePagePage from "./pages/user/home-page";
import OrganizationPage from "./pages/user/organization";
import DetailEventPage from "./pages/user/detail-event";
import EventPage from "./pages/user/register";
import RegisteringEvent from "./components/user/event/registering";
import ProfilePage from "./pages/user/profile/profile";
import EditProfilePage from "./pages/user/profile/edit-profile";
import ResetPasswordProfilePage from "./pages/user/profile/forgot_password";
// organization
import OrganizationDashboardPage from "./pages/organization/my-event";
import OrganizationSubmissionPage from "./pages/organization/submission";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<SigninPage />} />
        {/* <Route path="/" element={<Login />} /> */}

        {/* auth */}
        <Route path="/login" element={<SigninPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordAuthPage />} />

        {/* user */}
        <Route path="/home-page" element={<HomePagePage />} />
        <Route path="/detail-event" element={<DetailEventPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/event/register" element={<RegisteringEvent />} />
        <Route path="/event/register/:id" element={<EventPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route
          path="/profile/reset-password"
          element={<ResetPasswordProfilePage />}
        />

        {/* organization */}
        <Route
          path="/organization/dashboard"
          element={<OrganizationDashboardPage />}
        />
        <Route
          path="/organization/submission"
          element={<OrganizationSubmissionPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
