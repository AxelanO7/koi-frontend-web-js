import { getBaseUrlLocalUpload } from "@/helpers/api";
// import { Button } from "@/shadcn/components/ui/button";
// import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import Swal from "sweetalert2";

const EditPhotoSection = () => {
  const [fileState, setFileState] = useState<File>();

  const uploadFile = (file: File) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file!);
    axios
      .post(`${getBaseUrlLocalUpload()}/local/upload/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success",
          text: "Upload file success",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Upload file failed",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileState(files[0]);
      uploadFile(files[0]);
    }
  };

  return (
    <>
      <div className="flex space-x-4">
        <img
          src="https://via.placeholder.com/150"
          className={clsx("rounded-full", "w-28", "h-28")}
        />
        <div className={clsx("space-y-2")}>
          <input
            type="file"
            className={clsx(
              "bg-poppy-500 border border-gray-300 rounded-md p-2"
            )}
            onChange={handleFileChange}
          />
          {/* <Button
            className={clsx("bg-poppy-500 text-white border border-gray-300")}
          >
            Upload Foto
            <ArrowUpTrayIcon className={clsx("w-5 h-5 ml-2")} />
          </Button> */}
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
