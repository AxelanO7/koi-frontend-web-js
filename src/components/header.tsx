import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="p-6 border-b border-gray-200 shadow-sm">
      <img src={logo} alt="logo" className="w-12" />
    </div>
  );
}

export default Header;
