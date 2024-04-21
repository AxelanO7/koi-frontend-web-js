import {
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const ShortDescriptionEvent = () => {
  return (
    <>
      <div className={clsx("max-w-72")}>
        <img
          src="https://via.placeholder.com/200"
          alt="event"
          className={clsx("rounded-md w-full object-cover")}
        />
        <div className="space-y-2 mt-4">
          <h1 className="font-semibold text-base">
            SEMINAR NASIONAL HIMA-TI INSTIKI 2023 : How Social Media Shaping
            Society
          </h1>
          <h3 className="text-2xl font-bold text-poppy-500">Rp 240.000</h3>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 text-gray-500 items-center">
              <CalendarIcon className="w-5 h-5" />
              <p className="font-medium text-lg">12 Agustus 2024</p>
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
            <p className="font-medium text-lg">08:30 WITA</p>
          </div>
          <div className="flex space-x-2 text-gray-500 items-center">
            <MapPinIcon className="w-5 h-5" />
            <p className="font-medium text-lg">Aula INSTIKI</p>
          </div>
          <div className="flex space-x-2 text-gray-500 items-center">
            <ChartBarIcon className="w-5 h-5" />
            <p className="font-medium text-lg">Nasional</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortDescriptionEvent;
