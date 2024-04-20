import SidebarSection from "../../components/home-page/sidebar";
import BaseLayout from "../../layouts/base";
import MyEventSection from "../../components/home-page/my-event";
import ListEventSection from "../../components/home-page/list-event";

const HomePage = () => {
  return (
    <>
      <BaseLayout>
        <div className="flex mx-4 space-x-8 ps-2 pe-4">
          <SidebarSection />
          <ListEventSection />
          <MyEventSection />
        </div>
      </BaseLayout>
    </>
  );
};

export default HomePage;
