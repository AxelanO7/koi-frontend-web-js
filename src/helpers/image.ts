import { getImageUploadProps } from "@/types/event";

export const getImageUpload = ({ type, fileName }: getImageUploadProps) => {
  if (fileName) {
    const res = new URL(`../upload/${type}/${fileName}`, import.meta.url).href;
    return res;
  } else {
    const res = `https://via.placeholder.com/600`;
    return res;
  }
};
