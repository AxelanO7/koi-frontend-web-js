import Header from "./header";
import Footer from "./footer";
import { BaseLayoutProps as BaseLayoutProps } from "../types/layout";
import clsx from "clsx";

const BaseLayout = ({
  children,
  isAuthPage = localStorage.getItem("token") ? false : true,
  isPaddingHeader: isPaddingHeader = true,
  isPaddingFooter: isPaddingFooter = true,
  backgroundColor: backgroundColor = "bg-gray-50",
}: BaseLayoutProps) => {
  return (
    <div
      className={clsx(
        "min-h-screen overflow-x-hidden flex flex-col justify-between"
      )}
    >
      <Header isAuthPage={isAuthPage} />
      <div
        className={clsx(
          "flex-1",
          isPaddingHeader === true ? "pt-12" : "",
          isPaddingFooter === true ? "pb-12" : "",
          backgroundColor
        )}
      >
        {children}
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default BaseLayout;
