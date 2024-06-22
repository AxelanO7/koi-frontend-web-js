import Swal from "sweetalert2";

const RegisterSection = ({ its_open }: { its_open: boolean }) => {
  const handleRegister = () => {
    if (!its_open) {
      Swal.fire({
        icon: "error",
        title: "Pendaftaran Ditutup",
        text: "Pendaftaran event ini sudah ditutup",
      });
      return;
    }
    const id = window.location.pathname.split("/")[2];
    window.location.href = `/event/register/${id}`;
  };

  // todo: handle
  const handleShare = () => {
    console.log("Share");
  };

  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4 w-[480px] h-min">
        <p className="font-semibold text-2xl">Pendaftaran Event</p>
        <div className="bg-gray-200 h-0.5 w-full my-2" />
        <div className="flex justify-between items-center">
          <p className="font-medium text-base text-gray-600">Harga</p>
          <p className="font-bold text-xl text-poppy-500">Rp 240.000</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium text-base text-gray-600">
            Status Pendaftaran
          </p>
          <button className="bg-success rounded-2xl text-white font-semibold px-4 py-1">
            Buka
          </button>
        </div>
        <button
          className="bg-poppy-500 text-white font-semibold rounded-lg w-full py-2 mt-4"
          onClick={handleRegister}
        >
          Daftar Sekarang
        </button>
        <button
          className="bg-white font-semibold rounded-lg w-full py-2 mt-4 border border-gray-300"
          onClick={handleShare}
        >
          Bagikan Event
        </button>
      </div>
    </>
  );
};

export default RegisterSection;
