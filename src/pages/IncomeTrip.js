import { Link } from 'react-router-dom';
import { Card2 } from '../components/Card';
import { Modal, Overlay } from '../components/Modal';
import Alert from '../components/Alert';
import SkeletonHome from '../components/SkeletonHome';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { CheckCircleIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';

import { useState, useEffect } from 'react';
import { API } from '../config/api';

function IncomeTrip() {
  const title = 'Admin Income Trip';
  document.title = 'Dewe Tour | ' + title;

  // init var for store data
  const [trips, setTrips] = useState([]);
  const [country, setCountry] = useState([]);
  const [oneCountry, setOneCountry] = useState(null);
  const [message, setMessage] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
  });

  // create func get product from api
  const getData = async () => {
    try {
      const dataTrips = await API.get('/trip');
      const dataCountry = await API.get('/country');
      setTrips(dataTrips.data.data);
      setCountry(dataCountry.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // call function with useEffect
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const addCountry = async () => {
    try {
      if (form.name === '') {
        const alert = <Alert variant="red" message="Please type country name" />;
        setMessage(alert);

        setTimeout(() => {
          setMessage(null);
        }, 1500);

        return;
      }

      // create config content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // convert formdata to string
      const body = JSON.stringify(form);
      // insert data to database
      await API.post('/country', body, config);

      setShowInput(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // get a country data when show modal
  const showModal = (e) => {
    const id = Number(e.target.id);
    const dataCountry = country.find((item) => item.id === id);

    setOneCountry(dataCountry);
    setForm({
      name: dataCountry.name,
    });
    setIsOpen(true);
  };
  //
  const handleDelete = async () => {
    const id = Number(oneCountry?.id);

    // insert data to database
    await API.delete(`/country/${id}`);
    setIsOpen(false);
    getData();
  };
  const handleUpdate = async () => {
    // create config content-type
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const id = Number(oneCountry?.id);

    // convert formdata to string
    const body = JSON.stringify(form);
    // insert data to database
    await API.patch(`/country/${id}`, body, config);
    setIsOpen(false);
    getData();
  };

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      {trips.length < 0 ? (
        <SkeletonHome />
      ) : (
        <main className="md:container mx-auto overflow-auto pb-36 ">
          {message && message}
          <div className="flex justify-between px-6 pb-10">
            <h1 className="text-4xl font-bold">Exist Country</h1>
            <div className="flex gap-4 justify-end items-center flex-wrap">
              <div className={`${showInput ? 'flex' : 'hidden'} items-center gap-2`}>
                <button onClick={addCountry} type="button">
                  <CheckCircleIcon className="w-9 text-gray-500 hover:text-green-400 transition-all duration-200" />
                </button>
                <input onChange={handleChange} type="text" name="name" placeholder="Country name..." className="w-40 sm:w-auto bg-gray-200 border border-gray-400 rounded-lg px-2 py-2 h-10 focus:outline-none text-gray-500" />
              </div>
              <button onClick={() => setShowInput(!showInput)} type="button" className="bg-yellow-400 hover:bg-yellow-500 py-2 px-6 text-white font-bold rounded-md">
                Add Country
              </button>
            </div>
          </div>
          <p className="container text-sm mb-4 text-gray-500"> Click the country to edit or delete data</p>
          <div className="group-content container flex flex-wrap gap-4 mb-16">
            {country.map((data) => (
              <button id={data.id} onClick={showModal} type="button" className="bg-green-200 py-2 px-4 rounded-lg hover:bg-green-300 transition-all duration-200 text-lg text-green-700">
                {data.name}
              </button>
            ))}
          </div>

          {/* ModaL */}
          <Transition show={isOpen}>
            <Overlay>
              <Transition.Child
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-0"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-0"
              >
                <Modal width="w-96">
                  <div className="flex justify-between mb-4">
                    <header className="text-gray-500">Edit or delete a country data</header>
                    <button onClick={() => setIsOpen(false)} type="button" className="absolute top-2 right-3  w-7 h-7 text-gray-500 text-4xl rounded-full hover:text-red-500 transform rotate-45 flex justify-center items-center">
                      +
                    </button>
                  </div>
                  <div className="">
                    <input onChange={handleChange} type="text" name="name" value={form.name} placeholder="Country name..." className="w-full bg-gray-200 border border-gray-400 rounded-lg px-2 py-2 h-10 focus:outline-none text-gray-500" />
                    <div className="mt-4 flex gap-4 justify-center">
                      <button onClick={handleDelete} type="button" className="px-12 py-2  bg-red-400 text-white text-center font-bold rounded-lg hover:bg-red-500 ">
                        Delete
                      </button>
                      <button onClick={handleUpdate} type="button" className="px-12 py-2  bg-yellow-400 text-white text-center font-bold rounded-lg hover:bg-yellow-500 ">
                        Update
                      </button>
                      {message && message}
                    </div>
                  </div>
                </Modal>
              </Transition.Child>
            </Overlay>
          </Transition>
          <div className="flex justify-between px-6 pb-10">
            <h1 className="text-4xl font-bold">Income Trip</h1>
            <div className="flex gap-4">
              <Link to="add-trip" className="bg-yellow-400 hover:bg-yellow-500 py-2 px-10 text-white font-bold rounded-md">
                Add Trip
              </Link>
            </div>
          </div>
          <div className="group-content flex justify-center items-center flex-wrap">
            {trips.map((data) => (
              <Card2
                //
                id={data?.id}
                title={data?.title}
                img={data?.images[0]}
                quotaFill={data?.quotaFilled}
                quota={data?.quota}
                price={data?.price}
                country={data.country?.name}
              />
            ))}
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default IncomeTrip;
