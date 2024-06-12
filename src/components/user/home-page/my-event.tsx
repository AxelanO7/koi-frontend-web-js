import { PencilSquareIcon } from "@heroicons/react/16/solid";
import {
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import imgCalender from "@/assets/images/calender.png";

const MyEventSection = () => {
  const isTrue = true;
  const isLogged = isTrue ? 0 : 1;
  return (
    <>
      <div className="hidden xl:block">
        {isLogged === 0 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-xl">Event Saya</p>
              <p className="font-semibold text-sm text-poppy-500">
                Selengkapnya
              </p>
            </div>
            <img
              src="https://via.placeholder.com/340"
              className="rounded-lg mt-2"
            />
            <h1 className="font-semibold text-base max-w-md mt-4">
              SEMINAR NASIONAL HIMA-TI INSTIKI 2023 : How Social Media Shaping
              Society
            </h1>
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-2xl font-bold text-poppy-500">Rp 240.000</h3>
              <button className="bg-success text-white font-semibold rounded-2xl px-4 py-1">
                Terdaftar
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <CalendarIcon className="w-5 h-5" />
                <p className="font-medium text-lg">12 Agustus 2024</p>
              </div>
              <button className="bg-blue-500 text-white font-semibold rounded-2xl px-4 py-1">
                Offline
              </button>
            </div>
            <div className="flex mt-4 space-x-2 text-gray-500 items-center">
              <ClockIcon className="w-5 h-5" />
              <p className="font-medium text-lg">08:30 WITA</p>
            </div>
            <div className="flex mt-4 space-x-2 text-gray-500 items-center">
              <MapPinIcon className="w-5 h-5" />
              <p className="font-medium text-lg">Aula INSTIKI</p>
            </div>
            <div className="flex mt-4 space-x-2 text-gray-500 items-center">
              <ChartBarIcon className="w-5 h-5" />
              <p className="font-medium text-lg">Nasional</p>
            </div>
            <button className="bg-poppy-500 justify-center flex items-center w-full py-2 mt-4 rounded-lg space-x-2 text-white font-semibold">
              <p>Absen Kehadiran</p>
              <PencilSquareIcon className="w-6 h-6" />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between space-x-16">
              <p className="font-semibold text-xl w-max">Event Saya</p>
              <p className="font-semibold text-sm text-poppy-500">
                Selengkapnya
              </p>
            </div>
            <div className="w-full flex justify-center my-8">
              <img src={imgCalender} className="w-[156px]" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold text-xl">Belum Mengikuti Event</p>
              <p className="font-medium text-sm text-gray-400">
                Ayo ikuti salah satu event dan dapatkan pengalaman yang
                menyenangkan
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyEventSection;
