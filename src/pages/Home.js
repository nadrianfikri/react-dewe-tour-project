import Hero from './Home/Hero';
import Content from './Home/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Search from '../components/Search';
import NoData from '../components/NoData';
import { Card2 } from '../components/Card';

import { useState, useEffect } from 'react';
import { API } from '../config/api';
function Home() {
  // init var for store data
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState('');

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

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  // search fitur
  const filteredTrip = trips.filter((trip) => {
    return trip.title.toLowerCase().includes(search) || trip.country.name.toLowerCase().includes(search) || trip.transportation.toLowerCase().includes(search);
  });

  return (
    <div className="bg-gray-100">
      <Navbar class="navbar" />
      <Hero>
        <Search onChange={handleChange} />
      </Hero>
      <Content>
        {filteredTrip.length > 0 ? (
          <>
            {filteredTrip.map((data, index) => (
              <Card2
                key={index}
                //
                id={data?.id}
                title={data?.title}
                img={data?.images[0]}
                quotaFill={data?.quotaFilled}
                quota={data?.quota}
                price={data?.price}
                country={data.country?.name}
                hidden={data?.quotaFilled === 0 ? 'hidden' : 'block'}
              />
            ))}
          </>
        ) : (
          <NoData desc="Search result is no data" />
        )}
      </Content>
      <Footer />
    </div>
  );
}

export default Home;
