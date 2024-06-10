import { CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { EventProps } from "../../../types/event";

const EventItem = ({
  item,
  onClick,
}: {
  item: EventProps;
  onClick: () => void;
}) => {
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

  return (
    <>
      <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
        <div className="flex space-x-4">
          <img
            src={
              item?.detail_kegiatan?.gambar_kegiatan ||
              "https://via.placeholder.com/600"
            }
            alt="gambar kegiatan"
            className="w-48 h-48 object-cover"
          />
          <div className="py-2 flex flex-col justify-between">
            <h3 className="font-semibold text-base line-clamp-2">
              {item.nama_kegiatan}
            </h3>
            <p className="font-bold text-xl text-poppy-500">{price} </p>
            <div className="flex space-x-2 text-white">
              <button
                className={`
                ${item.its_open === 1 ? "bg-success" : "bg-danger"}
                 px-2 py-1 rounded-xl font-medium text-sm`}
              >
                {item.its_open ? "Buka" : "Tutup"}
              </button>
              <button className="bg-blue-500 px-2 py-1 rounded-xl font-medium text-sm">
                Offline
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5" />
              <p className="text-sm ">{date} </p>
            </div>
            <div className="flex items-center space-x-2">
              <ChartBarIcon className="w-5 h-5" />
              <p className="text-sm ">{activityLevel}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventItem;
