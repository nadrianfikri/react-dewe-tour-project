//try tailwindUI
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext, useState } from 'react';

import logo from '../assets/images/logo-dewe.png';
import { Link, useHistory } from 'react-router-dom';

import { Modal, ModalTitle, Overlay } from './Modal';
import Login from '../pages/Auth/Login';
import Regist from '../pages/Auth/Regist';
import { AuthContext } from '../context/authContext';

function Navbar(props) {
  let history = useHistory();
  const [state, dispatch] = useContext(AuthContext);
  const [openLgn, setOpenLgn] = useState(false);
  const [openRgs, setOpenRgs] = useState(false);

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });

    history.push('/');
  };

  const closeModal = () => {
    setOpenLgn(false);
    setOpenRgs(false);
  };
  const openAnotheModal = () => {
    setOpenLgn(!openLgn);
    setOpenRgs(!openRgs);
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
                  enterFrom="transform opacity-0 scale-0"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-200"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-0"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56  origin-top-right bg-white divide-y  rounded-md shadow-lg text-gray-700 ">
                    <span className="absolute -top-2 right-2 bg-white w-8 h-8 transform rotate-45"></span>
                    <>
                      {state.user.role === 'admin' ? (
                        <div className="rounded-lg">
                          <Menu.Item>
                            <Link to="/income-trip" className="relative flex py-4 pl-9 gap-3 items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                              <img src="/assets/icons/journey 1.svg" alt="" />
                              <p className="text-lg font-bold ">Trip</p>
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link to="/list-transaction" className="relative flex py-4 pl-9 gap-3  items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                              <img src="/assets/icons/bill.svg" alt="" />
                              <p className="text-lg font-bold">Transaction</p>
                            </Link>
                          </Menu.Item>
                        </div>
                      ) : (
                        <div className="rounded-lg">
                          <Menu.Item>
                            <Link to="/profile" className="relative flex py-4 pl-9 gap-3  items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                              <img src="/assets/icons/user.svg" alt="" />
                              <p className="text-lg font-bold">Profile</p>
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link to="/payment" className="relative flex py-4 pl-9 gap-3  items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                              <img src="/assets/icons/bill.svg" alt="" />
                              <p className="text-lg font-bold">Pay</p>
                            </Link>
                          </Menu.Item>
                        </div>
                      )}
                    </>
                    <>
                      <Menu.Item>
                        <button onClick={handleLogout} type="button" className="relative flex py-4 pl-9 w-full gap-3 items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                          <img src="/assets/icons/logout.svg" alt="" />
                          <p className="text-lg font-bold">Logout</p>
                        </button>
                      </Menu.Item>
                    </>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <li>
                  <button onClick={() => setOpenLgn(true)} className="block hover:bg-green-800 px-8 py-1 rounded-md border transition duration-400 ease-out">
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={() => setOpenRgs(true)} className="block  px-6 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 transition duration-400 ease-out">
                    Register
                  </button>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>

      <Transition show={openLgn}>
        <Overlay>
          <Transition.Child
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 -translate-y-full"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 translate-y-full"
          >
            <Modal width="w-96">
              <ModalTitle title="Login" onClick={closeModal} />
              <Login onClick={openAnotheModal} />
            </Modal>
          </Transition.Child>
        </Overlay>
      </Transition>

      <Transition show={openRgs}>
        <Overlay>
          <Transition.Child
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 -translate-y-full"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 translate-y-full"
          >
            <Modal width="w-96">
              <ModalTitle title="Register" onClick={closeModal} />
              <Regist onClick={openAnotheModal} />
            </Modal>
          </Transition.Child>
        </Overlay>
      </Transition>
    </>
  );
}

export default Navbar;
