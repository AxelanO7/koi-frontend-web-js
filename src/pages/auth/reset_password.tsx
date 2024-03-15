import { useState } from "react";
import logo from "../../assets/logo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import AuthLayout from "../../layouts/auth";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleResetPassword = () => {
    console.log("Reset password");
  };

  return (
    <>
      <AuthLayout>
        <div className="p-6 border-b border-gray-200 shadow-sm">
          <img src={logo} alt="logo" className="w-12" />
        </div>
        <form className="bg-white border border-gray-200 shadow-md w-96 p-8 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-bold text-center mb-4">
            Lupa Kata Sandi
          </h1>
          <p className="text-[#717D96] text-center font-normal text-xs mb-6">
            Mohon masukan alamat emailmu, kami akan mengirimkan tautan untuk
            reset password. Terimakasih
          </p>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Password Baru</label>
            <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password baru"
                className="focus:outline-none"
              />
              {showPassword ? (
                <EyeSlashIcon
                  className="text-gray-400 h-6 w-6 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeIcon
                  className="text-gray-400 h-6 w-6 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <p className="font-normal text-xs text-[#717D96] mb-8">
              Gunakan kombinasi huruf, angka dan simbol
            </p>
          </div>
          <div className="space-y-2 mb-8">
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
          <button
            className="w-full bg-[#E35050] text-white p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#E53030] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E53030] focus:ring-opacity-50 transform active:scale-95"
            onClick={handleResetPassword}
          >
            Simpan Password Baru
          </button>
        </form>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
