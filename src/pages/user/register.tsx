import RegisteredEventSection from "@/components/user/event/registered";
import RegisteringEventSection from "@/components/user/event/registering";
import { getBaseUrl } from "@/helpers/api";
import BaseLayout from "@/layouts/base";
import { AbsentProps, DetailEventProps, PaymentProps } from "@/types/event";
import { UserProps } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RegisterEventPage = () => {
  const idParam = window.location.pathname.split("/")[3];
  const [event, setEvent] = useState<DetailEventProps>({} as DetailEventProps);
  const [absent, setAbsent] = useState<AbsentProps>({} as AbsentProps);
  const [payment, setPayment] = useState<PaymentProps>({} as PaymentProps);

  const [isRegistered, setIsRegistered] = useState(false);
  const [isAbsent, setIsAbsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (idParam) {
      fetchData();
    }
  }, [idParam]);

  const fetchData = async () => {
    let eventByStudents: PaymentProps[] = [];
    let absents: AbsentProps[] = [];

    let eventById: DetailEventProps = {} as DetailEventProps;
    let selectedEvent: PaymentProps = {} as PaymentProps;
    let userAbsent = {} as AbsentProps;
    let user = {} as UserProps;

    let isAlreadyAbsent = false;
    let isExistEvent = false;

    setIsLoading(true);

    await axios
      .get(`${getBaseUrl()}/user/private/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: UserProps = res.data.data;
        user = dataRes;
      })
      .catch((err) => {
        console.log(err);
      });

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

    await axios
      .get(`${getBaseUrl()}/absensi/public/get-absent/${eventById.event_id}`)
      .then((res) => {
        console.log(res.data);
        const dataRes: AbsentProps[] = res.data.data;
        absents = dataRes;
      })
      .catch((err) => {
        console.log(err);
      });

    // check if student already absent
    absents.forEach((absent) => {
      if (absent.user_id === user.id) {
        isAlreadyAbsent = true;
        userAbsent = absent;
      }
    });

    // check if student already registered
    eventByStudents.forEach((event) => {
      if (event.event_id === eventById.event_id) {
        isExistEvent = true;
        selectedEvent = event;
      }
    });

    if (isExistEvent) setIsRegistered(true);
    if (isAlreadyAbsent) setIsAbsent(true);

    setEvent(eventById);
    setPayment(selectedEvent);
    setAbsent(userAbsent);
    setIsLoading(false);
  };

  return (
    <>
      <BaseLayout>
        {isLoading ? (
          <p className="text-center text-lg font-semibold">Loading...</p>
        ) : !isRegistered ? (
          <RegisteringEventSection eventProps={event} paymentProps={payment} />
        ) : (
          <RegisteredEventSection
            eventProps={event}
            paymentProps={payment}
            absentProps={absent}
            isAbsentProps={isAbsent}
          />
        )}
      </BaseLayout>
    </>
  );
};

export default RegisterEventPage;
