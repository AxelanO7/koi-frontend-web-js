import { useRecoilState, useRecoilValue } from "recoil";
import ChangePasswordSection from "./change-password";
import DetailProfileSection from "./detail-profile";
import MenuProfileSection from "./menu-profile";
import EditProfileSection from "./edit-profile";
import { UserProps } from "@/types/user";
import { activeMyAccountOrganization } from "@/core/store";

interface Props {
  profileProps?: UserProps;
}

const MyProfileSection = ({ profileProps }: Props) => {
  const activeCategorySidebar = useRecoilValue(activeMyAccountOrganization);
  const [activeSidebar, setActiveSidebar] = useRecoilState(
    activeMyAccountOrganization
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
