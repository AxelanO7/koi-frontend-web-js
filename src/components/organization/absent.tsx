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
import { AbsentProps } from "@/types/event";
import { getStatusButtonColor, getStatusText } from "@/helpers/status";
import Swal from "sweetalert2";

const AbsentSection = () => {
  const [absents, setAbsents] = useState<AbsentProps[]>();
  const getAbsents = () => {
    axios
      .get(`${getBaseUrl()}/absensi/public/get-all`)
      .then((res) => {
        console.log(res.data);
        setAbsents(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTapAccRegistration = (val: AbsentProps) => {
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
        `${getBaseUrl()}/absensi/public/update/status/${val.event_id}`,
        {
          status: "approved",
          user_id: val.user_id,
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
        getAbsents();
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

  const handleTapDetailAbsent = (val: AbsentProps) => {
    Swal.fire({
      icon: "info",
      title: "Detail Peserta",
      html: `
      <div class="flex flex-col space-y-2">
        <div class="flex space-x-2 items-center">
          <p class="font-medium">Nama Peserta : ${val.name_mahasiswa} </p>
        </div>
        <div class="flex space x-2 items-center">
          <p class="font-medium">Nama Event : ${val.event?.nama_kegiatan}</p>
        </div>
        <div class="flex space x-2 items-center">
          <p class="font-medium">Waktu Absen : ${new Date(
            val.created_at || Date.now()
          ).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
        </div>
        <div class="flex space x-2 items-center">
          <p class="font-medium">No Telepon : ${val.no_telepon}</p>
        </div>
        <div class="flex space x-2 items-center">
          <p class="font-medium">Metode Pembayaran : ${
            val.event?.pembayaran?.tipe_pembayaran
          }</p>
        </div>
        <div class="flex space x-2 items-center">
          <p class="font-medium">Status Peserta : ${val.status}</p>
        </div>
      </div>
      `,
    });
  };

  useEffect(() => {
    getAbsents();
  }, []);

  return (
    <>
      <div className={clsx("w-full p-4 bg-gray-50")}>
        <p className={clsx("font-medium text-2xl")}>Absensi Peserta</p>
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
                <th className={clsx("py-4")}>Waktu Absen</th>
                <th className={clsx("py-4")}>No Telepon</th>
                <th className={clsx("py-4")}>Metode Pembayaran</th>
                <th className={clsx("py-4 w-32")}>Status Peserta</th>
                <th className={clsx("py-4 w-44")}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {absents?.map((absent, index) => (
                <tr
                  key={index}
                  className={clsx("text-center border-b border-gray-200")}
                >
                  <td className={clsx("py-4")}>{absent.name_mahasiswa}</td>
                  <td className={clsx("py-4")}>
                    {absent.event?.nama_kegiatan}
                  </td>
                  <td className={clsx("py-4")}>
                    {new Date(
                      absent?.created_at || Date.now()
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className={clsx("py-4")}>{absent.no_telepon}</td>
                  <td className={clsx("py-4")}>
                    {absent.event?.pembayaran?.tipe_pembayaran}
                  </td>
                  <td className={clsx("py-4")}>
                    <Button
                      size={"sm"}
                      className={clsx(
                        "text-white rounded-2xl w-20 h-8 font-semibold",
                        getStatusButtonColor(absent.status)
                      )}
                    >
                      {getStatusText(absent.status)}
                    </Button>
                  </td>
                  <td className={clsx("py-4 px-4")}>
                    <div className={clsx("space-y-2 flex flex-col")}>
                      <Button
                        variant={"outline"}
                        className={clsx("text-white bg-success")}
                        onClick={() => handleTapAccRegistration(absent)}
                      >
                        <CheckIcon className={clsx("w-5 h-5 mr-2")} />
                        Acc Absen
                      </Button>
                      <Button
                        variant={"outline"}
                        className={clsx("text-black")}
                        onClick={() => handleTapDetailAbsent(absent)}
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

export default AbsentSection;
