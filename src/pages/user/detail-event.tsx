import Recommendation from "../../components/detail-event/recommendation";
import BreadCrumb from "../../components/detail-event/breadcrumb";
import Description from "../../components/detail-event/description";
import Ownership from "../../components/detail-event/ownership";
import Register from "../../components/detail-event/register";
import BaseLayout from "../../layouts/base";

const DetailEvent = () => {
  return (
    <>
      <BaseLayout>
        <div className="ps-2 pe-4 mx-4">
          <BreadCrumb />
          <div className="mt-4 flex space-x-12">
            <Ownership />
            <Description />
            <Register />
          </div>
          <Recommendation />
        </div>
      </BaseLayout>
    </>
  );
};

export default DetailEvent;
