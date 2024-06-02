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

const Header = ({ isAuthPage: isAuthPage }: HeaderFooterProps) => {
  const logged = localStorage.getItem("token");
  //useRecoilValue(isLogged);

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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

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
                    src="https://via.placeholder.com/150"
                    alt="profile"
                    className="w-12 h-12 rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div
                    className="flex items-center  px-4 hover:bg-gray-200 mt-2 py-2"
                    onClick={handleProfile}
                  >
                    <UserGroupIcon className="w-6 h-6" />
                    <span className="ml-2">Profile</span>
                  </div>
                  <hr className="my-2" />
                  <div
                    className="flex items-center px-4 hover:bg-gray-200 mb-2 py-2"
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
