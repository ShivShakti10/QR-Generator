import logo from "../logo.png";
import "./Header.css";

export default function Header() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div>
        <h1 className="app-name">QR Code Generator</h1>
        <h6 className="app-desc">Create your free QR Code</h6>
        </div>
      </header>
    </>
  );
}
