import Banner from "@/components/user/organization/banner";
import EventItem from "@/components/user/organization/event-item";
import SidebarSection from "@/components/user/organization/sidebar";
import BaseLayout from "@/layouts/base";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shadcn/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { EventProps } from "@/types/event";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import clsx from "clsx";
import { useState } from "react";

const Organization = () => {
  const [activeTab, setActiveTab] = useState("event");
  const listData: EventProps[] = [
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
      <BaseLayout isPaddingHeader={false}>
        <div className="px-28">
          <Banner />
          <Tabs
            defaultValue="event"
            onValueChange={(value) => setActiveTab(value)}
            className={clsx(
              "mt-8 border-t-2 border-gray-300 transition-all duration-300 ease-in-out space-y-6"
            )}
          >
            <TabsList className={clsx("font-bold text-gray-500")}>
              <TabsTrigger
                value="event"
                className={clsx(
                  activeTab === "event"
                    ? "text-poppy-500 border-b-2 border-b-poppy-500"
                    : ""
                )}
              >
                <p className={clsx("py-2 px-4")}>Event</p>
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className={clsx(
                  activeTab === "about"
                    ? "text-poppy-500 border-b-2 border-b-poppy-500"
                    : ""
                )}
              >
                <p className={clsx("py-2 px-4")}>Tentang Ormawa</p>
              </TabsTrigger>
              <div className={clsx("h-0.5 bg-gray-300")} />
            </TabsList>
            <TabsContent value="event">
              <div className="flex space-x-8">
                <SidebarSection />
                <div className={clsx("w-full")}>
                  <div className="flex justify-between">
                    <div className="flex space-x-2 items-center bg-white border border-gray-200 rounded-md px-2 py-2">
                      <MagnifyingGlassIcon
                        className={clsx("w-5 h-5 text-gray-800")}
                      />
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
              </div>
            </TabsContent>
            <TabsContent value="about">
              <p className={clsx("text-gray-500")}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto pariatur aliquid optio praesentium doloribus vitae
                rem magni repudiandae numquam vel officiis et exercitationem at
                distinctio, quae quis deserunt, eveniet quos. Veritatis commodi
                similique quod, cumque veniam beatae expedita odio eius atque
                autem nostrum, est voluptas modi culpa fuga voluptatibus iste.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </BaseLayout>
    </>
  );
};

export default Organization;
