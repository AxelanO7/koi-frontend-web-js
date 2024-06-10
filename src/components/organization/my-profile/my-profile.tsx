import { useRecoilState, useRecoilValue } from "recoil";
import ChangePasswordSection from "./change-password";
import DetailProfileSection from "./detail-profile";
import MenuProfileSection from "./menu-profile";
import { activeMyAccountStudentAffair } from "@/core/store";
import EditProfileSection from "./edit-profile";

const MyProfileSection = () => {
  const activeCategorySidebar = useRecoilValue(activeMyAccountStudentAffair);
  const [activeSidebar, setActiveSidebar] = useRecoilState(
    activeMyAccountStudentAffair
  );

  return (
    <div className="flex bg-gray-100 w-full p-8">
      <MenuProfileSection />
      <div className="w-12" />
      {activeCategorySidebar === "my_profile" ? (
        <DetailProfileSection
          setActive={() => setActiveSidebar("edit_profile")}
        />
      ) : activeCategorySidebar === "change_password" ? (
        <ChangePasswordSection />
      ) : activeCategorySidebar === "edit_profile" ? (
        <EditProfileSection />
      ) : null}
    </div>
  );
};

export default MyProfileSection;
