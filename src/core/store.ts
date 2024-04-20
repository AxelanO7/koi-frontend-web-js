import { atom } from "recoil";

export const isLogged = atom({
  key: "isLogged",
  default: true,
});

export const activeSidebarHomepage = atom({
  key: "activeSidebarHomepage",
  default: "all",
});

export const activeSidebarOrganization = atom({
  key: "activeSidebarOrganization",
  default: "all",
});
