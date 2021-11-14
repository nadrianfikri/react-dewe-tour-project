import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Invoice from '../components/Invoice';
import Box from '../components/Box';
import Alert from '../components/Alert';
import NoData from '../components/NoData';
import { Modal, Overlay } from '../components/Modal';

import { Transition } from '@headlessui/react';
import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { API } from '../config/api';

function Payment() {
  const history = useHistory();
  const [state] = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [trans, setTrans] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [preview, setPreview] = useState(null); //For image preview
  const [message, setMessage] = useState(null);

  // Create Variabel for form data here ...
  const [form, setForm] = useState({
    image: [],
    status: '',
  });

  // FETCHING DATA
  // create func getData transaction
  const getDataTrans = async () => {
    try {
      const response = await API.get('/transaction');
      const datas = response.data.data;
      const mappedData = datas.map((data) => {
        data.trip.dateTrip = new Date(data.trip.dateTrip).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return data;
      });

      const filteredData = mappedData.filter((data) => data.user.id === state.user.id && data.status === 'Waiting Payment');

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
    const id = Number(e.target.id);
    const detailData = trans.filter((item) => item.id === id);

    setDetailData(detailData);
  };

  // create function to show the modal
  const showModal = async (e) => {
    if (form.status == '') {
      const alert = (
        <Alert
          variant="red"
          message="Please Upload Your Proof of Payment"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);

      setTimeout(() => {
        setMessage(null);
      }, 1500);
      return;
    }
    setIsOpen(true);
  };

  // create function for update transaction
  const updateTransaction = async () => {
    // create config type content
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // Create store data with FormData as object
    const formData = new FormData();
    formData.set('attachment', form.image[0]);
    formData.set('status', form.status);

    const id = detailData[0]?.id;

    // update transaction data here ...
    await API.patch(`/transaction/${id}`, formData, config);
  };

  // create function for update quota trip
  const updateQuota = async () => {
    // create config type content
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Create store data new quota filled as object
    const quota = {
      quotaFilled: detailData[0]?.trip?.quotaFilled - detailData[0]?.qty,
    };

    // get trip id
    const id = detailData[0]?.trip?.id;

    // update trip data here ...
    await API.patch(`/trip/${id}`, quota, config);
  };

  // send data to database when submit
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      // call function  send data to database
      await updateTransaction();
      await updateQuota();

      setIsOpen(false);
      history.push('/profile');
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDataTrans();
  }, [form, state]);

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      <main className="container mx-auto overflow-auto pb-36">
        <form onSubmit={handleOnSubmit} encType="multipart/form-data">
          {trans == [] || null ? (
            <div>Loading...</div>
          ) : (
            <>
              {trans.length > 0 ? (
                <>
                  {trans.map((data, i) => {
                    return (
                      <Box key={i}>
                        {message && message}
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
                          attachment={preview && data.id === detailData[0]?.id ? preview : data.attachment}
                          proofDesc={data.status === 'Approve' ? 'No. Ticket' : 'Upload proof of payment'}
                          qty={data.qty}
                          total={data.total}
                          // user
                          userName={data.user.fullname}
                          userEmail={data.user.email}
                          userPhone={data.user.phone}
                          onChange={handleChange}
                          id={data.id}
                        />
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
                            <button id={data.trip?.id} onClick={showModal} type="button" className=" bg-yellow-400 hover:bg-yellow-500 transition duration-300 py-2 px-20 text-lg text-white font-bold rounded-md">
                              Pay
                            </button>
                          </div>
                        )}
                      </Box>
                    );
                  })}
                </>
              ) : (
                <NoData desc="There is no data" />
              )}

              {/* ModaL */}
              <Transition show={isOpen}>
                <Overlay>
                  <Transition.Child
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 scale-0"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-0"
                  >
                    <Modal>
                      <div className="py-6 px-12 text-center">
                        <p>
                          Your payment will be confirmed within 1 x 24 hours <br /> To see orders click <input type="submit" value="Here" className="font-bold cursor-pointer" /> thank you!
                        </p>
                      </div>
                    </Modal>
                  </Transition.Child>
                </Overlay>
              </Transition>
            </>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Payment;
