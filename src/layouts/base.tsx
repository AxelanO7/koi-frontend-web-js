import Header from "./header";
import Footer from "./footer";
import { BaseLayoutProps as BaseLayoutProps } from "../types/layout";
import clsx from "clsx";

const BaseLayout = ({
  children,
  isAuthPage = false,
  isPaddingHeader: isPaddingHeader = true,
  isPaddingFooter: isPaddingFooter = true,
}: BaseLayoutProps) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 flex flex-col justify-between">
      <Header isAuthPage={isAuthPage} />
      <div
        className={clsx(
          "flex-1",
          isPaddingHeader === true ? "pt-12" : "",
          isPaddingFooter === true ? "pb-12" : ""
        )}
      >
        {children}
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default BaseLayout;
