import { Button } from "@/shadcn/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
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

const EventOrganizationSection = () => {
  enum EventStatus {
    Reviewed = "Ditinjau",
    Approved = "Disetujui",
    Rejected = "Ditolak",
  }
  const data = {
    event: {
      proposed: 10,
      accomplished: 5,
    },
    type: {
      seminar: 5,
      contest: 3,
      entertainment: 2,
      workshop: 1,
      social: 4,
    },
    events: [
      {
        name: "Event 1",
        category: "Seminar",
        level: "Nasional",
        date: "12-12-2021",
        status: EventStatus.Reviewed,
      },
      {
        name: "Event 2",
        category: "Lomba",
        level: "Nasional",
        date: "12-12-2021",
        status: EventStatus.Approved,
      },
      {
        name: "Event 3",
        category: "Hiburan",
        level: "Nasional",
        date: "12-12-2021",
        status: EventStatus.Rejected,
      },
    ],
  };
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
                  {data.event.proposed}
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
                  {data.event.proposed}
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
                  {data.type.seminar}
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
                  {data.type.contest}
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
                  {data.type.entertainment}
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
                  {data.type.workshop}
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
                  {data.type.social}
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
                <th className={clsx("py-4")}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.events.map((event, index) => (
                <tr
                  key={index}
                  className={clsx("text-center border-b border-gray-200")}
                >
                  <td className={clsx("py-4")}>{event.name}</td>
                  <td className={clsx("py-4")}>{event.category}</td>
                  <td className={clsx("py-4")}>{event.level}</td>
                  <td className={clsx("py-4")}>{event.date}</td>
                  <td className={clsx("py-4")}>{event.status}</td>
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

export default EventOrganizationSection;
