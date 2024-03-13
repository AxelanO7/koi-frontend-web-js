import logo from "../../assets/logo.png";

const ForgotPassword = () => {
  return (
    <>
      <div className="bg-gray-50 w-screen min-h-screen overflow-hidden">
        <div className="p-6 border-b border-gray-200 shadow-sm">
          <img src={logo} alt="logo" className="w-12" />
        </div>
        <form className="bg-white border border-gray-200 shadow-md w-96 p-8 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-2xl font-bold text-center mb-4">
            Lupa Kata Sandi
          </h1>
          <p className="text-center mb-8 text-[#6D6D6D] text-sm">
            Masukkan email Anda untuk mendapatkan tautan reset kata sandi
          </p>
          <div className="space-y-2 mb-8">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              className="w-full border border-gray-200 p-2 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Masukkan email"
            />
          </div>
          <button className="w-full bg-[#E35050] text-white p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#E53030] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E53030] focus:ring-opacity-50 transform active:scale-95">
            Kirim dan Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
