import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import { InputSubmit } from '../components/Form';

import { Table, THeader, TBody, TData, TFoot } from '../components/Table';
import { Modal } from '../components/Modal';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Payment() {
  const { state } = useContext(AuthContext);
  const history = useHistory();

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

  const handleOnSubmit = (e) => {
    e.preventDefault();

    transaction.payment.status = 'Waiting Approve';
    transaction.payment.style = 'yellow';

    localStorage.setItem('transaction', JSON.stringify([transaction]));

    document.querySelector('#paymentModal').classList.toggle('hidden');
    history.push('/payment');
  };

  const showModal = () => {
    document.querySelector('#paymentModal').classList.toggle('hidden');
  };

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      <main className="container mx-auto overflow-auto pb-36">
        <form onSubmit={handleOnSubmit} action="/" encType="multypart/form-data">
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
              <div className="flex flex-col justify-between gap-8">
                <UploadProof image="/assets/images/proof.png" desc="Upload payment proof" />
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

          {/* conditional button */}
          {transaction.payment.style !== 'red' ? (
            <div className="hidden float-right my-6 pr-4 ">
              <button onClick={showModal} type="button" className=" bg-yellow-400 py-2 px-20 text-lg text-white font-bold rounded-md">
                Pay
              </button>
            </div>
          ) : (
            <div className=" float-right my-6 pr-4 ">
              <button onClick={showModal} type="button" className=" bg-yellow-400 py-2 px-20 text-lg text-white font-bold rounded-md">
                Pay
              </button>
            </div>
          )}

          {/* ModaL */}
          <Modal id="paymentModal" w="max">
            <div className="py-6 px-12 text-center">
              <p>
                Your payment will be confirmed within 1 x 24 hours <br /> To see orders click <input type="submit" value="Here" className="font-bold cursor-pointer" /> thank you!
              </p>
            </div>
          </Modal>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export function InfoTrip(props) {
  return (
    <div className="info-trip">
      <dt className="text-lg font-bold">{props.title}</dt>
      <dd className="text-sm text-gray-400">{props.desc}</dd>
    </div>
  );
}
export function UploadProof(props) {
  return (
    <div>
      <img className="h-36 border-2 border-gray-600 rounded" src={props.image} alt="img" />
      <dd className="text-sm text-gray-400">{props.desc}</dd>
    </div>
  );
}

export default Payment;
