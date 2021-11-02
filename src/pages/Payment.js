import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Invoice from '../components/Invoice';

import { Table, THeader, TBody, TData, TFoot } from '../components/Table';
import { Modal } from '../components/Modal';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Box from '../components/Box';

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

export default Payment;
