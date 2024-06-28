// import EditPhotoSection from "@/components/user/profile/edit-photo-section";
// import InputEditProfileSection from "@/components/user/profile/input-edit-profile";
import { getBaseUrl, getBaseUrlLocalUpload } from "@/helpers/api";
import BaseLayout from "@/layouts/base";
import { Calendar } from "@/shadcn/components/ui/calendar";
import { UserProps } from "@/types/user";
import { CalendarDaysIcon } from "@heroicons/react/16/solid";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "@/shadcn/components/ui/button";
import Swal from "sweetalert2";

const EditProfile = () => {
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
      photo: selectedPhoto?.name,
    };
    if (profile?.role === "mahasiswa") {
      payload["nim"] = profile?.mahasiswa?.nim;
    }

    // validate payload empty
    if (
      !name ||
      !phoneNumber ||
      !email ||
      !parsedDate ||
      !placeOfBirth ||
      !address
    ) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Mohon isi semua field",
      });
      return;
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
          uploadFile(selectedPhoto!);
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

  const [selectedPhoto, setSelectedPhoto] = useState<File>();

  const uploadFile = (file: File) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file!);
    axios
      .post(`${getBaseUrlLocalUpload()}/local/upload/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success",
          text: "Upload file success",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Upload file failed",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedPhoto(files[0]);
      // uploadFile(files[0]);
    }
  };
  return (
    <>
      <BaseLayout>
        <div className="flex mx-64 space-x-24 ps-2 pe-4">
          {/* <InputEditProfileSection /> */}
          {/* <EditPhotoSection /> */}
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
                    className="bg-white border border-gray-300 rounded-md shadow-md p-2"
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
                    gender === undefined &&
                      profile?.mahasiswa?.jenis_kelamin === 1
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
                    gender === undefined &&
                      profile?.mahasiswa?.jenis_kelamin === 0
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
              <p className={clsx("font-medium text-sm")}>
                Kota / Kabupaten Lahir
              </p>
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
                variant={"secondary"}
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

          <div className="flex space-x-4">
            <img
              src="https://via.placeholder.com/150"
              className={clsx("rounded-full", "w-28", "h-28")}
            />
            <div className={clsx("space-y-2")}>
              <input
                type="file"
                className={clsx(
                  "bg-poppy-500 border border-gray-300 rounded-md p-2"
                )}
                onChange={handleFileChange}
              />
              {/* <Button
            className={clsx("bg-poppy-500 text-white border border-gray-300")}
          >
            Upload Foto
            <ArrowUpTrayIcon className={clsx("w-5 h-5 ml-2")} />
          </Button> */}
              <p className={clsx("text-sm text-gray-400")}>
                Ukuran file: maksimum 10 Megabytes (MB). Ekstensi file yang
                diperbolehkan: .JPG .JPEG .PNG
              </p>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default EditProfile;
