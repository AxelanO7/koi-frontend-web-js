import Header from "./header";
import Footer from "./footer";
import { BaseLayoutProps as BaseLayoutProps } from "../types/layout";

const BaseLayout = ({ children, isAuthPage = false }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 flex flex-col justify-between space-y-8">
      <Header isAuthPage={isAuthPage} />
      <div className="flex-1">{children}</div>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default BaseLayout;
