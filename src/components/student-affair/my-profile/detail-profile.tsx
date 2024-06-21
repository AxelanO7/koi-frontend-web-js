import { getImageUpload } from "@/helpers/image";
import { Button } from "@/shadcn/components/ui/button";
import { UserProps } from "@/types/user";
import { EnvelopeIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

interface Props {
  setActive: () => void;
  profileProps?: UserProps;
}

const DetailProfileSection = ({ setActive, profileProps }: Props) => {
  return (
    <>
      <div className={clsx("bg-white rounded-lg p-4 h-min border")}>
        <p className={clsx("font-semibold text-xl")}>Profil Saya</p>
        <img
          src={
            getImageUpload({
              type: "cover",
              fileName: profileProps?.ormawa?.cover,
            }) || "https://via.placeholder.com/150"
          }
          className={clsx("w-full h-48 rounded-lg mt-4 object-cover")}
        />
        <div className="flex mt-4 space-x-8">
          <img
            src={
              getImageUpload({
                type: "profile",
                fileName: profileProps?.ormawa?.logo,
              }) || "https://via.placeholder.com/150"
            }
            className={clsx("w-20 h-20 rounded-lg")}
          />
          <div>
            <p className={clsx("font-semibold text-lg")}>
              {profileProps?.ormawa?.nama_ormawa}
            </p>
            <div className="flex mt-2 items-center space-x-2">
              <EnvelopeIcon className={clsx("w-6 h-6")} />
              <p className={clsx("font-normal text-sm")}>
                {profileProps?.ormawa?.email || "Email Ormawa belum diatur"}
              </p>
            </div>
            <p className={clsx("font-semibold text-base mt-4")}>
              Deskripsi Ormawa
            </p>
            <p className={clsx("font-normal text-sm mt-2 text-gray-600")}>
              {profileProps?.ormawa?.deskripsi ||
                "Deskripsi Ormawa belum diatur"}
            </p>
          </div>
          <div className={clsx("flex grow")} />
          <Button
            variant={"destructive"}
            className={clsx(
              "flex items-center justify-center bg-poppy-500 text-white"
            )}
            onClick={setActive}
          >
            Edit Profil
            <PencilSquareIcon className={clsx("w-4 h-4 ml-2")} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DetailProfileSection;
