import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { Button } from "@/shadcn/components/ui/button";

const ChangePasswordSection = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleResetPassword = () => {
    console.log("Reset password");
  };

  return (
    <>
      <div className={clsx("bg-white p-8 rounded-md shadow-md border w-full")}>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <div className="space-y-2 mt-8">
          <label className="text-sm font-semibold">Password Sebelumnya</label>
          <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Masukkan password sebelumnya"
              className="focus:outline-none"
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
          <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Masukkan password baru"
              className="focus:outline-none"
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
          <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Masukkan password baru"
              className="focus:outline-none"
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
        <div className="flex space-x-2 mt-8 w-max">
          <Button
            className={clsx(
              "w-full bg-white text-black border border-gray-200"
            )}
            variant={"secondary"}
          >
            Batal
          </Button>
          <Button
            className={clsx("w-full bg-poppy-500")}
            onClick={handleResetPassword}
          >
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordSection;
