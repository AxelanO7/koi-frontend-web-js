import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";
import { DetailEventProps } from "@/types/event";
import {
  CalendarIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

const DescriptionSection = ({ event }: { event: DetailEventProps }) => {
  // todo: remove comma from price
  const priceEvent = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(event.event?.harga_tiket || 0);

  const dateEvent = new Date(
    event.event?.tanggal_kegiatan || ""
  ).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [infull, setInfull] = useState(false);
  const [activeTab, setActiveTab] = useState("desc");

  return (
    <>
      <div className="w-full">
        <p className="font-semibold text-2xl">{event.event?.nama_kegiatan}</p>
        <p className="font-bold text-3xl text-poppy-500 mt-2">{priceEvent}</p>
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2 items-center font-semibold">
            <CalendarIcon className="w-5 h-5" />
            <p>{dateEvent}</p>
          </div>
          <div className="flex space-x-2 items-center font-semibold">
            <ClockIcon className="w-5 h-5" />
            <p>{event.waktu_pelaksanaan} WITA</p>
          </div>
          <div className="flex space-x-2 items-center font-semibold">
            <MapPinIcon className="w-5 h-5" />
            <p className={clsx("capitalize")}>{event.lokasi}</p>
          </div>
          <div className="flex space-x-2 items-center font-semibold">
            <ChartBarIcon className="w-5 h-5" />
            <p>{event.event?.tingkat_kegiatan}</p>
          </div>
        </div>
        <Tabs
          defaultValue="desc"
          onValueChange={(value) => setActiveTab(value)}
          className={clsx("space-y-4")}
        >
          <TabsList className={clsx("mt-12 font-bold w-full")}>
            <TabsTrigger
              value="desc"
              className={clsx(
                "text-gray-500 border-y-2 border-gray-300 w-1/3",
                activeTab === "desc"
                  ? "text-poppy-500 border-b-2 border-b-poppy-500"
                  : ""
              )}
            >
              <p className={clsx("py-2")}>Deskripsi</p>
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className={clsx(
                "text-gray-500 border-y-2 border-gray-300 w-1/3",
                activeTab === "payment"
                  ? "text-poppy-500 border-b-2 border-b-poppy-500"
                  : ""
              )}
            >
              <p className={clsx("py-2")}>Pembayaran</p>
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className={clsx(
                "text-gray-500 border-y-2 border-gray-300 w-1/3",
                activeTab === "contact"
                  ? "text-poppy-500 border-b-2 border-b-poppy-500"
                  : ""
              )}
            >
              <p className={clsx("py-2")}>Kontak</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="desc">
            <p className={clsx("text-gray-500", infull ? "" : "line-clamp-5")}>
              {event.deskripsi}
            </p>
            {event.deskripsi.toString().length > 200 && (
              <div
                className={clsx(
                  "flex items-center space-x-2 w-full justify-center mt-2"
                )}
              >
                <button
                  onClick={() => setInfull(!infull)}
                  className={clsx("text-poppy-500 cursor-pointer")}
                >
                  {infull ? "Tampilkan lebih sedikit" : "Selengkapnya"}
                </button>
                <ChevronDownIcon
                  className={clsx(
                    "w-5 h-5 text-poppy-500 transform transition duration-300 ease-in-out",
                    infull ? "rotate-180" : ""
                  )}
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="payment">
            <p className={clsx("text-gray-500", infull ? "" : "line-clamp-3")}>
              {event.metode_pembayaran?.map((metode, index) => (
                <p key={index}>
                  a/n {metode.pemilik} - {metode.no_rekening}
                </p>
              ))}
            </p>
          </TabsContent>
          <TabsContent value="contact">
            <p className={clsx("text-gray-500", infull ? "" : "line-clamp-3")}>
              {event.narahubung?.map((kontak, index) => (
                <p key={index}>
                  {kontak.nama_narahubung} - {kontak.no_telepon}
                </p>
              ))}
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DescriptionSection;
