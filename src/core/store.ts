import { atom } from "recoil";

export const isLogged = atom({
  key: "isLogged",
  default: true,
});

// student
export const activeSidebarHomepageStudent = atom({
  key: "activeSidebarHomepage",
  default: "all",
});
export const activeSidebarProfileStudent = atom({
  key: "activeSidebarProfileStudent",
  default: "my_profile",
});

// orgnization
export const activeSidebarHomepageOrganization = atom({
  key: "activeSidebarOrganization",
  default: "my_event",
});
export const activeMyAccountOrganization = atom({
  key: "activeMyAccountOrganization",
  default: "my_profile",
});

// student affair
export const activeSidebarHomepageStudentAffair = atom({
  key: "activeSidebarStudentAffair",
  default: "event_organization",
});
export const activeMyAccountStudentAffair = atom({
  key: "activeMyAccountStudentAffair",
  default: "my_profile",
});
