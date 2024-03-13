import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not_found";

// auth
import Signin from "./pages/auth/sign_in";
import Signup from "./pages/auth/sign_up";
import ForgotPassword from "./pages/auth/forgot_password";
import CheckEmail from "./pages/auth/check_email";
import ResetPassword from "./pages/auth/reset_password";

function App() {
  return (
    <RecoilRoot>
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
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
