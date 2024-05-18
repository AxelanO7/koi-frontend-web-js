import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import swal from "sweetalert2";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    window.location.href = "/register";
  };

  const handleForgotPassword = () => {
    window.location.href = "/forgot-password";
  };

  const validateInput = () => {
    if (!username) {
      swal.fire("Gagal!", "Nama tidak boleh kosong", "error");
      return false;
    }

    if (!password) {
      swal.fire("Gagal!", "Password tidak boleh kosong", "error");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) {
      return;
    }
    axios
      .post("http://localhost:4000/user/public/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "error") {
          swal.fire("Gagal!", res.data.message, "error");
          return;
        }
        const role = res.data.data.role;
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        const nextUrl = role == "student" ? "/" : `/${role}/home-page`;
        swal.fire("Berhasil!", "Anda berhasil masuk", "success").then(() => {
          window.location.href = nextUrl;
        });
      })
      .catch((err) => {
        swal.fire(
          "Gagal!",
          "Kredensial yang Anda masukkan salah. Silakan coba lagi.",
          "error"
        );
      });
  };

  return (
    <>
      <BaseLayout isAuthPage={true}>
        <div className="bg-white border border-gray-200 shadow-md w-96 p-8 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-bold text-center mb-4">Login Akun</h1>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Username</label>
            <input
              className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Masukkan username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Password</label>
            <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
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
          <button
            className="w-full bg-poppy-500 text-white p-2 rounded-md hover:bg-poppy-600 font-semibold"
            onClick={handleLogin}
          >
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
        </div>
      </BaseLayout>
    </>
  );
};

export default Signin;
