import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import EventSearchImage from "../../../assets/images/event_search.png";
import { EventProps } from "../../../types/event";
import EventItem from "./event-item";
import clsx from "clsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shadcn/components/ui/pagination";

const ListEventSection = ({ listData }: { listData: EventProps[] }) => {
  const handleTapEvent = (id: string) => {
    window.location.href = `/event/${id}`;
  };
  return (
    <>
      <div className="w-full">
        <div
          className="rounded-lg bg-cover bg-center bg-no-repeat px-4 py-8"
          style={{
            backgroundImage: `url(${EventSearchImage})`,
          }}
        >
          <p className="text-base font-bold md:text-2xl md:font-bold text-white">
            Mau Ikut Event Apa Hari Ini
          </p>
          <div className="flex items-center p-2 mt-2 rounded-lg space-x-3 bg-white">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            <input
              placeholder="Cari nama event disini"
              className="focus:outline-none placeholder-gray-400 m-0 p-0 w-full text-sm font-normal"
            />
          </div>
          {/* <div className="flex w-full justify-end mt-4 space-x-2">
            <div className="flex rounded-xl bg-white focus:outline-none p-2 items-center space-x-1">
              <select className="bg-white focus:outline-none text-sm font-normal md:text-base md:font-normal">
                <option value="Filter">Filter</option>
              </select>
              <ChevronDownIcon className="text-black w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="flex rounded-xl bg-white focus:outline-none p-2 items-center space-x-1">
              <select className="bg-white focus:outline-none text-sm font-normal md:text-base md:font-normal">
                <option value="Urutkan">Urutkan</option>
              </select>
              <ChevronDownIcon className="text-black w-4 h-4 md:w-6 md:h-6" />
            </div>
          </div> */}
        </div>
        {listData.length === 0 && (
          <div className="flex justify-center items-center mt-8">
            <p className="text-lg font-bold text-gray-700">Tidak ada data</p>
          </div>
        )}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {listData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-clip"
            >
              <EventItem
                item={item}
                onClick={() =>
                  handleTapEvent((item.detail_kegiatan?.id || "").toString())
                }
              />
            </div>
          ))}
        </div>
        <Pagination className={clsx("mt-8")}>
          <PaginationContent>
            <PaginationItem>
              <ChevronLeftIcon className={clsx("w-5 h-5")} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>2</PaginationLink>
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
    </>
  );
};

export default ListEventSection;
