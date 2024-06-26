import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sc/components/ui/popover";

import logo from "../assets/images/logo.png";
import { HeaderFooterProps } from "../types/layout";
import {
  ArrowRightStartOnRectangleIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";

import { getBaseUrl } from "@/helpers/api";
import { UserProps } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { getImageUpload } from "@/helpers/image";

const Header = ({ isAuthPage: isAuthPage }: HeaderFooterProps) => {
  const logged = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  const handleProfile = () => {
    window.location.href = "/profile";
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const [profile, setProfile] = useState<UserProps>();
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

  const getFileName = () => {
    const role = profile?.role;
    if (role === "mahasiswa") {
      return profile?.mahasiswa?.photo;
    } else if (role === "kemahasiswaan") {
      return profile?.ormawa?.logo;
    } else if (role === "ormawa") {
      return profile?.ormawa?.logo;
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="p-6 border-b border-gray-200 shadow-sm flex items-center justify-between">
        <img src={logo} alt="logo" className="h-8 md:h-10" />
        {isAuthPage ? null : (
          <div className="flex justify-end">
            {logged ? (
              <Popover>
                <PopoverTrigger>
                  <img
                    src={getImageUpload({
                      type: "profile",
                      fileName: getFileName(),
                    })}
                    className="w-12 h-12 rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  {role === "mahasiswa" || role === "" ? (
                    <div>
                      <div
                        className="flex items-center  px-4 hover:bg-gray-200  py-2"
                        onClick={handleProfile}
                      >
                        <UserGroupIcon className="w-6 h-6" />
                        <span className="ml-2">Profile</span>
                      </div>
                      <hr className="my-2" />
                    </div>
                  ) : null}
                  <div
                    className="flex items-center px-4 hover:bg-gray-200  py-2"
                    onClick={handleLogout}
                  >
                    <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
                    <span className="ml-2">Logout</span>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <div className="flex space-x-4 justify-between">
                  <button
                    className="bg-white px-4 py-2 rounded-md border border-poppy-500 text-poppy-500 hover:bg-slate-500 hover:text-white hover:border-none"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <button
                    className="bg-poppy-500 text-white px-4 py-2 rounded-md hover:bg-slate-500 hover:text-white border border-poppy-500 hover:border-none"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
