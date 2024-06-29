import { Button } from "@/shadcn/components/ui/button";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
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
import { getImageUpload } from "@/helpers/image";

const ParticipantSection = () => {
  const [participants, setParticipants] = useState<PaymentProps[]>();
  const getParticipants = () => {
    axios
      .get(`${getBaseUrl()}/pembayaran/public/get-event`)
      .then((res) => {
        console.log(res.data);
        const resData: PaymentProps[] = res.data.data;
        // setEventLength(resData);
        setParticipants(resData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTapAccRegistration = (val: PaymentProps) => {
    if (val.status === "approved") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Pendaftaran sudah di acc",
      });
      return;
    }
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
        getParticipants();
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

  const handleTapRejectRegistration = (val: PaymentProps) => {
    if (val.status === "rejected") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Pendaftaran sudah di tolak",
      });
      return;
    }
    axios
      .put(
        `${getBaseUrl()}/pembayaran/private/update-status/${val.id}`,
        {
          status: "rejected",
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
          text: "Pendaftaran berhasil di tolak",
        });
        getParticipants();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Pendaftaran gagal di tolak",
        });
      });
  };

  const handleTapDetailParticipant = (val: PaymentProps) => {
    const image = getImageUpload({
      type: "proof",
      fileName: val.bukti_pembayaran,
    });

    Swal.fire({
      icon: "info",
      title: "Detail Peserta",
      html: `
        <div class="flex flex-col space-y-2">
          <p class="font-medium">Nama Peserta : ${val.nama_peserta}</p>
          <p class="font-medium">Nama Event : ${val.event?.nama_kegiatan}</p>
          <p class="font-medium">Waktu Pendaftaran : ${new Date(
            val?.created_at || Date.now()
          ).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p class="font-medium">No Telepon : ${val.no_telepon}</p>
          <p class="font-medium">Metode Pembayaran : ${val.tipe_pembayaran}</p>
          <p class="font-medium">Status Peserta : ${getStatusText(
            val.status
          )}</p>
          <div class="flex space x-2 items-center">
            <p class="font-medium">Bukti Presensi : </p>
            <img src="${image}"  class="w-64 h-64" />
          </div>
        </div>
      `,
    });
  };

  const handleSearch = (val: string) => {
    if (participants === undefined) {
      return;
    }
    if (val === "") {
      getParticipants();
      return;
    }
    // filter all
    const filteredName = participants.filter((participant) =>
      participant.nama_peserta.toLowerCase().includes(val.toLowerCase())
    );
    const filteredEvent = participants.filter((participant) =>
      participant.event?.nama_kegiatan.toLowerCase().includes(val.toLowerCase())
    );
    const filteredPhone = participants.filter((participant) =>
      participant.no_telepon.toLowerCase().includes(val.toLowerCase())
    );
    const filteredPayment = participants.filter((participant) =>
      participant.tipe_pembayaran.toLowerCase().includes(val.toLowerCase())
    );
    const filteredDate = participants.filter((participant) =>
      new Date(participant.created_at || Date.now())
        .toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .toLowerCase()
        .includes(val.toLowerCase())
    );
    const filteredStatus = participants.filter((participant) =>
      getStatusText(participant.status)
        .toLowerCase()
        .includes(val.toLowerCase())
    );
    const filtered = [
      ...filteredName,
      ...filteredEvent,
      ...filteredPhone,
      ...filteredPayment,
      ...filteredStatus,
      ...filteredDate,
    ];
    const unique = filtered.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    setParticipants(unique);
  };

  const handleTapDeleteEvent = (id: number) => {
    Swal.fire({
      icon: "warning",
      title: "Hapus Event",
      text: "Apakah anda yakin ingin menghapus peserta ini?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${getBaseUrl()}/pembayaran/private/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Peserta berhasil dihapus",
            });
            getParticipants();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Pvent gagal dihapus",
            });
          });
      }
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
                placeholder="Cari nama peserta disini"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {/* <div className="flex space-x-2 items-center">
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
            </div> */}
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
                        className={clsx("text-white bg-danger")}
                        onClick={() => handleTapRejectRegistration(participant)}
                      >
                        <XMarkIcon className={clsx("w-5 h-5 mr-2")} />
                        Tolak Pendaftaran
                      </Button>
                      <Button
                        variant={"outline"}
                        className={clsx("text-black")}
                        onClick={() => handleTapDetailParticipant(participant)}
                      >
                        <CreditCardIcon className={clsx("w-5 h-5 mr-2")} />
                        Detail Peserta
                      </Button>
                      {/* delete button */}
                      <Button
                        variant={"outline"}
                        className={clsx("text-white bg-danger")}
                        onClick={() => handleTapDeleteEvent(participant.id!)}
                      >
                        <TrashIcon className={clsx("w-5 h-5 mr-2")} />
                        Hapus
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
