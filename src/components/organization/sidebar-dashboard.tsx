import {
  ArrowLeftEndOnRectangleIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const SidebarDashboardSection = () => {
  const SidebarItem = [
    {
      id: "my_event",
      text: "Event Saya",
      icon: CalendarDaysIcon,
    },
    {
      id: "participant_event",
      text: "Peserta Event",
      icon: UsersIcon,
    },
    {
      id: "absent_participant",
      text: "Absensi Peserta",
      icon: PencilSquareIcon,
    },
    {
      id: "my_account",
      text: "Akun Saya",
      icon: UserIcon,
    },
    {
      id: "logout",
      text: "Logout",
      icon: ArrowLeftEndOnRectangleIcon,
    },
  ];

  const [activeCategorySidebar, setActiveCategorySidebar] =
    useState("my_event");
  return (
    <div className="space-y-4">
      {SidebarItem.map((item, index) => (
        <div
          key={index}
          className={`${
            activeCategorySidebar === item.id.toLowerCase()
              ? "bg-poppy-50"
              : null
          } flex space-x-4 items-center py-2 rounded-lg cursor-pointer hover:bg-poppy-50 transition duration-300 ease-in-out w-full`}
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
  );
};

export default SidebarDashboardSection;
