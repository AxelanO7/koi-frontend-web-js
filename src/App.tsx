import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not-found";

// auth
import SigninPage from "./pages/auth/sign-in";
import SignupPage from "./pages/auth/sign-up";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import CheckEmailPage from "./pages/auth/check-email";
import ResetPasswordAuthPage from "./pages/auth/reset-password";
// user
import HomePage from "./pages/user/home-page";
import OrganizationPage from "./pages/user/organization";
import DetailEventPage from "./pages/user/detail-event";
import RegisterEventPage from "./pages/user/register";
import AbsentPage from "./pages/user/absent";
import ProfilePage from "./pages/user/profile/profile";
import EditProfilePage from "./pages/user/profile/edit-profile";
import ResetPasswordProfilePage from "./pages/user/profile/forgot-password";
// organization
import OrganizationDashboardPage from "./pages/organization/dashboard";
import OrganizationSubmissionPage from "./pages/organization/submission";
import OrganizationSubmissedPage from "./pages/organization/submissed";
import DetailParticipantPage from "./pages/organization/detail-participant";
import DetailAbsentPage from "./pages/organization/detail-absent";
// student affair
import StudentAffairDashboardPage from "./pages/student-affair/dashboard";
import StudentAffairSubmissionPage from "./pages/student-affair/submission-my-event";
import StudentAffairSubmissedPage from "./pages/student-affair/submissed-my-event";
import StudentAffairDetailParticipantPage from "./pages/student-affair/detail-participant";
import StudentAffairDetailAbsentPage from "./pages/student-affair/detail-absent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<Login />} /> */}

        {/* auth */}
        <Route path="/login" element={<SigninPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordAuthPage />} />

        {/* student */}
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/event/:id" element={<DetailEventPage />} />
        <Route path="/event/register/:id" element={<RegisterEventPage />} />
        <Route path="/event/absent/:id" element={<AbsentPage />} />
        <Route path="/organization/:id" element={<OrganizationPage />} />
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
          path="/organization/detail-participant/:id"
          element={<DetailParticipantPage />}
        />
        <Route
          path="/organization/detail-absent/:id"
          element={<DetailAbsentPage />}
        />
        <Route
          path="/organization/submission"
          element={<OrganizationSubmissionPage />}
        />
        <Route
          path="/organization/submission/:id"
          element={<OrganizationSubmissedPage />}
        />

        {/* student affair */}
        <Route
          path="/student-affair/dashboard"
          element={<StudentAffairDashboardPage />}
        />
        <Route
          path="/student-affair/detail-participant/:id"
          element={<StudentAffairDetailParticipantPage />}
        />
        <Route
          path="/student-affair/detail-absent/:id"
          element={<StudentAffairDetailAbsentPage />}
        />
        <Route
          path="/student-affair/submission"
          element={<StudentAffairSubmissionPage />}
        />
        <Route
          path="/student-affair/submission/:id"
          element={<StudentAffairSubmissedPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
