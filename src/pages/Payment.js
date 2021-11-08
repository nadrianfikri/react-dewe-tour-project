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
  const [trans, setTrans] = useState([]);
  const [preview, setPreview] = useState(null); //For image preview

  // Create Variabel for form data here ...
  const [transId, setTransId] = useState([null]);
  const [prevData, setPrevData] = useState([]);
  const [form, setForm] = useState({
    image: '',
    status: '',
  });

  // FETCHING DATA
  // create func getData transaction
  const getData = async () => {
    try {
      const response = await API.get('/transaction');
      const datas = response.data.data;
      const mappedData = datas.map((data) => {
        data.trip.dateTrip = new Date(data.trip.dateTrip).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return data;
      });

      const filteredData = mappedData.filter((data) => data.user.id === state.user.id && data.status === 'Waiting Payment').reverse();

      setTrans(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE DATA TRANSACTION

  // Create function for handle change data on form here ...
  const handleChange = (e) => {
    setForm({
      ...form,
      status: 'Waiting Approve',
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  // console.log(form);

  // create function to show the modal
  const showModal = async (e) => {
    if (form.image === '') {
      alert('Please upload your proof!!');
      return;
    }

    const id = Number(e.target.id);
    setTransId(id);

    const detailData = await trans.find((item) => item.id == e.target.id);
    setPrevData(detailData);

    document.querySelector('#paymentModal').classList.toggle('hidden');
  };

  // send data to database when submit
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      // create config type content
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // Create store data with FormData as object
      const formData = new FormData();
      formData.set('qty', toString(prevData.qty));
      formData.set('total', toString(prevData.total));
      formData.set('status', form.status);
      formData.set('attachment', form.image[0]);
      formData.set('trip_id', toString(prevData.trip?.id));
      formData.set('user_id', toString(prevData.user?.id));

      // update transaction data here ...
      const response = await API.put(`/transaction/${transId}`, formData, config);
      // console.log(response);

      document.querySelector('#paymentModal').classList.toggle('hidden');

      history.push('/payment');
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(form);
  console.log(trans);
  useEffect(() => {
    getData();
  }, [state]);

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      <main className="container mx-auto overflow-auto pb-36">
        {/* {trans === [] || null ? (
          <div>Loading...</div>
        ) : ( */}
        <form onSubmit={handleOnSubmit} encType="multipart/form-data">
          {trans.map((data, i) => {
            return (
              <Box key={i}>
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
                  disabled={''}
                  attachment={data.id === transId ? preview : data.attachment}
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
                {data.status !== 'Waiting Payment' ? (
                  <div className="hidden ml-auto my-6 pr-4 ">
                    <button onClick={showModal} type="button" className=" bg-yellow-400 py-2 px-20 text-lg text-white font-bold rounded-md">
                      Pay
                    </button>
                  </div>
                ) : (
                  <div className="ml-auto my-6 pr-4 ">
                    <button id={data.id} onClick={showModal} type="button" className=" bg-yellow-400 hover:bg-yellow-500 transition duration-300 py-2 px-20 text-lg text-white font-bold rounded-md">
                      Pay
                    </button>
                  </div>
                )}
              </Box>
            );
          })}

          {/* ModaL */}
          <Modal id="paymentModal" w="max">
            <div className="py-6 px-12 text-center">
              <p>
                Your payment will be confirmed within 1 x 24 hours <br /> To see orders click <input type="submit" value="Here" className="font-bold cursor-pointer" /> thank you!
              </p>
            </div>
          </Modal>
        </form>
        {/* )} */}
      </main>
      <Footer />
    </div>
  );
}

export default Payment;
