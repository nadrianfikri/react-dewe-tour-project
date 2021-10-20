import logo from '../assets/images/logo-dewe.png';

function Navbar() {
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.querySelector('#navbar').classList.add('bg-navbar');
    } else {
      document.querySelector('#navbar').classList.remove('bg-navbar');
    }
  }
  return (
    <nav id="navbar" className="flex top-0 fixed w-full justify-center bg-transparent bg-no-repeat bg-auto bg-center text-white z-50 ">
      <ul className="container px-8 flex justify-between">
        <div>
          <li>
            <a href="/" className="block px-4 py-2 rounded-md">
              <img className="w-40" src={logo} alt="logo" />
            </a>
          </li>
        </div>
        <div className="flex items-center space-x-4 px-4">
          <li>
            <button className="block hover:bg-green-800 px-8 py-1 rounded-md border transition duration-400 ease-out">Login</button>
          </li>
          <li>
            <button className="block  px-6 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 transition duration-400 ease-out">Register</button>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
