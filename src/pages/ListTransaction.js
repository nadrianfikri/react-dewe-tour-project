import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '../components/Box';
import Invoice from '../components/Invoice';
import { Modal } from '../components/Modal';
import { Table, THeader, TBody, TData2 } from '../components/Table';
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
          <Box>
            <button onClick={handleClose} className="absolute top-0 right-0 text-5xl text-gray-400 close-modal z-50 transform rotate-45">
              +
            </button>
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
            <section className="flex justify-end text-white gap-4 ">
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
