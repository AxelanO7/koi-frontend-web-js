const Ownership = () => {
  return (
    <>
      <div className="space-y-2">
        <img
          src="https://via.placeholder.com/340"
          className="object-cover w-full"
        />
        <p className="font-semibold text-base">Penyelenggara</p>
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/50" />
          <div>
            <p className="font-semibold text-base cursor-pointer">
              HIMA-TI INSTIKI
            </p>
            <p className="font-medium text-sm text-gray-400 cursor-pointer">
              Organisasi Kemahasiswaan
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ownership;
