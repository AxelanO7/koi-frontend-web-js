import { Button } from "@/shadcn/components/ui/button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const EditPhotoSection = () => {
  return (
    <>
      <div className="flex space-x-4">
        <img
          src="https://via.placeholder.com/150"
          className={clsx("rounded-full", "w-28", "h-28")}
        />
        <div className={clsx("space-y-2")}>
          <Button
            className={clsx("bg-poppy-500 text-white border border-gray-300")}
          >
            Upload Foto
            <ArrowUpTrayIcon className={clsx("w-5 h-5 ml-2")} />
          </Button>
          <p className={clsx("text-sm text-gray-400")}>
            Ukuran file: maksimum 10 Megabytes (MB). Ekstensi file yang
            diperbolehkan: .JPG .JPEG .PNG
          </p>
        </div>
      </div>
    </>
  );
};

export default EditPhotoSection;
