import RegisteredEventSection from "@/components/user/event/registered";
import RegisteringEvent from "@/components/user/event/registering";
import { getBaseUrl } from "@/helpers/api";
import BaseLayout from "@/layouts/base";
import { DetailEventProps, PaymentProps } from "@/types/event";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RegisterEventPage = () => {
  const idParam = window.location.pathname.split("/")[3];
  const [isRegistered, setIsRegistered] = useState(false);
  const [event, setEvent] = useState<DetailEventProps>({} as DetailEventProps);
  const [payment, setPayment] = useState<PaymentProps>({} as PaymentProps);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDetailEventById();
  }, []);

  const getDetailEventById = async () => {
    let eventByStudents: PaymentProps[] = [];

    let eventById: DetailEventProps = {} as DetailEventProps;
    let selectedEvent: PaymentProps = {} as PaymentProps;

    let isExistEvent = false;

    setIsLoading(true);
    await axios
      .get(`${getBaseUrl()}/pembayaran/private/get-event-by-mahasiswa`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: PaymentProps[] = res.data.data;
        eventByStudents = dataRes;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Role Unauthorized",
            text: "Anda tidak memiliki akses ke halaman ini",
          }).then(() => {
            window.location.href = "/";
          });
        }
        console.log(err);
      });

    await axios
      .get(`${getBaseUrl()}/detail-kegiatan/public/get-by-id/${idParam}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: DetailEventProps = res.data.data;
        eventById = dataRes;
      })
      .catch((err) => {
        console.log(err);
      });

    eventByStudents.forEach((event) => {
      if (event.event_id === eventById.event_id) {
        isExistEvent = true;
        selectedEvent = event;
      }
    });
    // eventByStudents.forEach((event) => {
    //   if (event.event_id === eventById.event_id) {
    //     isExistEvent = true;
    //   }
    // });

    if (isExistEvent) {
      setIsRegistered(true);
    }
    setEvent(eventById);
    setPayment(selectedEvent);
    setIsLoading(false);
  };

  // const getEventByStudent = async () => {
  //   setIsLoading(true);
  //   axios
  //     .get(`${getBaseUrl()}/pembayaran/private/get-event-by-mahasiswa`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setEvent(res.data.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <>
      <BaseLayout>
        {isLoading ? (
          <p className="text-center text-lg font-semibold">Loading...</p>
        ) : !isRegistered ? (
          <RegisteringEvent eventProps={event} paymentProps={payment} />
        ) : (
          <RegisteredEventSection eventProps={event} paymentProps={payment} />
        )}
      </BaseLayout>
    </>
  );
};

export default RegisterEventPage;
