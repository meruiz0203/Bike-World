import logo from '../assets/img/logo.png';
import Sidebar from "./Sidebar";

export default function Menu() {
  return (
    <header className="menu-wrap">
      <figure className="user">
        <div>
          <img src={logo} alt="Logo Bike World	" />
        </div>
      </figure>
      <Sidebar />
    </header>
  );
}