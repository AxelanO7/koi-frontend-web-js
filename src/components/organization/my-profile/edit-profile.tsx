import { getBaseUrl, getBaseUrlLocalUpload } from "@/helpers/api";
import { getImageUpload } from "@/helpers/image";
import { Button } from "@/shadcn/components/ui/button";
import { UserProps } from "@/types/user";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  profileProps?: UserProps;
}

const EditProfileSection = ({ profileProps }: Props) => {
  const [cover, setCover] = useState<File>();
  const [logo, setLogo] = useState<File>();
  const [form, setForm] = useState({
    nama_ormawa: profileProps?.ormawa?.nama_ormawa,
    email: profileProps?.ormawa?.email,
    deskripsi: profileProps?.ormawa?.deskripsi,
    // cover: profileProps?.ormawa?.cover,
    // logo: profileProps?.ormawa?.logo,
  });

  const uploadFile = () => {
    const formDataLogo = new FormData();
    formDataLogo.append("file", logo!);
    axios
      .post(`${getBaseUrlLocalUpload()}/local/upload/profile`, formDataLogo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const formDataCover = new FormData();
    formDataCover.append("file", cover!);
    axios
      .post(`${getBaseUrlLocalUpload()}/local/upload/cover`, formDataCover, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    const payload = {
      id: profileProps?.id,
      nama_ormawa: form.nama_ormawa || profileProps?.ormawa?.nama_ormawa,
      email: form.email || profileProps?.ormawa?.email,
      deskripsi: form.deskripsi || profileProps?.ormawa?.deskripsi,
      jenis_ormawa: profileProps?.ormawa?.jenis_ormawa,
      status: profileProps?.ormawa?.status,
      logo: logo?.name,
      cover: cover?.name,
    };

    // validate payload empty
    if (
      payload.nama_ormawa === "" ||
      payload.email === "" ||
      payload.deskripsi === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Form tidak boleh kosong",
      });
      return;
    }

    axios
      .put(
        `${getBaseUrl()}/user/private/edit-profile/${profileProps?.role}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        uploadFile();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Profile berhasil diubah",
        }).then(async () => {
          // window.location.reload();
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

  return (
    <>
      <div className={clsx("bg-white rounded-lg p-8 border")}>
        <p className={clsx("font-semibold text-xl")}>Edit Profil</p>
        <div className="flex mt-8 space-x-8">
          <div className={clsx("w-full")}>
            <label className={clsx("font-semibold text-sm")}>Nama Ormawa</label>
            <input
              type="text"
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Nama Ormawa"
              defaultValue={profileProps?.ormawa?.nama_ormawa}
              onChange={(e) =>
                setForm({ ...form, nama_ormawa: e.target.value })
              }
            />
            <div className="h-4" />
            <label className={clsx("font-semibold text-sm")}>Email</label>
            <input
              type="email"
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Email"
              defaultValue={profileProps?.ormawa?.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="h-4" />
            <label className={clsx("font-semibold text-sm")}>
              Deskripsi Ormawa
            </label>
            <textarea
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2 h-60"
              )}
              placeholder="Deskripsi Ormawa"
              defaultValue={profileProps?.ormawa?.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            />
          </div>
          <div className={clsx("w-full")}>
            <div className="flex space-x-4">
              <img
                src={getImageUpload({
                  type: "profile",
                  fileName: profileProps?.ormawa?.logo,
                })}
                className={clsx("w-20 h-20 rounded-lg")}
              />
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setLogo(e.target.files[0]);
                    }
                  }}
                />
                {/* <Button className={clsx("bg-poppy-500 text-white")}>
                  Upload Foto
                  <ArrowUpOnSquareIcon className={clsx("h-5 w-5 ml-2")} />
                </Button> */}
                <p className={clsx("text-sm text-gray-500 mt-2")}>
                  Ukuran file: maksimum 10 Megabytes (MB). Ekstensi file yang
                  diperbolehkan: .JPG .JPEG .PNG
                </p>
              </div>
            </div>
            <p className={clsx("text-base text-gray-500 mt-4 font-semibold")}>
              Sampul Profil
            </p>
            <img
              src={
                getImageUpload({
                  type: "cover",
                  fileName: profileProps?.ormawa?.cover,
                }) || "https://via.placeholder.com/500x200"
              }
            />
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setCover(e.target.files[0]);
                }
              }}
              className="mt-4"
            />
            {/* <img
              src="https://via.placeholder.com/500x200"
              className={clsx("mt-2")}
            />
            */}
            <p className={clsx("text-xs text-gray-500 mt-2 font-normal")}>
              Rekomendasi ukuran sampul 17 x 3 pixel. Ukuran file: maksimum 10
              Megabytes (MB). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button variant={"outline"}>Batalkan</Button>
          <Button
            variant={"destructive"}
            className={clsx("bg-poppy-500 text-white")}
            onClick={handleSubmit}
          >
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfileSection;
