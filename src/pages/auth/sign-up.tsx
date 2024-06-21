import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import swal from "sweetalert2";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    window.location.href = "/login";
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

    if (!confirmPassword) {
      swal.fire("Gagal!", "Konfirmasi password tidak boleh kosong", "error");
      return false;
    }

    if (password !== confirmPassword) {
      swal.fire(
        "Gagal!",
        "Password dan konfirmasi password tidak sama",
        "error"
      );
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (!validateInput()) {
      return;
    }
    axios
      .post("http://localhost:4000/user/public/register", {
        // universal
        // username: username,
        // password: password,
        // confirm_password: confirmPassword,
        // mahasiswa
        // nim: 123456789,
        // username: username,
        // role: "mahasiswa",
        // password: password,
        // confirm_password: confirmPassword,
        // ormawa
        // role: "ormawa",
        // nama_ormawa: username,
        // status: 1,
        // password: password,
        // confirm_password: confirmPassword,
        // kemahasiswaan
        username: username,
        nama_ormawa: username,
        role: "kemahasiswaan",
        password: password,
        confirm_password: confirmPassword,
        status: 1,
      })
      .then(async () => {
        await swal.fire("Berhasil!", "Akun berhasil dibuat", "success");
        window.location.href = "/login";
      })
      .catch((err) => {
        swal.fire("Gagal!", err.response.data.error, "error");
      });
  };

  return (
    <>
      <BaseLayout isAuthPage={true}>
        <div className="bg-white border border-gray-200 shadow-md w-96 p-8 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-bold text-center mb-4">Daftar Akun</h1>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Nama</label>
            <input
              className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Masukkan nama lengkap"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* <div className="space-y-2 mb-4">
            <label className="text-sm font-semibold">Email</label>
            <input
              className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Masukkan email"
            />
          </div> */}

          {/* password */}
          <div className="space-y-2 mb-2">
            <label className="text-sm font-semibold">Password</label>
            <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password kamu"
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
          <p className="font-normal text-xs text-[#717D96] mb-8">
            Gunakan kombinasi huruf, angka dan simbol
          </p>

          {/* confirm_password */}
          <div className="space-y-2 mb-2">
            <label className="text-sm font-semibold">Konfirmasi Password</label>
            <div className="flex justify-between items-center space-x-2 border border-gray-200 p-2 rounded-md focus-within:border-blue-500 transition-all duration-300 ease-in-out">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Masukkan password kamu"
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
          </div>
          <p className="font-normal text-xs text-[#717D96] mb-8">
            Gunakan kombinasi huruf, angka dan simbol
          </p>

          <button
            className="w-full bg-poppy-500 text-white p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-poppy-600 font-semibold focus:outline-none focus:ring-2 focus:ring-poppy-600 focus:ring-opacity-50 transform active:scale-95"
            onClick={handleRegister}
          >
            Daftar Sekarang
          </button>
          <div className="flex justify-center items-center mt-4">
            <p className="text-sm text-[#717D96]">Sudah punya akun?</p>
            <p
              className="text-sm text-poppy-500 font-semibold ml-2 cursor-pointer"
              onClick={handleLogin}
            >
              Login disini
            </p>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Signup;
