import { activeMyAccountStudentAffair } from "@/core/store";
import { KeyIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useRecoilState } from "recoil";

const MenuProfileSection = () => {
  const SidebarItem = [
    {
      id: "my_profile",
      text: "Profile Saya",
      icon: UserCircleIcon,
    },
    {
      id: "change_password",
      text: "Ganti Password",
      icon: KeyIcon,
    },
  ];

  const [activeCategorySidebar, setActiveCategorySidebar] = useRecoilState(
    activeMyAccountStudentAffair
  );

  return (
    <>
      <div className={clsx("bg-white rounded-lg p-4 h-min border")}>
        <div className="space-y-4">
          {SidebarItem.map((item, index) => (
            <div
              key={index}
              className={`${
                activeCategorySidebar === item.id.toLowerCase()
                  ? "bg-poppy-50"
                  : null
              } flex space-x-4 items-center py-2 rounded-lg cursor-pointer hover:bg-poppy-50 transition duration-300 ease-in-out w-full px-4`}
              onClick={() => setActiveCategorySidebar(item.id.toLowerCase())}
            >
              <item.icon
                className={`${
                  activeCategorySidebar === item.id.toLowerCase()
                    ? "text-poppy-500"
                    : "text-cgrey"
                } w-6 h-6`}
              />
              <p
                className={`${
                  activeCategorySidebar === item.id.toLowerCase()
                    ? "text-poppy-500"
                    : "text-cgrey"
                }
                font-semibold text-base transition duration-300 ease-in-out hidden md:block w-max`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuProfileSection;
