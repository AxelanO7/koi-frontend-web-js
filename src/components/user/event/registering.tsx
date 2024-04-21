import clsx from "clsx";
import ShortDescriptionEvent from "./short-description-event";

const RegisteringEvent = () => {
  const selectedFile = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <>
      <div className={clsx("px-28")}>
        <p className={clsx("font-semibold text-xl")}>Pendaftaran Event</p>
        <div className={clsx("flex mt-4 space-x-16")}>
          <ShortDescriptionEvent />
          <div className={clsx("w-full")}>
            <div className={clsx("flex w-full")}>
              <div className={clsx("flex-grow space-y-1")}>
                <p className={clsx("font-medium text-sm")}>Nama</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Ketikkan nama lengkapmu"
                />
              </div>
              <div className="w-12" />
              <div className={clsx("flex-grow space-y-1")}>
                <p className={clsx("font-medium text-sm")}>No Telepon</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Ketikkan no teleponmu"
                />
              </div>
            </div>
            <div className="h-4" />
            <div className={clsx("flex w-full")}>
              <div className={clsx("flex-grow space-y-1")}>
                <p className={clsx("font-medium text-sm")}>Email</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Ketikkan emailmu"
                />
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Tuliskan penjelasan disini
                </p>
              </div>
              <div className="w-12" />
              <div className={clsx("flex-grow space-y-1")}>
                <p className={clsx("font-medium text-sm")}>Institusi</p>
                <input
                  className={clsx(
                    "border bordery-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Masukkan asal sekolah, kampus, komunitas"
                />
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Ketik umum jika kamu bukan mahaasiswa
                </p>
              </div>
            </div>
            <div className="h-4" />
            <div className={clsx("flex w-full")}>
              <div className={clsx("w-full space-y-1")}>
                <p className={clsx("font-medium text-sm")}>NIM</p>
                <input
                  className={clsx(
                    "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                  )}
                  placeholder="Masukkan NIM kamu"
                />
                <p className={clsx("text-xs text-gray-400 font-medium")}>
                  Masukan NIM jika mahasiswa INSTIKI, selain itu tulis 1234
                </p>
              </div>
              <div className="w-24" />
              <div className={clsx("w-full space-y-1")}>
                <p className={clsx("font-medium text-sm")}>Metode Pembayaran</p>
                <div className="flex space-x-2">
                  <button
                    className={clsx(
                      "border rounded-xl px-3 py-1 font-normal text-sm border-gray-300"
                    )}
                  >
                    COD
                  </button>
                  <button
                    className={clsx(
                      "border rounded-xl px-3 py-1 font-normal text-sm border-gray-300"
                    )}
                  >
                    Transfer Bank
                  </button>
                  <button
                    className={clsx(
                      "border rounded-xl px-3 py-1 font-normal text-sm border-gray-300"
                    )}
                  >
                    Transfer E-Wallet
                  </button>
                </div>
              </div>
            </div>
            <div className="h-4" />
            <div className="space-y-2">
              <p className={clsx("font-medium text-sm")}>Bukti Pembayaran</p>
              <div
                className={clsx(
                  "flex items-center justify-center w-96 h-40 border border-gray-300 rounded-md relative bg-gray-100 cursor-pointer"
                )}
              >
                <input type="file" onChange={selectedFile} />
              </div>
              <p className={clsx("text-xs text-gray-400 font-medium")}>
                Bukti pembayaran digunakan untuk verifikasi identitas pendaftar
              </p>
            </div>
            <div className="h-4" />
            <div className="flex space-x-4 font-medium text-sm">
              <button
                className={clsx("rounded-md px-12 py-1 border border-gray-300")}
              >
                Batalkan
              </button>
              <button
                className={clsx(
                  "rounded-md px-12 py-1 bg-poppy-500 text-white"
                )}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisteringEvent;
