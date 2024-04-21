import clsx from "clsx";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";
import EventItem from "./event-item";
import { EventItemProps } from "@/types/event";
import { Button } from "@/shadcn/components/ui/button";

const RecommendationSection = () => {
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
      <div>
        <div className="flex justify-between mt-8">
          <p className={clsx("font-semibold text-lg")}>
            Rekomendasi Event Lainnya
          </p>
          <Button className={clsx("bg-poppy-500 mr-4")}>Lihat Semua</Button>
        </div>
        <ScrollArea
          className="rounded-md whitespace-nowrap overflow-x-auto mt-4"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div className={clsx("mt-4 flex space-x-4 w-max")}>
            {listData.map((item) => (
              <EventItem key={item.id} item={item} />
            ))}
          </div>
          <Scrollbar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default RecommendationSection;
