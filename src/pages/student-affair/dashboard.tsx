// import MyEventSection from "@/components/organization/my-event";
import AbsentSection from "@/components/organization/absent";
import MyEventSection from "@/components/organization/my-event";
import MyProfileSection from "@/components/organization/my-profile/my-profile";
import ParticipantSection from "@/components/organization/participant";
import SidebarDashboardSection from "@/components/organization/sidebar-dashboard";
import EventOrganizationSection from "@/components/student-affair/event-organization";
import { activeSidebarHomepageStudentAffair } from "@/core/store";
import BaseLayout from "@/layouts/base";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

const DashboardStudentAffair = () => {
  const activeCategorySidebar = useRecoilValue(
    activeSidebarHomepageStudentAffair
  );
  const getPageActive = () => {
    switch (activeCategorySidebar) {
      case "event_organization":
        return <EventOrganizationSection />;
      case "my_event":
        return <MyEventSection />;
      case "participant_event":
        return <ParticipantSection />;
      case "absent_participant":
        return <AbsentSection />;
      case "my_account":
        return <MyProfileSection />;
      default:
        return <MyEventSection />;
    }
  };
  return (
    <>
      <BaseLayout
        isPaddingFooter={false}
        isPaddingHeader={false}
        backgroundColor="bg-white"
      >
        <div className={clsx("flex space-x-4")}>
          <SidebarDashboardSection />
          {getPageActive()}
        </div>
      </BaseLayout>
    </>
  );
};

export default DashboardStudentAffair;
