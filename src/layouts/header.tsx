import { useRecoilValue } from "recoil";
import logo from "../assets/images/logo.png";
import { HeaderFooterProps } from "../types/layout";
import { isLogged } from "../core/store";

const Header = ({ isAuthPage: isAuthPage }: HeaderFooterProps) => {
  const logged = useRecoilValue(isLogged);

  return (
    <>
      <div className="p-6 border-b border-gray-200 shadow-sm flex items-center justify-between">
        <img src={logo} alt="logo" className="h-8 md:h-10" />
        {isAuthPage ? null : (
          <div className="flex justify-end">
            {logged ? (
              <img
                src="https://via.placeholder.com/150"
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <>
                <div className="flex space-x-4 justify-between">
                  <button className="bg-white px-4 py-2 rounded-md border border-poppy-500 text-poppy-500 hover:bg-slate-500 hover:text-white">
                    Login
                  </button>
                  <button className="bg-poppy-500 text-white px-4 py-2 rounded-md hover:bg-slate-500 hover:text-white border border-poppy-500">
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
