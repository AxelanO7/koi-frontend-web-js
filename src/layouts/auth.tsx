import Header from "../components/header";
import { AuthLayoutProps } from "../types/auth";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <div className="bg-gray-50 w-screen min-h-screen overflow-hidden">
        <Header />
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
