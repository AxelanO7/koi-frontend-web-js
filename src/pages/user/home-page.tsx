import Sidebar from "../../components/home-page/sidebar";
import BaseLayout from "../../layouts/base";
import MyEvent from "../../components/home-page/my-event";
import ListEvent from "../../components/home-page/list-event";

const HomePage = () => {
  return (
    <>
      <BaseLayout>
        <div className="flex mx-4 space-x-8 ps-2 pe-4">
          <Sidebar />
          <ListEvent />
          <MyEvent />
        </div>
      </BaseLayout>
    </>
  );
};

export default HomePage;
