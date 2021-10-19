import logo from '../assets/images/logo-dewe.png';
function Navbar() {
  return (
    <div>
      <nav className="flex justify-center bg-navbar bg-no-repeat bg-auto bg-center  text-white">
        <ul className="container flex justify-between">
          <div>
            <li>
              <a href="/" className="block px-4 py-2 rounded-md">
                <img className="w-40" src={logo} alt="logo" />
              </a>
            </li>
          </div>
          <div className="flex items-center space-x-4 px-4">
            <li>
              <a href="/" className="block px-8 py-1 rounded-md border">
                Login
              </a>
            </li>
            <li>
              <a href="/" className="block  px-6 py-1 rounded-md bg-yellow-400">
                Register
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
