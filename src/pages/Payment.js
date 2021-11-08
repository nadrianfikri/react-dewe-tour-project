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
  const [preview, setPreview] = useState(null); //For image preview

  // Create Variabel for store product data here ...
  const [form, setForm] = useState({
    image: '',
    status: 'Waiting Payment',
    transId: '',
  });

  // FETCHING DATA
  // create func getData transaction
  const getData = async () => {
    try {
      const response = await API.get('/transaction');
      const datas = response.data.data;

      const filteredData = datas.filter((data) => data.user.id === state.user.id && data.status === 'Waiting Payment').reverse();
      setTrans(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // UPDATE DATA TRANSACTION
  // get transId form value
  // const elTransId = document.getElementsByName('transId');

  // console.log(el[0].value);

  // Create function for handle change data on form here ...

  const handleChange = (e) => {
    setForm({
      ...form,
      status: 'Waiting Approve',
      transId: 8,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  console.log(form);

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
              {trans.map((data) => {
                return (
                  <>
                    <Box key={data.id}>
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
                        attachment={preview && data.id === form.transId ? preview : data.attachment}
                        proofDesc={data.status === 'Approve' ? 'No. Ticket' : 'Upload proof of payment'}
                        qty={data.qty}
                        total={data.total}
                        // user
                        userName={data.user.fullname}
                        userEmail={data.user.email}
                        userPhone={data.user.phone}
                        onChange={handleChange}
                      />
                      {/* {preview && <img className="w-40 h-40 object-cover object-center" src={preview} alt="preview" />} */}
                      <input hidden name="transId" onChange={handleChange} type="number" value={data.id} />
                      {/* conditional button */}
                      {/* {transaction.payment.style !== 'red' ? ( */}
                      <div className="hidden ml-auto my-6 pr-4 ">
                        <button onClick={showModal} type="button" className=" bg-yellow-400 py-2 px-20 text-lg text-white font-bold rounded-md">
                          Pay
                        </button>
                      </div>
                      {/* ) : ( */}
                      <div className="ml-auto my-6 pr-4 ">
                        <button onClick={showModal} type="button" className=" bg-yellow-400 hover:bg-yellow-500 transition duration-300 py-2 px-20 text-lg text-white font-bold rounded-md">
                          Pay
                        </button>
                      </div>
                      {/* )} */}
                    </Box>
                  </>
                );
              })}
            </>
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
