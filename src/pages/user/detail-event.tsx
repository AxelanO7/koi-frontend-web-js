import RecommendationSection from "../../components/user/detail-event/recommendation";
import BreadCrumb from "../../components/user/detail-event/breadcrumb";
import DescriptionSection from "../../components/user/detail-event/description";
import OwnershipSection from "../../components/user/detail-event/ownership";
import RegisterSection from "../../components/user/detail-event/register";
import BaseLayout from "../../layouts/base";

const DetailEvent = () => {
  return (
    <>
      <BaseLayout>
        <div className="ps-2 pe-4 mx-4">
          <BreadCrumb />
          <div className="mt-4 flex space-x-12">
            <OwnershipSection />
            <DescriptionSection />
            <RegisterSection />
          </div>
          <RecommendationSection />
        </div>
      </BaseLayout>
    </>
  );
};

export default DetailEvent;
