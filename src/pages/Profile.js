import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UploadProof, InfoTrip } from './Payment';
import { Table, THeader, TBody, TData, TFoot } from '../components/Table';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

function Profile() {
  const { state } = useContext(AuthContext);

  const tourData = JSON.parse(localStorage.getItem('tour_data'));
  const dataTransaction = JSON.parse(localStorage.getItem('transaction'));

  const transaction = dataTransaction[0];
  const userId = transaction.userId;

  const data = tourData[userId - 1];
  const user = state.user;

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
    }).format(number);
  };
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
          {/* box invoice */}
          <div className="flex flex-col gap-2 py-2 px-6 bg-white border-2  border-gray-300 rounded-md">
            <section className="flex justify-between items-center ">
              <div>
                <img src="/assets/images/logo-dewe-black.png" alt="logo" />
              </div>
              <div className="text-right space-y-2">
                <h1 className="font-bold text-4xl">Booking</h1>
                <p className="text-gray-400 text-lg">
                  <span className="font-bold">Saturday</span>, {data.date}
                </p>
              </div>
            </section>
            <section className="flex justify-between items-center overflow-auto">
              <div className="flex flex-col justify-between gap-8">
                <div className="text-2xl font-bold">
                  <h1>
                    {data.duration.day}D/{data.duration.night}N {data.name}
                  </h1>
                  <p className="text-sm text-gray-400">{data.country}</p>
                </div>
                <div className={`bg-${transaction.payment.style}-100 text-${transaction.payment.style}-400 p-2 rounded-md w-max`}>{transaction.payment.status}</div>
              </div>
              <div className="flex flex-col justify-between gap-8">
                <InfoTrip title="Data Trip" desc={data.date} />
                <InfoTrip title="Accomodation" desc={data.accomodation} />
              </div>
              <div className="flex flex-col justify-between gap-8">
                <InfoTrip title="Duration" desc={`${data.duration.day} Day ${data.duration.night} Night`} />
                <InfoTrip title="Transportation" desc={data.transportation} />
              </div>
              <div className="flex flex-col justify-between text-center gap-8">
                <UploadProof image="/assets/images/qr-code 1.png" desc="TCK0101" />
              </div>
            </section>
            <section className="flex flex-col overflow-auto">
              <Table>
                <THeader col1="No" col2="Full Name" col3="Gender" col4="Phone" />
                <TBody>
                  <TData no="1" fullName={user.name} gender="Male" phone={user.phone} qty={transaction.qty} />
                </TBody>
                <TFoot total={`IDR. ${rupiah(transaction.total)}`} />
              </Table>
            </section>
          </div>
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
