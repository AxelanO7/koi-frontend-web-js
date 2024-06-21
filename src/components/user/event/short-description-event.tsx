import { getImageUpload } from "@/helpers/image";
import { DetailEventProps, PaymentProps } from "@/types/event";
import {
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const ShortDescriptionEvent = ({
  eventProps,
  paymentProps,
}: {
  eventProps: DetailEventProps;
  paymentProps: PaymentProps;
}) => {
  const price = eventProps.event?.harga_tiket.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const date = Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(
    new Date(eventProps.event?.tanggal_kegiatan || "2022-12-31T00:00:00.000Z")
  );

  return (
    <>
      <div className={clsx("max-w-72")}>
        <img
          src={getImageUpload({
            type: "poster",
            fileName: eventProps.gambar_kegiatan,
          })}
          alt="event"
          className={clsx("rounded-md w-full object-cover")}
        />
        <div className="space-y-2 mt-4">
          <h1 className="font-semibold text-base">
            {eventProps?.event?.nama_kegiatan}
          </h1>
          <h3 className="text-2xl font-bold text-poppy-500">{price}</h3>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex space-x-2 text-gray-500 items-center w-max">
              <CalendarIcon className="w-5 h-5" />
              <p className="font-medium text-lg">{date}</p>
            </div>
            <button
              className={clsx(
                "rounded-xl bg-blue-500 text-white font-medium text-xs px-2 py-1"
              )}
            >
              Offline
            </button>
          </div>
          <div className="flex space-x-2 text-gray-500 items-center">
            <ClockIcon className="w-5 h-5" />
            <p className="font-medium text-lg">
              {eventProps.waktu_pelaksanaan} WITA
            </p>
          </div>
          <div className="flex space-x-2 text-gray-500 items-center">
            <MapPinIcon className="w-5 h-5" />
            <p className="font-medium text-lg">{eventProps.lokasi}</p>
          </div>
          <div className="flex space-x-2 text-gray-500 items-center">
            <ChartBarIcon className="w-5 h-5" />
            <p className="font-medium text-lg">
              {eventProps.event?.tingkat_kegiatan}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortDescriptionEvent;
