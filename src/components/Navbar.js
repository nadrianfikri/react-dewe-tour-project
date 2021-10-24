import logo from '../assets/images/logo-dewe.png';
import { Link } from 'react-router-dom';

function Navbar(props) {
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (document.querySelector('#navbar').classList.contains('navbar')) {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('#navbar').classList.add('bg-navbar');
      } else {
        document.querySelector('#navbar').classList.remove('bg-navbar');
      }
    } else {
      document.querySelector('#navbar').classList.add('bg-navbar');
    }
  }

  return (
    <nav id="navbar" className={`${props.class} flex top-0 fixed w-full ${props.bg} justify-center bg-no-repeat bg-auto bg-center text-white z-50 `}>
      <ul className="container px-8 flex justify-between">
        <div>
          <li>
            <Link to="/" className="block px-4 py-2 rounded-md">
              <img className="w-40" src={logo} alt="logo" />
            </Link>
          </li>
        </div>
        <div className="flex items-center space-x-4 px-4">
          <li>
            <Link to="/login" className="block hover:bg-green-800 px-8 py-1 rounded-md border transition duration-400 ease-out">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="block  px-6 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 transition duration-400 ease-out">
              Register
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
