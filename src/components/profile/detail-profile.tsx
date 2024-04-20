import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shadcn/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import EventItem from "../home-page/event-item";
import { EventItemProps } from "@/types/event";
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
  EnvelopeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/shadcn/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

const DetailProfileSection = () => {
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
        <div className="flex justify-between items-center">
          <div>
            <div className="flex">
              <img
                src="https://via.placeholder.com/150"
                alt="profile"
                className="w-24 h-24 rounded-full"
              />
              <div className="w-8" />
              <div>
                <h1 className="text-2xl font-semibold">Nama</h1>
                <div className="flex items-center">
                  <PhoneIcon className={clsx("w-5 h-5")} />
                  <div className={clsx("w-2")} />
                  <p className={clsx("font-normal text-sm")}>087123456789</p>
                  <div className="w-8" />
                  <EnvelopeIcon className={clsx("w-5 h-5")} />
                  <div className={clsx("w-2")} />
                  <p className={clsx("font-normal text-sm")}>a@gmail.com</p>
                </div>
                <div className="h-2" />
                <div className="flex items-center">
                  <MapPinIcon className={clsx("w-5 h-5")} />
                  <div className={clsx("w-2")} />
                  <p className={clsx("font-normal text-sm")}>Kota Denpasar</p>
                </div>
              </div>
            </div>
          </div>
          <Button className={clsx("bg-poppy-500 text-white")}>
            Edit Profil
            <PencilSquareIcon className={clsx("w-5 h-5 ml-2")} />
          </Button>
        </div>
        <Tabs defaultValue="event" className={clsx("space-y-4 ")}>
          <TabsList
            className={clsx("mt-8 font-bold border-y-2 border-grey-200")}
          >
            <TabsTrigger
              value="event"
              className={clsx("text-poppy-500 border-b-2 border-b-poppy-500")}
            >
              <p className={clsx("py-2")}>Event yang diikuti</p>
              <div className={clsx("border-r-2 border-gray-200 w-full")} />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="event"></TabsContent>
        </Tabs>

        <div className="flex justify-between mt-8">
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

export default DetailProfileSection;
