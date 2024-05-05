// import MyEventSection from "@/components/organization/my-event";
import AbsentSection from "@/components/organization/absent";
import MyEventSection from "@/components/organization/my-event";
import MyProfileSection from "@/components/organization/my-profile/my-profile";
import ParticipantSection from "@/components/organization/participant";
import SidebarDashboardSection from "@/components/organization/sidebar-dashboard";
import BaseLayout from "@/layouts/base";
import clsx from "clsx";

const DashboardOrganization = () => {
  return (
    <>
      <BaseLayout
        isPaddingFooter={false}
        isPaddingHeader={false}
        backgroundColor="bg-white"
      >
        <div className={clsx("flex space-x-4")}>
          <SidebarDashboardSection />
          {/* <MyEventSection /> */}
          {/* <ParticipantSection /> */}
          {/* <AbsentSection /> */}
          <MyProfileSection />
        </div>
      </BaseLayout>
    </>
  );
};

export default DashboardOrganization;
