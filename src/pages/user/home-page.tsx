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
  const [eventsOriginal, setEventsOriginal] = useState<EventProps[]>([]);
  const getAllEvents = async () => {
    const baseUrl = getBaseUrl();
    axios
      .get(`${baseUrl}/event/public/get-all-events`)
      .then((response) => {
        const resData = response.data.data;
        console.log(response.data);
        setListData(resData);
        setEventsOriginal(resData);
        setEvents(resData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const translateCategory = (val: string) => {
    switch (val) {
      case "seminar":
        return "seminar";
      case "workshop":
        return "workshop";
      case "contest":
        return "lomba";
      case "entertainment":
        return "hiburan";
      case "social_activities":
        return "kegiatan_sosial";
    }
  };

  const setCategorySidebar = (val: string) => {
    const listDataEvent = events;
    if (val === "all") {
      setListData(listDataEvent);
      setActiveCategorySidebar("all");
      return;
    }
    setActiveCategorySidebar(val);
    const listFiltered: EventProps[] = [];
    listDataEvent.forEach((item) => {
      if (item.category === translateCategory(val)) {
        listFiltered.push(item);
      }
    });
    setListData(listFiltered);
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

  const handleSearchEvent = (search: string) => {
    const listDataEvent = eventsOriginal;
    if (search === "") {
      setListData(listDataEvent);
      return;
    }
    const filteredName = listDataEvent.filter((item) => {
      return item.nama_kegiatan.toLowerCase().includes(search.toLowerCase());
    });
    const filteredPrice = listDataEvent.filter((item) => {
      return item.harga_tiket.toString().includes(search);
    });
    const filteredDate = listDataEvent.filter((item) => {
      return item.tanggal_kegiatan.includes(search);
    });
    const filteredScope = listDataEvent.filter((item) => {
      return item.tingkat_kegiatan.toLowerCase().includes(search.toLowerCase());
    });

    const filteredList = [
      ...filteredName,
      ...filteredPrice,
      ...filteredDate,
      ...filteredScope,
    ];
    const uniqueList = Array.from(new Set(filteredList.map((a) => a.id))).map(
      (id) => {
        return filteredList.find((a) => a.id === id);
      }
    );
    setListData(uniqueList);
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
            <ListEventUserSection
              listData={listData}
              searchEvents={handleSearchEvent}
            />
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
