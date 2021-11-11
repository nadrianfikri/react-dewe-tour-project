import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '../components/Box';
import Invoice from '../components/Invoice';
import { Modal } from '../components/Modal';
import { Table, THeader, TBody, TData2 } from '../components/Table';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../config/api';

function ListTransaction() {
  const history = useHistory();
  // store data
  const [list, setList] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [preview, setPreview] = useState(null);
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
      const sortDataByUpdate = mappedData.sort(function (a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      setList(sortDataByUpdate);
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

    const id = detailData?.id;

    // update transaction data here ...
    await API.patch(`/transaction/${id}`, formData, config);
  };
  console.log(detailData.id);

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
    const id = detailData?.id;

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
      quotaFilled: detailData?.trip?.quotaFilled + 1,
    };
    // get trip id
    const id = detailData?.trip?.id;
    // update trip data here ...
    await API.patch(`/trip/${id}`, quota, config);
  };

  // if cancel
  const handleCancel = async () => {
    try {
      await updateStatusTrans();
      await updateQuota();

      getData();
      document.querySelector('#modalApprove').classList.toggle('hidden');
      history.push('/list-transaction');
    } catch (error) {
      console.log(error);
    }
  };
  // if approve
  const handleApprove = async () => {
    try {
      await updateTransaction();

      getData();
      document.querySelector('#modalApprove').classList.toggle('hidden');
      history.push('/list-transaction');
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE MODALS
  const handleOpen = (e) => {
    const detailData = list.find((item) => item.id == e.target.id);
    setDetailData(detailData);

    document.querySelector('#modalApprove').classList.toggle('hidden');
  };

  const handleClose = () => {
    document.querySelector('#modalApprove').classList.toggle('hidden');
  };

  // console.log(form);
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

        <Modal id="modalApprove" w="3/4">
          <Box>
            <button onClick={handleClose} className="absolute top-0 right-0 text-5xl text-gray-400 close-modal z-50 transform rotate-45">
              +
            </button>
            <Invoice
              // data trip
              date={detailData.trip?.dateTrip}
              title={detailData.trip?.title}
              country={detailData.trip?.country}
              day={detailData.trip?.day}
              night={detailData.trip?.night}
              accomodation={detailData.trip?.accomodation}
              transportation={detailData.trip?.transportation}
              // transaction
              status={detailData.status}
              style={detailData.status === 'Approve' ? 'green' : detailData.status === 'Waiting Approve' ? 'yellow' : 'red'}
              disabled={detailData.status === 'Waiting Approve' ? '' : 'disable'}
              attachment={preview && preview ? preview : detailData.attachment}
              proofDesc={detailData.status === 'Approve' ? 'No. Ticket' : 'Upload proof of payment'}
              qty={detailData.qty}
              total={detailData.total}
              // user
              userName={detailData.user?.fullname}
              userEmail={detailData.user?.email}
              userPhone={detailData.user?.phone}
              onChange={handleChange}
              id="attachment"
            />

            <section className={`${detailData.status === 'Waiting Approve' ? 'flex' : 'hidden'}  justify-end text-white gap-4 `}>
              <button onClick={handleCancel} className="px-4 py-1 rounded-md bg-red-500 font-bold">
                Cancel
              </button>
              <button onClick={handleApprove} className="px-4 py-1 rounded-md bg-green-500 font-bold">
                Approve
              </button>
            </section>
          </Box>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}

export default ListTransaction;
