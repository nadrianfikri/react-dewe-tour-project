import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Invoice from '../components/Invoice';
import Box from '../components/Box';
import Alert from '../components/Alert';

import { Modal } from '../components/Modal';

import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { API } from '../config/api';

function Payment() {
  const history = useHistory();
  const [state] = useContext(AuthContext);
  const [trans, setTrans] = useState(null);

  // create func getData transaction
  const getData = async () => {
    try {
      const response = await API.get('/transaction');
      const datas = response.data.data;

      const filteredData = datas.filter((data) => data.user.id === state.user.id && data.status === 'Waiting Payment');
      setTrans(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // transaction.payment.status = 'Waiting Approve';
    // transaction.payment.style = 'yellow';

    // localStorage.setItem('transaction', JSON.stringify([transaction]));

    // document.querySelector('#paymentModal').classList.toggle('hidden');
    // history.push('/payment');
  };

  const showModal = () => {
    document.querySelector('#paymentModal').classList.toggle('hidden');
  };

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      <main className="container mx-auto overflow-auto pb-36">
        <form onSubmit={handleOnSubmit} action="/" encType="multypart/form-data">
          {trans === null ? (
            <div>Loading...</div>
          ) : (
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
                      style={data.status === 'Waiting Payment' || 'Canceled' ? 'red' : data.status === 'Waiting Approve' ? 'yellow' : 'green'}
                      status={data.status}
                      attachment={data.attachment}
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
          )}

          {/* conditional button */}
          {/* {transaction.payment.style !== 'red' ? ( */}
          <div className="hidden float-right my-6 pr-4 ">
            <button onClick={showModal} type="button" className=" bg-yellow-400 py-2 px-20 text-lg text-white font-bold rounded-md">
              Pay
            </button>
          </div>
          {/* ) : ( */}
          <div className=" float-right my-6 pr-4 ">
            <button onClick={showModal} type="button" className=" bg-yellow-400 py-2 px-20 text-lg text-white font-bold rounded-md">
              Pay
            </button>
          </div>
          {/* )} */}

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
