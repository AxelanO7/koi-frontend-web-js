import logo from "../../assets/logo.png";
import email from "../../assets/email.png";

const CheckEmail = () => {
  const emailSended = "sintakumara@gmail.com";
  return (
    <>
      <div className="bg-gray-50 w-screen min-h-screen overflow-hidden">
        <div className="p-6 border-b border-gray-200 shadow-sm">
          <img src={logo} alt="logo" className="w-12" />
        </div>
        <form className="bg-white border border-gray-200 shadow-md w-96 p-8 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <img src={email} alt="email" className="w-32 mb-8 mx-auto" />
          <h1 className="text-3xl font-bold mb-4">Cek Email Kamu</h1>
          <p className="mb-4 text-[#6D6D6D] text-sm">
            Kami telah mengirimkan tautan reset kata sandi ke email Anda
          </p>
          <p
            className="text-[#E35050] font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:text-[#E53030]"
            onClick={() => alert("Tautan reset kata sandi telah dikirim")}
          >
            {emailSended}
          </p>
        </form>
      </div>
    </>
  );
};

export default CheckEmail;
