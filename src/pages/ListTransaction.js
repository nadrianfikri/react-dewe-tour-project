import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Modal } from '../components/Modal';
import { InfoTrip, UploadProof } from './Payment';
import { Table, THeader, TBody, TData2, TData, TFoot } from '../components/Table';
import users from '../assets/user.json';

import { useHistory } from 'react-router-dom';

function ListTransaction() {
  const history = useHistory();

  const tourData = JSON.parse(localStorage.getItem('tour_data'));
  const dataTransaction = JSON.parse(localStorage.getItem('transaction'));

  const user = users[1];
  const transaction = dataTransaction[0];
  const userId = transaction.userId;

  const data = tourData[userId - 1];

  let statusPayment = 'Pending';
  if (transaction.payment.status === 'Canceled') {
    statusPayment = 'Cancel';
  } else if (transaction.payment.status === 'Approve') {
    statusPayment = 'Approve';
  } else {
    statusPayment = 'Pending';
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleCancel = () => {
    transaction.payment.status = 'Canceled';
    transaction.payment.style = 'red';

    localStorage.setItem('transaction', JSON.stringify([transaction]));

    document.querySelector('#modalApprove').classList.toggle('hidden');
    history.push('/list-transaction');
  };
  const handleApprove = () => {
    transaction.payment.status = 'Approve';
    transaction.payment.style = 'green';

    localStorage.setItem('transaction', JSON.stringify([transaction]));

    document.querySelector('#modalApprove').classList.toggle('hidden');
    history.push('/list-transaction');
  };

  const handleClose = () => {
    document.querySelector('#modalApprove').classList.toggle('hidden');
  };
  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      <main className="md:container mx-auto overflow-auto pb-36">
        <h1 className="text-4xl font-bold pb-10">Incoming Transaction</h1>
        <section className="flex flex-col overflow-auto bg-white">
          <Table>
            <THeader col1="No" col2="Users" col3="Trip" col4="Bukti Transfer" col5="Status Payment" col6="Action" />
            <TBody>
              {dataTransaction.map((result, index) => {
                return <TData2 no={index + 1} user={user.name} trip={`${data.duration.day}D/${data.duration.night}N  ${data.name}`} proofTF={result.image} status={statusPayment} statusStyle={`text-${transaction.payment.style}-400`} />;
              })}
            </TBody>
          </Table>
        </section>

        <Modal id="modalApprove" w="3/4">
          <div className="flex flex-col gap-2 py-2 px-6 bg-white border-2  border-gray-300 rounded-md">
            <button onClick={handleClose} className="absolute top-0 right-0 text-5xl text-gray-400 close-modal z-50 transform rotate-45">
              +
            </button>
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
            <section className="flex justify-end text-white gap-4 ">
              <button onClick={handleCancel} className="px-4 py-1 rounded-md bg-red-500 font-bold">
                Cancel
              </button>
              <button onClick={handleApprove} className="px-4 py-1 rounded-md bg-green-500 font-bold">
                Approve
              </button>
            </section>
          </div>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}

export default ListTransaction;
