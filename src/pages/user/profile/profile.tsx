import DetailProfileSection from "@/components/user/profile/detail-profile";
import SidebarSection from "@/components/user/profile/sidebar";
import { activeSidebarProfileStudent } from "@/core/store";
import BaseLayout from "@/layouts/base";
import { useRecoilValue } from "recoil";
import ChangePasswordUser from "./forgot-password";

const Profile = () => {
  const activeCategorySidebar = useRecoilValue(activeSidebarProfileStudent);

  return (
    <>
      <BaseLayout>
        <div className="flex mx-4 space-x-8 ps-2 pe-4">
          <SidebarSection />
          {activeCategorySidebar === "my_profile" ? (
            <DetailProfileSection />
          ) : (
            <ChangePasswordUser />
          )}
        </div>
      </BaseLayout>
    </>
  );
};

export default Profile;
