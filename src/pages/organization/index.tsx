import MyEventSection from "@/components/organization/my-event";
import SidebarDashboardSection from "@/components/organization/sidebar-dashboard";
import BaseLayout from "@/layouts/base";
import clsx from "clsx";

const index = () => {
  return (
    <>
      <BaseLayout
        isPaddingFooter={false}
        isPaddingHeader={false}
        backgroundColor="bg-white"
      >
        <div className={clsx("flex space-x-4")}>
          <SidebarDashboardSection />
          <MyEventSection />
        </div>
      </BaseLayout>
    </>
  );
};

export default index;
