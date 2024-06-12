import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { Button } from "@/shadcn/components/ui/button";
import { getBaseUrl } from "@/helpers/api";
import { UserProps } from "@/types/user";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePasswordUser = () => {
  // form state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profile, setProfile] = useState<UserProps>();

  const handleResetPassword = () => {
    const payload = {
      user_id: profile?.id.toString(),
      password: newPassword,
      password_confirmation: confirmPassword,
    };

    axios
      .post(`${getBaseUrl()}/user/private/reset-password`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Password berhasil diubah",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Password gagal diubah",
        });
      });
  };

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

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className={clsx("w-full")}>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <div className="space-y-2 mt-8">
          <label className="text-sm font-semibold">Password Sebelumnya</label>
          <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Masukkan password sebelumnya"
              className="focus:outline-none"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {showOldPassword ? (
              <EyeSlashIcon
                className="text-gray-400 h-6 w-6 cursor-pointer"
                onClick={() => setShowOldPassword(false)}
              />
            ) : (
              <EyeIcon
                className="text-gray-400 h-6 w-6 cursor-pointer"
                onClick={() => setShowOldPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="space-y-2 mt-8">
          <label className="text-sm font-semibold">Password Baru</label>
          <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Masukkan password baru"
              className="focus:outline-none"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {showNewPassword ? (
              <EyeSlashIcon
                className="text-gray-400 h-6 w-6 cursor-pointer"
                onClick={() => setShowNewPassword(false)}
              />
            ) : (
              <EyeIcon
                className="text-gray-400 h-6 w-6 cursor-pointer"
                onClick={() => setShowNewPassword(true)}
              />
            )}
          </div>
          <p className="font-normal text-xs text-[#717D96] mb-8">
            Gunakan kombinasi huruf, angka dan simbol
          </p>
        </div>
        <div className="space-y-2 mt-8">
          <label className="text-sm font-semibold">
            Konfirmasi Password Baru
          </label>
          <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Masukkan password baru"
              className="focus:outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirmPassword ? (
              <EyeSlashIcon
                className="text-gray-400 h-6 w-6 cursor-pointer"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <EyeIcon
                className="text-gray-400 h-6 w-6 cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>
          <p className="font-normal text-xs text-[#717D96] mb-8">
            Gunakan kombinasi huruf, angka dan simbol
          </p>
        </div>
        <div className="flex space-x-2 mt-8">
          <Button
            className={clsx("bg-white text-black border border-gray-200 w-32")}
            variant={"secondary"}
          >
            Batal
          </Button>
          <Button
            className={clsx("bg-poppy-500 w-32")}
            onClick={handleResetPassword}
          >
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordUser;
