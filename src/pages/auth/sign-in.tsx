import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import BaseLayout from "../../layouts/base";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = () => {
    window.location.href = "/register";
  };
  const handleForgotPassword = () => {
    window.location.href = "/forgot-password";
  };

  return (
    <>
      <BaseLayout isAuthPage={true}>
        <form className="bg-white border border-gray-200 shadow-md w-96 p-8 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-bold text-center mb-4">Login Akun</h1>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Masukkan email"
            />
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Password</label>
            <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
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
          <div className="flex justify-end items-center mb-4">
            <p
              className="font-semibold text-sm cursor-pointer"
              onClick={handleForgotPassword}
            >
              Lupa Kata Sandi?
            </p>
          </div>
          <button className="w-full bg-poppy-500 text-white p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-poppy-600 font-semibold focus:outline-none focus:ring-2 focus:ring-poppy-600 focus:ring-opacity-50 transform active:scale-95">
            Masuk
          </button>
          <div className="flex justify-center items-center mt-4">
            <p className="text-sm text-[#717D96]">Belum punya akun?</p>
            <p
              className="text-sm text-poppy-500 font-semibold ml-2 cursor-pointer transition-all duration-300 ease-in-out hover:text-poppy-600"
              onClick={handleRegister}
            >
              Daftar Gratis
            </p>
          </div>
        </form>
      </BaseLayout>
    </>
  );
};

export default Signin;
