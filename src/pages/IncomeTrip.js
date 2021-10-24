import { Link } from 'react-router-dom';
import dataDestinations from '../assets/destination.json';
import { Card2 } from '../components/Card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function IncomeTrip() {
  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />

      <main className="md:container mx-auto overflow-auto pb-36 ">
        <div className="flex justify-between px-6 pb-10">
          <h1 className="text-4xl font-bold">Income Trip</h1>
          <Link to="add-trip" className="bg-yellow-400 hover:bg-yellow-500 py-2 px-10 text-white font-bold rounded-md">
            Add Trip
          </Link>
        </div>
        <div className="group-content flex justify-center items-center flex-wrap">
          {dataDestinations.map((data) => (
            <Card2 title={data.name} img={data.thumbnailImage} capacity={data.capacity} price={data.price} country={data.country} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default IncomeTrip;
