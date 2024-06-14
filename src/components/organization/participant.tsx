import { Button } from "@/shadcn/components/ui/button";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shadcn/components/ui/pagination";
import axios from "axios";
import { getBaseUrl } from "@/helpers/api";
import { useEffect, useState } from "react";
import { PaymentProps } from "@/types/event";
import { getStatusButtonColor, getStatusText } from "@/helpers/status";
import Swal from "sweetalert2";

const ParticipantSection = () => {
  const [participants, setParticipants] = useState<PaymentProps[]>();
  const [eventCategoryLength, setEventCategoryLength] = useState({
    seminar: 0,
    contest: 0,
    workshop: 0,
    entertainment: 0,
    activity_social: 0,
  });
  const getParticipants = () => {
    axios
      .get(`${getBaseUrl()}/pembayaran/public/get-event`)
      .then((res) => {
        console.log(res.data);
        const resData: PaymentProps[] = res.data.data;
        setEventLength(resData);
        setParticipants(resData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const setEventLength = (listData: PaymentProps[]) => {
    const categoryLength = {
      seminar: 0,
      contest: 0,
      workshop: 0,
      entertainment: 0,
      activity_social: 0,
    };
    listData.forEach((data) => {
      switch (data.event?.category) {
        case "seminar":
          categoryLength.seminar++;
          break;
        case "lomba":
          categoryLength.contest++;
          break;
        case "workshop":
          categoryLength.workshop++;
          break;
        case "hiburan":
          categoryLength.entertainment++;
          break;
        case "kegiatan_sosial":
          categoryLength.activity_social++;
          break;
        default:
          break;
      }
    });
    setEventCategoryLength(categoryLength);
  };

  const handleTapAccRegistration = (val: PaymentProps) => {
    axios
      .put(
        `${getBaseUrl()}/pembayaran/private/update-status/${val.id}`,
        {
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pendaftaran berhasil di acc",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Pendaftaran gagal di acc",
        });
      });
  };

  useEffect(() => {
    getParticipants();
  }, []);

  return (
    <>
      <div className={clsx("w-full p-4 bg-gray-50")}>
        <p className={clsx("font-medium text-2xl")}>Peserta Event</p>
        <div className={clsx("mt-8 bg-white rounded-lg py-4")}>
          <div className="flex justify-between px-8">
            <div className="flex space-x-2 items-center bg-white border border-gray-200 rounded-md px-2 py-2">
              <MagnifyingGlassIcon className={clsx("w-5 h-5 text-gray-800")} />
              <input
                className={clsx(
                  "focus:outline-none font-medium text-base text-gray-900"
                )}
                placeholder="Cari nama event disini"
              />
            </div>
            <div className="flex space-x-2 items-center">
              <Select>
                <SelectTrigger className="space-x-2">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter 1</SelectLabel>
                    <SelectItem value="i1">FItem 1</SelectItem>
                    <SelectItem value="i2">FItem 2</SelectItem>
                    <SelectItem value="i3">FItem 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="space-x-2">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort 1</SelectLabel>
                    <SelectItem value="s1">SItem 1</SelectItem>
                    <SelectItem value="s2">SItem 2</SelectItem>
                    <SelectItem value="s3">SItem 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <table className={clsx("w-full mt-4")}>
            <thead className={clsx("border-y border-gray-200 text-center")}>
              <tr>
                <th className={clsx("py-4")}>Nama Peserta</th>
                <th className={clsx("py-4")}>Nama Event</th>
                <th className={clsx("py-4")}>Waktu Pendaftaran</th>
                <th className={clsx("py-4")}>No Telepon</th>
                <th className={clsx("py-4")}>Metode Pembayaran</th>
                <th className={clsx("py-4 w-32")}>Status Peserta</th>
                <th className={clsx("py-4 w-44")}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {participants?.map((participant, index) => (
                <tr
                  key={index}
                  className={clsx("text-center border-b border-gray-200")}
                >
                  <td className={clsx("py-4")}>{participant.nama_peserta}</td>
                  <td className={clsx("py-4")}>
                    {participant.event?.nama_kegiatan}
                  </td>
                  <td className={clsx("py-4")}>
                    {new Date(
                      participant?.created_at || Date.now()
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className={clsx("py-4")}>{participant.no_telepon}</td>
                  <td className={clsx("py-4")}>
                    {participant.tipe_pembayaran}
                  </td>
                  <td className={clsx("py-4")}>
                    <Button
                      size={"sm"}
                      className={clsx(
                        "text-white rounded-2xl w-20 h-8 font-semibold",
                        getStatusButtonColor(participant.status)
                      )}
                    >
                      {getStatusText(participant.status)}
                    </Button>
                  </td>
                  <td className={clsx("py-4 px-4")}>
                    <div className={clsx("space-y-2 flex flex-col")}>
                      <Button
                        variant={"outline"}
                        className={clsx("text-white bg-success")}
                        onClick={() => handleTapAccRegistration(participant)}
                      >
                        <CheckIcon className={clsx("w-5 h-5 mr-2")} />
                        Acc Pendaftaran
                      </Button>
                      <Button
                        variant={"outline"}
                        className={clsx("text-black")}
                      >
                        <CreditCardIcon className={clsx("w-5 h-5 mr-2")} />
                        Detail Peserta
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination className={clsx("mt-4")}>
            <PaginationContent>
              <PaginationItem>
                <ChevronLeftIcon className={clsx("w-5 h-5")} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  isActive
                  className={clsx("bg-poppy-500 text-white")}
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>3</PaginationLink>
              </PaginationItem>
              {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
              <PaginationItem>
                <ChevronRightIcon className={clsx("w-5 h-5")} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default ParticipantSection;
