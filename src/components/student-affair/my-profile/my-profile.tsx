import { UserProps } from "@/types/user";
import ChangePasswordSection from "./change-password";
import MenuProfileSection from "./menu-profile";
import { activeMyAccountStudentAffair } from "@/core/store";
import { useRecoilValue, useRecoilState } from "recoil";
import DetailProfileSection from "./detail-profile";
import EditProfileSection from "./edit-profile";

interface Props {
  profileProps?: UserProps;
}

const MyProfileSection = ({ profileProps }: Props) => {
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
          profileProps={profileProps}
        />
      ) : activeCategorySidebar === "change_password" ? (
        <ChangePasswordSection profileProps={profileProps} />
      ) : activeCategorySidebar === "edit_profile" ? (
        <EditProfileSection profileProps={profileProps} />
      ) : null}
    </div>
  );
};

export default MyProfileSection;
