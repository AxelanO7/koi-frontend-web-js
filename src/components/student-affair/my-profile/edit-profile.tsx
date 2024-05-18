import { Button } from "@/shadcn/components/ui/button";
import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

const EditProfileSection = () => {
  return (
    <>
      <div className={clsx("bg-white rounded-lg p-8 border")}>
        <p className={clsx("font-semibold text-xl")}>Edit Profil</p>
        <div className="flex mt-8 space-x-8">
          <div className={clsx("w-full")}>
            <label className={clsx("font-semibold text-sm")}>Nama Ormawa</label>
            <input
              type="text"
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Nama Ormawa"
            />
            <div className="h-4" />
            <label className={clsx("font-semibold text-sm")}>Email</label>
            <input
              type="email"
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2"
              )}
              placeholder="Email"
            />
            <div className="h-4" />
            <label className={clsx("font-semibold text-sm")}>
              Deskripsi Ormawa
            </label>
            <textarea
              className={clsx(
                "border border-gray-300 rounded-lg w-full p-2 mt-2 h-60"
              )}
              placeholder="Deskripsi Ormawa"
            />
          </div>
          <div className={clsx("w-full")}>
            <div className="flex space-x-4">
              <img src="https://via.placeholder.com/150" />
              <div>
                <Button className={clsx("bg-poppy-500 text-white")}>
                  Upload Foto
                  <ArrowUpOnSquareIcon className={clsx("h-5 w-5 ml-2")} />
                </Button>
                <p className={clsx("text-sm text-gray-500 mt-2")}>
                  Ukuran file: maksimum 10 Megabytes (MB). Ekstensi file yang
                  diperbolehkan: .JPG .JPEG .PNG
                </p>
              </div>
            </div>
            <p className={clsx("text-base text-gray-500 mt-4 font-semibold")}>
              Sampul Profil
            </p>
            <img
              src="https://via.placeholder.com/500x200"
              className={clsx("mt-2")}
            />
            <p className={clsx("text-xs text-gray-500 mt-2 font-normal")}>
              Rekomendasi ukuran sampul 17 x 3 pixel. Ukuran file: maksimum 10
              Megabytes (MB). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button variant={"outline"}>Batalkan</Button>
          <Button
            variant={"destructive"}
            className={clsx("bg-poppy-500 text-white")}
          >
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfileSection;
