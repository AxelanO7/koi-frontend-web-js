import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import EventSearchImage from "../../assets/images/event_search.png";
import { EventItemProps } from "../../types/event";
import EventItem from "./event-item";
import clsx from "clsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/shadcn/components/ui/pagination";

const ListEvent = () => {
  const listData: EventItemProps[] = [
    {
      id: 1,
      ormawa_id: 1,
      nama_kegiatan:
        "SEMINAR NASIONAL HIMA-TI INSTIKI 2023 : How Social Media Shaping Society",
      harga_tiket: 240000,
      its_open: true,
      tanggal_kegiatan: "2024-08-12",
      tingkat_kegiatan: "Nasional",
      detail_kegiatan: {
        id: 1,
        event_id: 1,
        waktu_pelaksanaan: "2023-08-12",
        lokasi: "Gedung Serba ITS",
        deskripsi: "Seminar Nasional HIMA-TI INSTIKI 2023",
        status: "Aktif",
        gambar_kegiatan: "https://via.placeholder.com/400",
        file_pengajuan: "https://via.placeholder.com/400",
      },
    },
    {
      id: 1,
      ormawa_id: 1,
      nama_kegiatan:
        "Pemecahan Masalah Aljabar: Strategi dan Teknik Makan Bersama",
      harga_tiket: 240000,
      its_open: true,
      tanggal_kegiatan: "2024-08-12",
      tingkat_kegiatan: "Nasional",
      detail_kegiatan: {
        id: 1,
        event_id: 1,
        waktu_pelaksanaan: "2023-08-12",
        lokasi: "Gedung Serba ITS",
        deskripsi: "Seminar Nasional HIMA-TI INSTIKI 2023",
        status: "Aktif",
        gambar_kegiatan: "https://via.placeholder.com/400",
        file_pengajuan: "https://via.placeholder.com/400",
      },
    },
    {
      id: 1,
      ormawa_id: 1,
      nama_kegiatan:
        "Pemecahan Masalah Aljabar: Strategi dan Teknik Makan Bersama",
      harga_tiket: 240000,
      its_open: true,
      tanggal_kegiatan: "2024-08-12",
      tingkat_kegiatan: "Nasional",
      detail_kegiatan: {
        id: 1,
        event_id: 1,
        waktu_pelaksanaan: "2023-08-12",
        lokasi: "Gedung Serba ITS",
        deskripsi: "Seminar Nasional HIMA-TI INSTIKI 2023",
        status: "Aktif",
        gambar_kegiatan: "https://via.placeholder.com/400",
        file_pengajuan: "https://via.placeholder.com/400",
      },
    },
    {
      id: 1,
      ormawa_id: 1,
      nama_kegiatan:
        "Pemecahan Masalah Aljabar: Strategi dan Teknik Makan Bersama",
      harga_tiket: 240000,
      its_open: true,
      tanggal_kegiatan: "2024-08-12",
      tingkat_kegiatan: "Nasional",
      detail_kegiatan: {
        id: 1,
        event_id: 1,
        waktu_pelaksanaan: "2023-08-12",
        lokasi: "Gedung Serba ITS",
        deskripsi: "Seminar Nasional HIMA-TI INSTIKI 2023",
        status: "Aktif",
        gambar_kegiatan: "https://via.placeholder.com/400",
        file_pengajuan: "https://via.placeholder.com/400",
      },
    },
    {
      id: 1,
      ormawa_id: 1,
      nama_kegiatan:
        "Pemecahan Masalah Aljabar: Strategi dan Teknik Makan Bersama",
      harga_tiket: 240000,
      its_open: false,
      tanggal_kegiatan: "2024-08-12",
      tingkat_kegiatan: "Nasional",
      detail_kegiatan: {
        id: 1,
        event_id: 1,
        waktu_pelaksanaan: "2023-08-12",
        lokasi: "Gedung Serba ITS",
        deskripsi: "Seminar Nasional HIMA-TI INSTIKI 2023",
        status: "Aktif",
        gambar_kegiatan: "https://via.placeholder.com/400",
        file_pengajuan: "https://via.placeholder.com/400",
      },
    },
    {
      id: 1,
      ormawa_id: 1,
      nama_kegiatan:
        "Pemecahan Masalah Aljabar: Strategi dan Teknik Makan Bersama",
      harga_tiket: 240000,
      its_open: false,
      tanggal_kegiatan: "2024-08-12",
      tingkat_kegiatan: "Nasional",
      detail_kegiatan: {
        id: 1,
        event_id: 1,
        waktu_pelaksanaan: "2023-08-12",
        lokasi: "Gedung Serba ITS",
        deskripsi: "Seminar Nasional HIMA-TI INSTIKI 2023",
        status: "Aktif",
        gambar_kegiatan: "https://via.placeholder.com/400",
        file_pengajuan: "https://via.placeholder.com/400",
      },
    },
  ];

  return (
    <>
      <div className="w-full">
        <div
          className="rounded-lg bg-cover bg-center bg-no-repeat p-4"
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
          <div className="flex w-full justify-end mt-4 space-x-2">
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
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {listData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-clip"
            >
              <EventItem item={item} />
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

export default ListEvent;
