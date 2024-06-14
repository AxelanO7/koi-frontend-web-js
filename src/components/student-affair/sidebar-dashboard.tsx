import { activeSidebarHomepageStudentAffair } from "@/core/store";
import {
  AcademicCapIcon,
  ArrowLeftEndOnRectangleIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

const SidebarDashboardSection = () => {
  const SidebarItem = [
    {
      id: "event_organization",
      text: "Event Ormawa",
      icon: CalendarDaysIcon,
    },
    {
      id: "my_event",
      text: "Event Saya",
      icon: AcademicCapIcon,
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

  const [activeCategorySidebar, setActiveCategorySidebar] = useRecoilState(
    activeSidebarHomepageStudentAffair
  );

  return (
    <div className="space-y-4 pl-4 mt-4">
      {SidebarItem.map((item, index) => (
        <div
          key={index}
          className={`${
            activeCategorySidebar === item.id.toLowerCase()
              ? "bg-poppy-50"
              : null
          } flex space-x-4 items-center py-2 rounded-lg cursor-pointer hover:bg-poppy-50 transition duration-300 ease-in-out w-full px-4`}
          onClick={() => {
            if (item.id === "logout") {
              localStorage.clear();
              window.location.href = "/login";
            }
            setActiveCategorySidebar(item.id.toLowerCase());
          }}
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
