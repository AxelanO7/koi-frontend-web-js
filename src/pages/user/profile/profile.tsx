import DetailProfileSection from "@/components/user/profile/detail-profile";
import SidebarSection from "@/components/user/profile/sidebar";
import BaseLayout from "@/layouts/base";

const Profile = () => {
  return (
    <>
      <BaseLayout>
        <div className="flex mx-4 space-x-8 ps-2 pe-4">
          <SidebarSection />
          <DetailProfileSection />
        </div>
      </BaseLayout>
    </>
  );
};

export default Profile;
