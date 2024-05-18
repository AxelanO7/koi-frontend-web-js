import ChangePasswordSection from "./change-password";
import DetailProfileSection from "./detail-profile";
import EditProfileSection from "./edit-profile";
import MenuProfileSection from "./menu-profile";

const MyProfileSection = () => {
  return (
    <div className="flex bg-gray-100 w-full p-8">
      <MenuProfileSection />
      <div className="w-12" />
      {/* <DetailProfileSection /> */}
      {/* <EditProfileSection /> */}
      <ChangePasswordSection />
    </div>
  );
};

export default MyProfileSection;
