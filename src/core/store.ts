import { atom } from "recoil";

export const isLogged = atom({
  key: "isLogged",
  default: false,
});

export const activeCategory = atom({
  key: "activeCategory",
  default: "all",
});
