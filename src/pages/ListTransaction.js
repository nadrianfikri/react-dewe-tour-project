import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '../components/Box';
import Invoice from '../components/Invoice';
import Alert from '../components/Alert';
import { Modal, Overlay } from '../components/Modal';
import { Table, THeader, TBody, TData2 } from '../components/Table';

import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../config/api';

function ListTransaction() {
  const title = 'Admin Transaction';
  document.title = 'Dewe Tour | ' + title;

  const history = useHistory();
  // store data
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    image: [],
    status: '',
  });

  // get data from database
  const getData = async () => {
    try {
      const response = await API.get('/transaction');
      const datas = response.data.data;
      const mappedData = datas.map((data) => {
        data.updatedAt = new Date(data.updatedAt).toLocaleString('en-GB');
        data.trip.dateTrip = new Date(data.trip.dateTrip).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return data;
      });

      setList(mappedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // UPDATE DATA TRANSACTION

  // Create function for handle change data on form here ...
  const handleChange = (e) => {
    setForm({
      ...form,
      status: 'Approve',
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
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

  // create function for update status without image
  const updateStatusTrans = async () => {
    // create config type content
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Create store data new status trans
    const status = {
      status: 'Canceled',
    };
    // get trans id
    const id = detailData[0]?.id;

    // update transaction data here ...
    await API.patch(`/transaction/${id}`, status, config);
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
      quotaFilled: detailData[0]?.trip?.quotaFilled + detailData[0]?.qty,
    };
    // get trip id
    const id = detailData[0]?.trip?.id;
    // update trip data here ...
    await API.patch(`/trip/${id}`, quota, config);
  };

  const deleteTrans = async () => {
    // get trans id
    const id = detailData[0]?.id;

    // update transaction data here ...
    await API.delete(`/transaction/${id}`);
  };

  // if cancel
  const handleCancel = async () => {
    try {
      await updateStatusTrans();
      await updateQuota();

      setIsOpen(false);
      history.push('/list-transaction');
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  // if approve
  const handleApprove = async () => {
    try {
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
      await updateTransaction();

      setIsOpen(false);
      history.push('/list-transaction');
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = () => {
    deleteTrans();
    setIsOpen(false);
    history.push('/list-transaction');
    getData();
  };

  // HANDLE MODALS
  const handleOpen = (e) => {
    const detailData = list.filter((item) => item.id == e.target.id);
    setDetailData(detailData);

    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      <main className="md:container mx-auto overflow-auto pb-36">
        <h1 className="text-4xl font-bold pb-10">Incoming Transaction</h1>
        <section className="flex flex-col overflow-auto bg-white">
          <Table>
            <THeader col1="No" col2="Users" col3="Trip" col4="Transfer Proof" col5="Updated At" col6="Status Payment" col7="Action" />
            <TBody>
              {list.map((data, index) => {
                return (
                  <TData2
                    key={index}
                    no={index + 1}
                    user={data.user?.fullname}
                    trip={data.trip?.title}
                    proofTF={data.attachment}
                    updatedAt={data.updatedAt}
                    status={data.status}
                    statusStyle={`text-${data.status === 'Approve' ? 'green' : data.status === 'Waiting Approve' ? 'yellow' : 'red'}-400`}
                    onClick={handleOpen}
                    id={data.id}
                  />
                );
              })}
            </TBody>
          </Table>
        </section>

        {/* modal */}
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
              <Modal width="w-screen md:w-auto">
                {message && message}

                <Box>
                  <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0 text-5xl text-gray-400 close-modal z-50 transform rotate-45">
                    +
                  </button>
                  <Invoice
                    // data trip
                    date={detailData[0]?.trip?.dateTrip}
                    title={detailData[0]?.trip?.title}
                    country={detailData[0]?.trip?.country?.name}
                    day={detailData[0]?.trip?.day}
                    night={detailData[0]?.trip?.night}
                    accomodation={detailData[0]?.trip?.accomodation}
                    transportation={detailData[0]?.trip?.transportation}
                    // transaction
                    status={detailData[0]?.status}
                    style={detailData[0]?.status === 'Approve' ? 'green' : detailData[0]?.status === 'Waiting Approve' ? 'yellow' : 'red'}
                    disabled={detailData[0]?.status === 'Waiting Approve' ? '' : 'disable'}
                    attachment={preview && preview ? preview : detailData[0]?.attachment}
                    proofDesc={detailData[0]?.status === 'Approve' ? 'No. Ticket' : 'Upload proof of payment'}
                    qty={detailData[0]?.qty}
                    total={detailData[0]?.total}
                    // user
                    userName={detailData[0]?.user?.fullname}
                    userEmail={detailData[0]?.user?.email}
                    userPhone={detailData[0]?.user?.phone}
                    onChange={handleChange}
                    id="attachment"
                  />

                  <section className={`${detailData[0]?.status === 'Waiting Approve' ? 'flex' : 'hidden'}  justify-end text-white gap-4 `}>
                    <button onClick={handleCancel} className="px-4 py-1 rounded-md bg-red-500 font-bold">
                      Cancel
                    </button>
                    <button onClick={handleApprove} className="px-4 py-1 rounded-md bg-green-500 font-bold">
                      Approve
                    </button>
                  </section>
                  <section className={`${detailData[0]?.status === 'Waiting Payment' ? 'flex' : 'hidden'}  justify-end text-white gap-4 `}>
                    <button onClick={handleDelete} className={`px-4 py-1 rounded-md bg-red-500 font-bold`}>
                      Delete
                    </button>
                  </section>
                </Box>
              </Modal>
            </Transition.Child>
          </Overlay>
        </Transition>

        {/* <Modal id="modalApprove" w="3/4">
          
        </Modal> */}
      </main>
      <Footer />
    </div>
  );
}

export default ListTransaction;
