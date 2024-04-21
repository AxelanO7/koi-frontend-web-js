import { Button } from "@/shadcn/components/ui/button";
import { Calendar } from "@/shadcn/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";

const InputEditProfileSection = () => {
  const [date, setDate] = useState<Date>();
  const [gender, setGender] = useState<string>("l");

  return (
    <>
      <div className={clsx("w-full")}>
        <h3 className={clsx("font-medium text-xl")}>Edit Profile</h3>
        <div className={clsx("space-y-1 w-full mt-8")}>
          <p className={clsx("font-medium text-sm")}>Nama</p>
          <input
            className={clsx(
              "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            )}
            placeholder="Ketikkan nama lengkapmu"
          />
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>No Telepon</p>
          <input
            className={clsx(
              "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            )}
            placeholder="Ketikkan no teleponmu"
          />
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>Email</p>
          <input
            className={clsx(
              "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            )}
            placeholder="Masukkan emailmu"
          />
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>Tanggal Lahir</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={clsx(
                  "border border-gray-300 rounded-md text-sm w-full shadow-none text-gray-400 bg-white px-2 py-1"
                )}
              >
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Masukkan Tanggil Lahir Kamu</span>
                )}
                <CalendarDaysIcon className="w-5 h-5 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>Jenis Kelamin</p>
          <div className="flex space-x-4">
            <Button
              className={clsx(
                "border border-gray-300 rounded-2xl text-sm w-1/2 shadow-none bg-white text-gray-400",
                gender === "l" ? "bg-black text-white" : ""
              )}
              onClick={() => setGender("l")}
            >
              Laki-laki
            </Button>
            <Button
              className={clsx(
                "border border-gray-300 rounded-2xl text-sm w-1/2 shadow-none bg-white text-gray-400",
                gender === "p" ? "bg-black text-white" : ""
              )}
              onClick={() => setGender("p")}
            >
              Perempuan
            </Button>
          </div>
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>Kota / Kabupaten Lahir</p>
          <input
            className={clsx(
              "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            )}
            placeholder="Masukkan Kota / Kabupaten Lahir Kamu"
          />
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>Alamat Tinggal</p>
          <input
            className={clsx(
              "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            )}
            placeholder="Masukkan Alamat Tinggal Kamu"
          />
        </div>
        <div className="h-8" />
        <div className="flex space-x-4">
          <Button
            className={clsx(
              "bg-white text-black w-full border border-gray-300 shadow-none"
            )}
          >
            Batal
          </Button>
          <Button className={clsx("bg-poppy-500 text-white w-full")}>
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputEditProfileSection;
