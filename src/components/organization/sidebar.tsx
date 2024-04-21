import {
  AcademicCapIcon,
  BriefcaseIcon,
  PaperAirplaneIcon,
  RocketLaunchIcon,
  Squares2X2Icon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";

const SidebarSection = () => {
  const SidebarItem = [
    {
      id: "all",
      text: "Semua Event",
      icon: Squares2X2Icon,
    },
    {
      id: "seminar",
      text: "Seminar",
      icon: AcademicCapIcon,
    },
    {
      id: "contest",
      text: "Lomba",
      icon: TrophyIcon,
    },
    {
      id: "entertainment",
      text: "Hiburan",
      icon: PaperAirplaneIcon,
    },
    {
      id: "workshop",
      text: "Workshop",
      icon: BriefcaseIcon,
    },
    {
      id: "social_activities",
      text: "Kegiatan Sosial",
      icon: RocketLaunchIcon,
    },
  ];

  const [activeCategorySidebar, setActiveCategorySidebar] = useState("all");

  return (
    <>
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
    </>
  );
};

export default SidebarSection;
