import { CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { EventProps } from "../../../types/event";
import { getImageUpload } from "@/helpers/image";

const EventItem = ({ item }: { item: EventProps }) => {
  const price = item.harga_tiket.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
  const date = new Date(item.tanggal_kegiatan).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const activityLevel = item.tingkat_kegiatan
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleTapRecomendationEvent = (id: string) => {
    window.location.href = `/event/${id}`;
  };

  return (
    <>
      <div
        className="flex space-x-4 bg-white rounded-lg shadow-md p-4"
        onClick={() =>
          handleTapRecomendationEvent(
            (item.detail_kegiatan?.id || "").toString()
          )
        }
      >
        <img
          src={getImageUpload({
            type: "poster",
            fileName: item.detail_kegiatan?.gambar_kegiatan || "",
          })}
          alt="gambar kegiatan"
          className="w-44 h-44 object-cover rounded-lg"
        />
        <div className="py-2 flex flex-col justify-between">
          <p className="font-semibold text-base line-clamp-2 max-w-60 whitespace-normal">
            {item.nama_kegiatan}
          </p>
          <p className="font-bold text-lg text-poppy-500">{price} </p>
          <div className="flex space-x-2 text-white">
            <button
              className={`
                ${item.its_open ? "bg-success" : "bg-danger"}
                 py-1 px-2 rounded-xl font-medium text-xs`}
            >
              {item.its_open ? "Buka" : "Tutup"}
            </button>
            <button className="bg-blue-500 py-1 px-2 rounded-xl font-medium text-xs">
              Offline
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4" />
            <p className="text-sm">{date} </p>
          </div>
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="w-4 h-4" />
            <p className="text-sm">{activityLevel}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventItem;
