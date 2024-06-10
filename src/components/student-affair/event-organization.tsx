import { Button } from "@/shadcn/components/ui/button";
import { CreditCardIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import ImgProposedEvent from "@/assets/images/organization/my-event/proposed_event.png";
import ImgAccomplishedEvent from "@/assets/images/organization/my-event/accomplished_event.png";
import ImgSeminar from "@/assets/images/organization/my-event/seminar.png";
import ImgContest from "@/assets/images/organization/my-event/contest.png";
import ImgEntertainment from "@/assets/images/organization/my-event/entertainment.png";
import ImgWorkshop from "@/assets/images/organization/my-event/workshop.png";
import ImgSocial from "@/assets/images/organization/my-event/social.png";
import {
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
import { useEffect, useState } from "react";
import { getBaseUrl } from "@/helpers/api";
import { EventProps } from "@/types/event";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/24/solid";

const EventOrganizationSection = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [totalEvent, setTotalEvent] = useState({
    submission: 0,
    accomplished: 0,
    seminar: 0,
    lomba: 0,
    hiburan: 0,
    workshop: 0,
    kegiatan_sosial: 0,
  });

  const getAllEvents = () => {
    const baseUrl = getBaseUrl();
    axios
      .get(`${baseUrl}/event/public/get-all-events`)
      .then((response) => {
        const resData = response.data.data;
        console.log(response.data);
        assignTotalEventByCategory(resData);
        setEvents(resData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const assignTotalEventByCategory = (events: EventProps[]) => {
    // by status
    let submission = 0;
    let accomplished = 0;

    // by category
    let seminar = 0;
    let lomba = 0;
    let hiburan = 0;
    let workshop = 0;
    let kegiatan_sosial = 0;
    events.forEach((event) => {
      if (event.detail_kegiatan?.status.toLowerCase() === "pending") {
        submission++;
      } else if (event.detail_kegiatan?.status.toLowerCase() === "selesai") {
        accomplished++;
      }
      switch (event.category.toLowerCase()) {
        case "seminar":
          seminar++;
          break;
        case "lomba":
          lomba++;
          break;
        case "hiburan":
          hiburan++;
          break;
        case "workshop":
          workshop++;
          break;
        case "kegiatan_sosial":
          kegiatan_sosial++;
          break;
        default:
          break;
      }
    });
    setTotalEvent({
      submission,
      accomplished,
      seminar,
      lomba,
      hiburan,
      workshop,
      kegiatan_sosial,
    });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <div className={clsx("w-full p-4 bg-gray-50")}>
        <div className="flex justify-between items-center">
          <p className={clsx("font-semibold text-xl")}>
            Pengajuan Event Ormawa
          </p>
          <Button className={clsx("bg-poppy-500")}>
            <PlusIcon className="w-6 h-6 mr-2" />
            Ajukan Event
          </Button>
        </div>
        <div className="flex space-x-4 mt-4">
          <div className="w-full bg-white rounded-md py-4">
            <div className="flex space-x-4 justify-center">
              <img src={ImgProposedEvent} alt="Proposed Event" />
              <div className={clsx("flex flex-col justify-between pb-2")}>
                <p className={clsx("font-medium text-base")}>Event Diajukan</p>
                <p className={clsx("text-4xl font-semibold")}>
                  {totalEvent.submission}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-md py-4">
            <div className="flex space-x-4 justify-center">
              <img src={ImgAccomplishedEvent} alt="Proposed Event" />
              <div className={clsx("flex flex-col justify-between pb-2")}>
                <p className={clsx("font-medium text-base")}>
                  Event Terlaksana
                </p>
                <p className={clsx("text-4xl font-semibold")}>
                  {totalEvent.accomplished}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <div className="w-full bg-white rounded-md py-4">
            <div className="flex space-x-4 justify-center">
              <img src={ImgSeminar} className="w-16 h-16" />
              <div className={clsx("flex flex-col justify-between")}>
                <p className={clsx("font-medium text-base")}>Seminar</p>
                <p className={clsx("text-4xl font-semibold")}>
                  {totalEvent.seminar}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-md py-4">
            <div className="flex space-x-4 justify-center">
              <img src={ImgContest} className="w-16 h-16" />
              <div className={clsx("flex flex-col justify-between")}>
                <p className={clsx("font-medium text-base")}>Lomba</p>
                <p className={clsx("text-4xl font-semibold")}>
                  {totalEvent.lomba}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-md py-4">
            <div className="flex space-x-4 justify-center">
              <img src={ImgEntertainment} className="w-16 h-16" />
              <div className={clsx("flex flex-col justify-between")}>
                <p className={clsx("font-medium text-base")}>Hiburan</p>
                <p className={clsx("text-4xl font-semibold")}>
                  {totalEvent.hiburan}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-md py-4">
            <div className="flex space-x-4 justify-center">
              <img src={ImgWorkshop} className="w-16 h-16" />
              <div className={clsx("flex flex-col justify-between")}>
                <p className={clsx("font-medium text-base")}>Workshop</p>
                <p className={clsx("text-4xl font-semibold")}>
                  {totalEvent.workshop}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-md py-4">
            <div className="flex space-x-4 justify-center">
              <img src={ImgSocial} className="w-16 h-16" />
              <div className={clsx("flex flex-col justify-between")}>
                <p className={clsx("font-medium text-base")}>Kegiatan Sosial</p>
                <p className={clsx("text-4xl font-semibold")}>
                  {totalEvent.kegiatan_sosial}
                </p>
              </div>
            </div>
          </div>
        </div>
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
                <th className={clsx("py-4")}>Nama Event</th>
                <th className={clsx("py-4")}>Kategori</th>
                <th className={clsx("py-4")}>Tingkat</th>
                <th className={clsx("py-4")}>Tanggal</th>
                <th className={clsx("py-4")}>Status</th>
                <th className={clsx("py-4 w-44")}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr
                  key={index}
                  className={clsx("text-center border-b border-gray-200")}
                >
                  <td className={clsx("py-4")}>{event.nama_kegiatan}</td>
                  <td className={clsx("py-4 capitalize")}>{event.category}</td>
                  <td className={clsx("py-4")}>{event.tingkat_kegiatan}</td>
                  <td className={clsx("py-4")}>
                    {Intl.DateTimeFormat("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(event.tanggal_kegiatan))}
                  </td>
                  <td
                    className={clsx("py-4 font-semibold capitalize text-white")}
                  >
                    <p
                      className={clsx(
                        "py-2 px-4 rounded-full w-min mx-auto text-sm font-medium",
                        event.detail_kegiatan?.status === "pending"
                          ? "bg-blue-500"
                          : event.detail_kegiatan?.status === "selesai"
                          ? "bg-green-500"
                          : "bg-red-500"
                      )}
                    >
                      {event.detail_kegiatan?.status === "pending"
                        ? "Ditinjau"
                        : event.detail_kegiatan?.status === "selesai"
                        ? "Disetujui"
                        : "Ditolak"}
                    </p>
                  </td>
                  <td
                    className={clsx(
                      "py-4 flex-col flex space-y-4 w-40 mx-auto"
                    )}
                  >
                    <Button className={clsx("bg-poppy-500 w-36")}>
                      <PencilIcon className={clsx("w-4 h-4 mr-2")} />
                      Edit Event
                    </Button>
                    <Button className={clsx("bg-white text-black w-36")}>
                      <CreditCardIcon className={clsx("w-4 h-4 mr-2")} />
                      Detail Event
                    </Button>
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
                <PaginationLink
                  isActive
                  className={clsx("bg-poppy-500 text-white")}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>3</PaginationLink>
              </PaginationItem>
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

export default EventOrganizationSection;
