import BaseLayout from "@/layouts/base";
import { Button } from "@/shadcn/components/ui/button";
import clsx from "clsx";

const DetailAbsent = () => {
  enum listStatusParticipant {
    registered = "Terdaftar",
    rejected = "Ditolak",
    reviewed = "Ditinjau",
  }
  const statusParticipant: listStatusParticipant =
    listStatusParticipant.rejected;

  return (
    <>
      <BaseLayout>
        <div className={clsx("max-w-4xl mx-auto")}>
          <p className={clsx("text-2xl font-semibold")}>Detail Peserta</p>
          <p className={clsx("text-base text-gray-500 mt-2 font-medium")}>
            Tinjau dan validasi presensi peserta event kamu
          </p>
          <div
            className={clsx("bg-white p-8 rounded-xl shadow-md border mt-8")}
          >
            <p className={clsx("font-semibold text-xl")}>Informasi Peserta</p>
            <div className={clsx("flex mt-4 space-x-16")}>
              <div className={clsx("w-full")}>
                <div className="h-4" />
                <div className={clsx("flex space-x-12")}>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Id Pendaftaran</p>
                    <p className={clsx("font-medium")}>123456</p>
                  </div>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Status Absensi</p>
                    <button
                      className={clsx(
                        "rounded-2xl text-white px-3 py-1 text-sm font-normal",
                        statusParticipant === listStatusParticipant.rejected
                          ? "bg-danger"
                          : statusParticipant === listStatusParticipant.reviewed
                          ? "bg-blue-500"
                          : statusParticipant ===
                            listStatusParticipant.registered
                          ? "bg-success"
                          : "bg-danger"
                      )}
                    >
                      Ditinjau
                    </button>
                  </div>
                  <div className={clsx("text-sm space-y-6")}>
                    <p className={clsx("font-semibold")}>Waktu Absensi</p>
                    <p className={clsx("font-medium")}>
                      10 Desember 2023 (09.00)
                    </p>
                  </div>
                </div>
                <div className={clsx("h-0.5 bg-gray-300 w-full mt-8 mb-4")} />
                <div className={clsx("space-y-4")}>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Nama</p>
                    <p className={clsx("text-lg ")}>Agus</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>
                      No Telepon
                    </p>
                    <p className={clsx("text-lg ")}>081123456789</p>
                  </div>
                  <div className="flex justify-between font-medium items-center">
                    <p className={clsx("text-base text-gray-400")}>Institusi</p>
                    <p className={clsx("text-lg ")}>INSTIKI</p>
                  </div>
                </div>
                <div className={clsx("h-0.5 bg-gray-300 w-full my-4")} />
                <p className={clsx("font-medium text-lg")}>Bukti Pembayaran</p>
                <div
                  className={clsx(
                    "w-full flex flex-col justify-center items-center space-y-2 border border-gray-300 p-8 rounded-xl mt-4"
                  )}
                >
                  <img src="https://via.placeholder.com/150" />
                  <p className={clsx("text-lg font-medium")}>
                    bukti_transfer.png
                  </p>
                </div>
                <div>
                  <p className={clsx("font-medium text-lg mt-4")}>
                    Alasan Penolakan
                  </p>
                  <p
                    className={clsx("font-normal text-base mt-2 text-gray-700")}
                  >
                    KOI atau Kegiatan Ormawa INSTIKI adalah sistem informasi
                    yang digunakan untuk melakukan menajemen data kegiatan
                    organisasi kemahasiswaan berbasis website
                  </p>
                </div>
                <div className={clsx("h-0.5 bg-gray-300 w-full my-4")} />
                <div className="flex space-x-4">
                  {statusParticipant !== listStatusParticipant.rejected && (
                    <Button
                      variant={"outline"}
                      className={clsx("rounded-lg px-4 py-2 font-medium")}
                    >
                      Tolak Presensi
                    </Button>
                  )}
                  {statusParticipant !== listStatusParticipant.registered && (
                    <Button
                      variant={"destructive"}
                      className={clsx(
                        "bg-danger text-white rounded-lg px-4 py-2 font-medium"
                      )}
                    >
                      Setujui Presensi
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default DetailAbsent;
