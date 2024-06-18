import { getBaseUrl } from "@/helpers/api";
import { Button } from "@/shadcn/components/ui/button";
import { Calendar } from "@/shadcn/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { UserProps } from "@/types/user";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const InputEditProfileSection = () => {
  const [profile, setProfile] = useState<UserProps>();

  // form
  const [name, setName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [gender, setGender] = useState<number>();
  const [placeOfBirth, setPlaceOfBirth] = useState<string>();
  const [address, setAddress] = useState<string>();

  const getProfile = () => {
    const baseUrl = getBaseUrl();
    axios
      .get(`${baseUrl}/user/private/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const dataRes: UserProps = res.data.data;
        setProfile(dataRes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateProfile = () => {
    const parsedDate = date
      ? format(date, "yyyy-MM-dd")
      : profile?.mahasiswa?.tanggal_lahir;
    const payload = {
      id: profile?.id,
      nim: profile?.mahasiswa?.nim,
      nama_mahasiswa: name || profile?.mahasiswa?.nama_mahasiswa,
      role: profile?.role,
      no_telepon: phoneNumber || profile?.mahasiswa?.no_telepon,
      email: email || profile?.mahasiswa?.email,
      tanggal_lahir: parsedDate,
      jenis_kelamin: gender || profile?.mahasiswa?.jenis_kelamin,
      tempat_lahir: placeOfBirth || profile?.mahasiswa?.tempat_lahir,
      alamat_tinggal: address || profile?.mahasiswa?.alamat_tinggal,
    };
    if (profile?.role === "mahasiswa") {
      payload["nim"] = profile?.mahasiswa?.nim;
    }
    axios
      .put(
        `${getBaseUrl()}/user/private/edit-profile/${profile?.role}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Profile berhasil diubah",
        }).then(() => {
          getProfile();
          // window.location.href = "/profile";
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Profile gagal diubah",
        });
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

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
            defaultValue={profile?.mahasiswa?.nama_mahasiswa}
            placeholder="Ketikkan nama lengkapmu"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>No Telepon</p>
          <input
            className={clsx(
              "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            )}
            defaultValue={profile?.mahasiswa?.no_telepon}
            placeholder="Ketikkan no teleponmu"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>Email</p>
          <input
            className={clsx(
              "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            )}
            defaultValue={profile?.mahasiswa?.email}
            placeholder="Masukkan emailmu"
            onChange={(e) => setEmail(e.target.value)}
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
                variant={"secondary"}
              >
                {date ? (
                  format(date, "PPP")
                ) : profile?.mahasiswa?.tanggal_lahir || false ? (
                  format(new Date(profile?.mahasiswa?.tanggal_lahir), "PPP")
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
                gender === 1 ? "bg-poppy-500 text-white" : "",
                gender === undefined && profile?.mahasiswa?.jenis_kelamin === 1
                  ? "bg-poppy-500 text-white"
                  : ""
              )}
              variant={"outline"}
              onClick={() => setGender(1)}
            >
              Laki-laki
            </Button>
            <Button
              className={clsx(
                "border border-gray-300 rounded-2xl text-sm w-1/2 shadow-none bg-white text-gray-400",
                gender === 0 ? "bg-poppy-500 text-white" : "",
                gender === undefined && profile?.mahasiswa?.jenis_kelamin === 0
                  ? "bg-poppy-500 text-white"
                  : ""
              )}
              variant={"outline"}
              onClick={() => setGender(0)}
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
            defaultValue={profile?.mahasiswa?.tempat_lahir}
            placeholder="Masukkan Kota / Kabupaten Lahir Kamu"
            onChange={(e) => setPlaceOfBirth(e.target.value)}
          />
        </div>
        <div className="h-4" />
        <div className={clsx("space-y-1 w-full")}>
          <p className={clsx("font-medium text-sm")}>Alamat Tinggal</p>
          <input
            className={clsx(
              "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
            )}
            defaultValue={profile?.mahasiswa?.alamat_tinggal}
            placeholder="Masukkan Alamat Tinggal Kamu"
            onChange={(e) => setAddress(e.target.value)}
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
          <Button
            className={clsx("bg-poppy-500 text-white w-full")}
            onClick={updateProfile}
          >
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputEditProfileSection;
