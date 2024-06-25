import BaseLayout from "@/layouts/base";
import { useEffect, useState } from "react";
import { UserProps } from "@/types/user";
import { getBaseUrl } from "@/helpers/api";
import axios from "axios";
// user
import SidebarUserSection from "@/components/user/home-page/sidebar";
// import MyEventUserSection from "@/components/user/home-page/my-event";
import ListEventUserSection from "@/components/user/home-page/list-event";

//organization

// student affair
import DashboardOrganization from "../organization/dashboard";
import DashboardStudentAffair from "../student-affair/dashboard";
import { EventProps } from "@/types/event";

const HomePage = () => {
  // global
  const [profile, setProfile] = useState<UserProps>();
  const getProfile = () => {
    const baseUrl = getBaseUrl();
    axios
      .get(`${baseUrl}/user/private/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: UserProps = res.data.data;
        setProfile(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [events, setEvents] = useState<EventProps[]>([]);
  const [listData, setListData] = useState<EventProps[]>([]);
  const getAllEvents = async () => {
    const baseUrl = getBaseUrl();
    axios
      .get(`${baseUrl}/event/public/get-all-events`)
      .then((response) => {
        const resData = response.data.data;
        console.log(response.data);
        setListData(resData);
        setEvents(resData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const translateCategory = (category: string) => {
    switch (category) {
      case "seminar":
        return "seminar";
      case "workshop":
        return "workshop";
      case "lomba":
        return "Lomba";
      case "hiburan":
        return "hiburan";
      case "kegiatan_sosial":
        return "kegiatan_sosial";
      default:
        return "seminar";
    }
  };

  const setCategorySidebar = (category: string) => {
    const listDataEvent = events;
    if (category === "all") {
      setListData(listDataEvent);
      setActiveCategorySidebar("all");
      return;
    }
    setActiveCategorySidebar(category);
    const filteredList = listDataEvent.filter((item) => {
      return translateCategory(item.category) === category;
    });
    setListData(filteredList);
  };

  const [activeCategorySidebar, setActiveCategorySidebar] = useState("all");

  const getHomepage = (role: string) => {
    switch (role) {
      case "mahasiswa":
        return userPage();
      case "ormawa":
        return dashboardOrganization();
      case "kemahasiswaan":
        return dashboardStudentAffair();
      default:
        return userPage();
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  // user
  const userPage = () => {
    return (
      <>
        <BaseLayout>
          <div className="flex mx-4 space-x-8 ps-2 pe-4">
            <SidebarUserSection
              categorySidebar={activeCategorySidebar}
              setCategorySidebar={setCategorySidebar}
            />
            <ListEventUserSection listData={listData} />
            {/* <MyEventUserSection /> */}
          </div>
        </BaseLayout>
      </>
    );
  };

  // organization
  const dashboardOrganization = () => {
    return <DashboardOrganization profileProps={profile} />;
  };

  // student affair
  const dashboardStudentAffair = () => {
    return <DashboardStudentAffair profileProps={profile} />;
  };

  useEffect(() => {
    getProfile();
  }, []);

  return getHomepage(profile?.role || "user");
};

export default HomePage;
