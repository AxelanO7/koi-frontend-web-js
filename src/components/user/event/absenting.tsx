import clsx from "clsx";

const AbsentingEvent = () => {
  const selectedFile = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <div className={clsx("max-w-lg flex flex-col mx-auto")}>
      <p className={clsx("font-semibold text-xl")}>Absensi Kehadiran</p>
      <div className={clsx("space-y-1 w-full mt-8")}>
        <p className={clsx("font-medium text-sm")}>Nama</p>
        <input
          className={clsx(
            "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
          )}
          placeholder="Ketikkan nama lengkapmu"
        />
      </div>
      <div className="h-4" />
      <div className={clsx("space-y-1 w-full")}>
        <p className={clsx("font-medium text-sm")}>No Telepon</p>
        <input
          className={clsx(
            "border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
          )}
          placeholder="Ketikkan no teleponmu"
        />
      </div>
      <div className="h-4" />
      <div className={clsx("space-y-1 w-full")}>
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
      <div className="flex space-x-4 font-medium text-sm w-full">
        <button
          className={clsx(
            "rounded-md px-12 py-1 border border-gray-300 flex-grow"
          )}
        >
          Batalkan
        </button>
        <button
          className={clsx(
            "rounded-md px-12 py-1 bg-poppy-500 text-white flex-grow"
          )}
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default AbsentingEvent;
