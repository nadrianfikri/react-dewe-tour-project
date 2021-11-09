import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Invoice from '../components/Invoice';
import Box from '../components/Box';

import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/authContext';
import { API } from '../config/api';

function Profile() {
  const history = useHistory();
  const [state] = useContext(AuthContext);
  const [trans, setTrans] = useState(null);

  // create func getData transaction
  const getData = async () => {
    try {
      const response = await API.get('/transaction');
      const datas = response.data.data;
      const mappedData = datas.map((data) => {
        data.trip.dateTrip = new Date(data.trip.dateTrip).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return data;
      });

      const filteredData = mappedData
        .filter((data) => data.user.id === state.user.id && data.status !== 'Waiting Payment')
        .reverse()
        .sort(function (a, b) {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
      setTrans(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [state]);

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      {trans === null ? (
        <div>Loading...</div>
      ) : (
        <main className="md:container mx-auto overflow-auto pb-36">
          <section className="px-2 sm:container mx-auto md:w-max pb-10 ">
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-24 bg-white p-6 rounded-md shadow">
              <div className="flex flex-col gap-2">
                <header className="pb-8">
                  <h1 className="text-4xl font-bold">Personal Info</h1>
                </header>
                <DataUser icon="/assets/icons/name.svg" desc="Full Name" name={state?.user?.fullname} />
                <DataUser icon="/assets/icons/email.svg" desc="Email" name={state?.user?.email} />
                <DataUser icon="/assets/icons/phone.svg" desc="Mobile Phone" name={state?.user?.phone} />
                <DataUser icon="/assets/icons/loc.svg" desc="Address" name={state?.user?.address} />
              </div>

              <div className="flex flex-col gap-2">
                <img src="/assets/images/photo.png" alt="img" className="rounded-md" />
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-bold py-2 rounded-md ">Change Photo Profile</button>
              </div>
            </div>
          </section>

          <section className="container mx-auto">
            <h1 className="text-2xl font-bold py-10">History Trip</h1>

            <>
              {trans.map((data, index) => {
                return (
                  <Box key={index}>
                    <Invoice
                      // data trip
                      date={data.trip.dateTrip}
                      title={data.trip.title}
                      country={data.trip.country?.name}
                      day={data.trip.day}
                      night={data.trip.night}
                      accomodation={data.trip.accomodation}
                      transportation={data.trip.transportation}
                      // transaction
                      style={data.status === 'Approve' ? 'green' : data.status === 'Waiting Approve' ? 'yellow' : 'red'}
                      status={data.status}
                      attachment={data.attachment}
                      disabled={'disabled'}
                      proofDesc="TCK0101"
                      qty={data.qty}
                      total={data.total}
                      // user
                      userName={data.user.fullname}
                      userEmail={data.user.email}
                      userPhone={data.user.phone}
                    />
                  </Box>
                );
              })}
            </>
          </section>
        </main>
      )}
      <Footer />
    </div>
  );
}

const DataUser = (props) => {
  return (
    <div className="data-user flex gap-2 pb-4">
      <div className="relative w-9">
        <img src={props.icon} alt="img" className="absolute right-1/2 bottom-1/2 transform translate-y-1/2 translate-x-1/2" />
      </div>
      <article className=" space-y-1">
        <dd className="text-sm font-bold">{props.name}</dd>
        <dd className="text-xs text-gray-400">{props.desc}</dd>
      </article>
    </div>
  );
};

export default Profile;
