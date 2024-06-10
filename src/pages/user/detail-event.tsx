import RecommendationSection from "../../components/user/detail-event/recommendation";
import BreadCrumb from "../../components/user/detail-event/breadcrumb";
import DescriptionSection from "../../components/user/detail-event/description";
import OwnershipSection from "../../components/user/detail-event/ownership";
import RegisterSection from "../../components/user/detail-event/register";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "@/helpers/api";
import { DetailEventProps, EventProps } from "@/types/event";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomSpinner from "@/components/global/spinner";

const DetailEvent = () => {
  const idParam = window.location.pathname.split("/")[2];
  const [eventById, setEventById] = useState<DetailEventProps>();
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([getAllEvents(), getDetailEventById()]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    }
  };

  const getDetailEventById = () => {
    axios
      .get(`${getBaseUrl()}/detail-kegiatan/public/get-by-id/${idParam}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: DetailEventProps = res.data.data;
        setEventById(dataRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllEvents = async () => {
    const baseUrl = getBaseUrl();
    axios
      .get(`${baseUrl}/event/public/get-all-events`)
      .then((response) => {
        console.log(response.data);
        const resData = response.data.data;
        setEvents(resData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (idParam) {
      fetchData();
    }
  }, [idParam]);

  return (
    <>
      <BaseLayout>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <div className="ps-2 pe-4 mx-4">
            {eventById && <BreadCrumb event={eventById} />}
            <div className="mt-4 flex space-x-12">
              {eventById && <OwnershipSection event={eventById} />}
              {eventById && <DescriptionSection event={eventById} />}
              <RegisterSection />
            </div>
            {<RecommendationSection events={events} />}
          </div>
        )}
      </BaseLayout>
    </>
  );
};

export default DetailEvent;
