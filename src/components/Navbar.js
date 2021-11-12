//try tailwindUI
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState, useContext } from 'react';

import logo from '../assets/images/logo-dewe.png';
// import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import Regist from '../pages/Auth/Regist';
import Dropdown, { DropdownItem } from './Dropdown';
import { AuthContext } from '../context/authContext';

function Navbar(props) {
  let history = useHistory();
  const [state, dispatch] = useContext(AuthContext);

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
    if (document.querySelector('#navbar')?.classList?.contains('navbar')) {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('#navbar')?.classList?.add('bg-navbar');
      } else {
        document.querySelector('#navbar')?.classList?.remove('bg-navbar');
      }
    } else {
      document.querySelector('#navbar')?.classList?.add('bg-navbar');
    }
  }

  return (
    <>
      <nav id="navbar" className={`${props.class} flex top-0 fixed w-full ${props.bg} justify-center bg-no-repeat bg-auto bg-center text-white z-50 `}>
        <ul className="container px-8 flex justify-between">
          <li>
            <Link to="/" className="block px-4 py-2 rounded-md">
              <img className="w-40" src={logo} alt="logo" />
            </Link>
          </li>
          {/* menu dropdown */}
          <div className="flex items-center space-x-4 px-4 pt-2">
            {state.isLogin ? (
              <Menu as="div" className="relative inline-block text-left ">
                <div className="">
                  <Menu.Button className="">
                    <img className="w-50 h-50 object-cover rounded-full border-2 border-yellow-400" src={state?.user?.avatar} alt="avatar" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56  origin-top-right bg-white divide-y  rounded-md shadow-lg text-gray-700">
                    <>
                      <span className="absolute -top-2 right-2 bg-white w-8 h-8 transform rotate-45"></span>
                      {state.user.role === 'admin' ? (
                        <>
                          <Menu.Item>
                            <div className="relative flex py-4 pl-9 gap-3 items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                              <img src="/assets/icons/journey 1.svg" alt="" />
                              <Link to="/income-trip" className="text-lg font-bold ">
                                Trip
                              </Link>
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            <div className="relative flex py-4 pl-9 gap-3  items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                              <img src="/assets/icons/bill.svg" alt="" />
                              <Link to="/list-transaction" className="text-lg font-bold">
                                Transaction
                              </Link>
                            </div>
                          </Menu.Item>
                        </>
                      ) : (
                        <>
                          <Menu.Item>
                            <div className="relative flex py-4 pl-9 gap-3  items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                              <img src="/assets/icons/user.svg" alt="" />
                              <Link to="/profile" className="text-lg font-bold">
                                Profile
                              </Link>
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            <div className="relative flex py-4 pl-9 gap-3  items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                              <img src="/assets/icons/bill.svg" alt="" />
                              <Link to="/payment" className="text-lg font-bold">
                                Pay
                              </Link>
                            </div>
                          </Menu.Item>
                        </>
                      )}
                    </>
                    <>
                      <Menu.Item>
                        <div className="relative flex py-4 pl-9 gap-3 items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                          <img src="/assets/icons/logout.svg" alt="" />
                          <button onClick={handleLogout} type="button" className="text-lg font-bold">
                            Logout
                          </button>
                        </div>
                      </Menu.Item>
                    </>
                  </Menu.Items>
                </Transition>
              </Menu>
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

          {/* 
          <div className="flex items-center space-x-4 px-4">
            {state.isLogin ? (
              <li className="relative pr-6 mt-2 ">
                <button onClick={showDropdown}>
                  <img className="w-50 h-50 object-cover rounded-full border-2 border-yellow-400" src={state?.user?.avatar} alt="avatar" />
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
          </div> */}
        </ul>
      </nav>
      <Login />
      <Regist />
    </>
  );
}

export default Navbar;
