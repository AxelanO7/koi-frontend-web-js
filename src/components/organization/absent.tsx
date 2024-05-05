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

enum EventStatus {
  Reviewed = "Ditinjau",
  Approved = "Disetujui",
  Rejected = "Ditolak",
}

const AbsentSection = () => {
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
        name_participant: "Nama 1",
        name_event: "Seminar",
        time_register: "Nasional",
        no_telephone: "12-12-2021",
        payment_method: "Transfer",
        status_participant: EventStatus.Reviewed,
      },
      {
        name_participant: "Nama 2",
        name_event: "Contest",
        time_register: "Nasional",
        no_telephone: "12-12-2021",
        payment_method: "Transfer",
        status_participant: EventStatus.Approved,
      },
      {
        name_participant: "Nama 3",
        name_event: "Entertainment",
        time_register: "Nasional",
        no_telephone: "12-12-2021",
        payment_method: "Transfer",
        status_participant: EventStatus.Rejected,
      },
      {
        name_participant: "Nama 4",
        name_event: "Workshop",
        time_register: "Nasional",
        no_telephone: "12-12-2021",
        payment_method: "Transfer",
        status_participant: EventStatus.Reviewed,
      },
      {
        name_participant: "Nama 5",
        name_event: "Social",
        time_register: "Nasional",
        no_telephone: "12-12-2021",
        payment_method: "Transfer",
        status_participant: EventStatus.Approved,
      },
    ],
  };

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
              {data.events.map((event, index) => (
                <tr
                  key={index}
                  className={clsx("text-center border-b border-gray-200")}
                >
                  <td className={clsx("py-4")}>{event.name_participant}</td>
                  <td className={clsx("py-4")}>{event.name_event}</td>
                  <td className={clsx("py-4")}>{event.time_register}</td>
                  <td className={clsx("py-4")}>{event.no_telephone}</td>
                  <td className={clsx("py-4")}>{event.payment_method}</td>
                  <td className={clsx("py-4")}>
                    <Button
                      size={"sm"}
                      className={clsx(
                        "text-white rounded-2xl w-20 h-8 font-semibold",
                        event.status_participant === EventStatus.Reviewed
                          ? "bg-yellow-500"
                          : event.status_participant === EventStatus.Approved
                          ? "bg-success"
                          : "bg-danger"
                      )}
                    >
                      {event.status_participant}
                    </Button>
                  </td>
                  <td className={clsx("py-4 px-4")}>
                    <div className={clsx("space-y-2 flex flex-col")}>
                      <Button
                        variant={"outline"}
                        className={clsx("text-white bg-success")}
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

export default AbsentSection;
