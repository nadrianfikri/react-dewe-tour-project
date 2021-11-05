import logo from '../assets/images/logo-dewe.png';
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import Regist from '../pages/Auth/Regist';
import Dropdown, { DropdownItem } from './Dropdown';
import { AuthContext } from '../context/authContext';

function Navbar(props) {
  let history = useHistory();
  const [state, dispatch] = useContext(AuthContext);
  // let isAdmin = false;
  // if (state.user.status === 1) {
  //   isAdmin = true;
  // }

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });

    history.push('/');
  };

  const handleLoginModal = () => {
    document.querySelector('#modalLogin').classList.toggle('hidden');
  };
  const handleRegistModal = () => {
    document.querySelector('#modalRegist').classList.toggle('hidden');
  };
  const showDropdown = () => {
    document.querySelector('#dropdown').classList.toggle('hidden');
  };

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
    <>
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
            {state.isLogin ? (
              <li className="relative pr-6 mt-2">
                <button onClick={showDropdown}>
                  <img className="w-50 h-50 object-cover rounded-full border-2 border-yellow-400" src="/assets/images/photo.png" alt="avatar" />
                </button>
                <Dropdown click={handleLogout}>
                  {state.user.role === 'admin' ? (
                    <>
                      <DropdownItem>
                        <img src="/assets/icons/journey 1.svg" alt="" />
                        <Link to="/income-trip" className="text-lg font-bold">
                          Trip
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <img src="/assets/icons/bill.svg" alt="" />
                        <Link to="/list-transaction" className="text-lg font-bold">
                          Transaction
                        </Link>
                      </DropdownItem>
                    </>
                  ) : (
                    <>
                      <DropdownItem>
                        <img src="/assets/icons/user.svg" alt="" />
                        <Link to="/profile" className="text-lg font-bold">
                          Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <img src="/assets/icons/bill.svg" alt="" />
                        <Link to="/payment" className="text-lg font-bold">
                          Pay
                        </Link>
                      </DropdownItem>
                    </>
                  )}
                </Dropdown>
              </li>
            ) : (
              <>
                <li>
                  <button onClick={handleLoginModal} className="block hover:bg-green-800 px-8 py-1 rounded-md border transition duration-400 ease-out">
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={handleRegistModal} className="block  px-6 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 transition duration-400 ease-out">
                    Register
                  </button>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
      <Login />
      <Regist />
    </>
  );
}

export default Navbar;
