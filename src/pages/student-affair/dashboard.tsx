// import MyEventSection from "@/components/organization/my-event";
import AbsentSection from "@/components/student-affair/absent";
import MyEventSection from "@/components/student-affair/my-event";
import MyProfileSection from "@/components/student-affair/my-profile/my-profile";
import ParticipantSection from "@/components/student-affair/participant";
import SidebarDashboardSection from "@/components/student-affair/sidebar-dashboard";
import EventOrganizationSection from "@/components/student-affair/event-organization";
import { activeSidebarHomepageStudentAffair } from "@/core/store";
import BaseLayout from "@/layouts/base";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { UserProps } from "@/types/user";

const DashboardStudentAffair = ({
  profileProps,
}: {
  profileProps?: UserProps;
}) => {
  const activeCategorySidebar = useRecoilValue(
    activeSidebarHomepageStudentAffair
  );
  const getPageActive = () => {
    switch (activeCategorySidebar) {
      case "event_organization":
        return <EventOrganizationSection />;
      case "my_event":
        return <MyEventSection profileProps={profileProps} />;
      case "participant_event":
        return <ParticipantSection />;
      case "absent_participant":
        return <AbsentSection />;
      case "my_account":
        return <MyProfileSection profileProps={profileProps} />;
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
