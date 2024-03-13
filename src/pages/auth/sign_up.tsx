import { useState } from "react";
import logo from "../../assets/logo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <div className="bg-gray-50 w-screen min-h-screen overflow-hidden">
        <div className="p-6 border-b border-gray-200 shadow-sm">
          <img src={logo} alt="logo" className="w-12" />
        </div>
        <form className="bg-white border border-gray-200 shadow-md w-96 p-8 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-bold text-center mb-4">Daftar Akun</h1>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Nama</label>
            <input
              className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Email</label>
            <input
              className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Masukkan email"
            />
          </div>
          <div className="space-y-2 mb-2">
            <label className="text-sm font-semibold">Password</label>
            <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password kamu"
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
          </div>
          <p className="font-normal text-xs text-[#717D96] mb-8">
            Gunakan kombinasi huruf, angka dan simbol
          </p>
          <button className="w-full bg-[#E35050] text-white p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#E53030] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E53030] focus:ring-opacity-50 transform active:scale-95">
            Daftar Sekarang
          </button>
          <div className="flex justify-center items-center mt-4">
            <p className="text-sm text-[#717D96]">Sudah punya akun?</p>
            <p
              className="text-sm text-[#E35050] font-semibold ml-2 cursor-pointer"
              onClick={handleLogin}
            >
              Login disini
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;