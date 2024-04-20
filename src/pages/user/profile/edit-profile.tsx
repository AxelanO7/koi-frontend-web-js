import EditPhotoSection from "@/components/profile/edit-photo-section";
import InputEditProfileSection from "@/components/profile/input-edit-profile";
import BaseLayout from "@/layouts/base";

const EditProfile = () => {
  return (
    <>
      <BaseLayout>
        <div className="flex mx-64 space-x-24 ps-2 pe-4">
          <InputEditProfileSection />
          <EditPhotoSection />
        </div>
      </BaseLayout>
    </>
  );
};

export default EditProfile;
