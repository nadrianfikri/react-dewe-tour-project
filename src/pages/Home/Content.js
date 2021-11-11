import { Card1, Card2 } from '../../components/Card';
import serveContent from '../../assets/serveContent.json';

import { useState, useEffect } from 'react';
import { API } from '../../config/api';

function Content() {
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
    <div id="content" className="flex flex-col justify-center items-center pb-10">
      <div id="service" className="flex flex-wrap justify-center  transform -translate-y-8  px-4">
        {serveContent.map((data, index) => (
          <Card1 key={index} id={data.id} title={data.title} body={data.description} img={data.icon} />
        ))}
      </div>

      <div id="group-tour">
        <div className="text-5xl text-center my-10 mb-20">
          <h1>Group Tour</h1>
        </div>
        <div className="group-content container flex justify-center items-center flex-wrap">
          {trips.map((data, index) => (
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
