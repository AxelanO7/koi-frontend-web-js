import { Button } from "@/shadcn/components/ui/button";
import { EnvelopeIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

interface Props {
  setActive: () => void;
}

const DetailProfileSection = ({ setActive }: Props) => {
  return (
    <>
      <div className={clsx("bg-white rounded-lg p-4 h-min border")}>
        <p className={clsx("font-semibold text-xl")}>Profil Saya</p>
        <img
          src="https://via.placeholder.com/1400x500"
          alt="profile"
          className={clsx("rounded-lg mt-2")}
        />
        <div className="flex mt-4 space-x-8">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className={clsx("w-24 h-24 rounded-full")}
          />
          <div>
            <p className={clsx("font-semibold text-lg")}>Ormawa</p>
            <div className="flex mt-2 items-center space-x-2">
              <EnvelopeIcon className={clsx("w-6 h-6")} />
              <p className={clsx("font-normal text-sm")}>email123@gmail.com</p>
            </div>
            <p className={clsx("font-semibold text-base mt-4")}>
              Deskripsi Ormawa
            </p>
            <p className={clsx("font-normal text-sm mt-2 text-gray-600")}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              ipsum optio laboriosam reprehenderit saepe autem libero sint aut
              similique placeat. Dolores, magni unde voluptates rem error
              dolorem facilis odit? Molestias.
            </p>
          </div>
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
