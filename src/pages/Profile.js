import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Invoice from '../components/Invoice';
import Box from '../components/Box';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

function Profile() {
  const { state } = useContext(AuthContext);

  const tourData = JSON.parse(localStorage.getItem('tour_data'));
  const dataTransaction = JSON.parse(localStorage.getItem('transaction'));

  const transaction = dataTransaction[0];
  const userId = transaction.userId;

  const data = tourData[userId - 1]; //instead find()
  const user = state.user;

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      <main className="md:container mx-auto overflow-auto pb-36">
        <section className="px-2 sm:container mx-auto md:w-max pb-10 ">
          <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-24 bg-white p-6 rounded-md shadow">
            <div className="flex flex-col gap-2">
              <header className="pb-8">
                <h1 className="text-4xl font-bold">Personal Info</h1>
              </header>
              <DataUser icon="/assets/icons/name.svg" desc="Full Name" name={user.name} />
              <DataUser icon="/assets/icons/email.svg" desc="Email" name={user.email} />
              <DataUser icon="/assets/icons/phone.svg" desc="Mobile Phone" name={user.phone} />
              <DataUser icon="/assets/icons/loc.svg" desc="Address" name="Perumahan Permata Bintaro Residence C-3" />
            </div>

            <div className="flex flex-col gap-2">
              <img src="/assets/images/photo.png" alt="img" className="rounded-md" />
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-bold py-2 rounded-md ">Change Photo Profile</button>
            </div>
          </div>
        </section>

        <section className="container mx-auto">
          <h1 className="text-2xl font-bold py-10">History Trip</h1>
          <Box>
            <Invoice
              // data trip
              date={data.date}
              title={data.name}
              country={data.country}
              day={data.duration.day}
              night={data.duration.night}
              accomodation={data.accomodation}
              transportation={data.transportation}
              // transaction
              style={transaction.payment.style}
              status={transaction.payment.status}
              attachment="/assets/images/qr-code 1.png"
              proofDesc="TCK0101"
              qty={transaction.qty}
              total={transaction.total}
              // user
              userName={user.name}
              userPhone={user.phone}
            />
          </Box>
        </section>
      </main>
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
