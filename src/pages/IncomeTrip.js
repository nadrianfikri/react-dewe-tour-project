import { Link } from 'react-router-dom';
import { Card2 } from '../components/Card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useState, useEffect } from 'react';
import { API } from '../config/api';

function IncomeTrip() {
  // init var for store data
  const [trips, setTrips] = useState([]);

  // create func get product from api
  const getTrips = async () => {
    try {
      const response = await API.get('/trip');
      setTrips(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // call function with useEffect
  useEffect(() => {
    getTrips();
  }, []);
  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />

      <main className="md:container mx-auto overflow-auto pb-36 ">
        <div className="flex justify-between px-6 pb-10">
          <h1 className="text-4xl font-bold">Income Trip</h1>
          <div className="flex gap-4">
            <button type="button" className="bg-yellow-400 hover:bg-yellow-500 py-2 px-4 text-white font-bold rounded-md">
              Add Country
            </button>
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
      <Footer />
    </div>
  );
}

export default IncomeTrip;
