import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Modal } from '../components/Modal';
import { InfoTrip, UploadProof } from './Payment';

import { Table, THeader, TBody, TData2, TData, TFoot } from '../components/Table';

function ListTransaction() {
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
              <TData2 no="1" user="Nadrian" trip="6D/4N Fun Tassie Vacation" proofTF="bca.jpg" status="Pending" statusStyle="text-yellow-400" />
              <TData2 no="2" user="Nadrian" trip="6D/4N Fun Tassie Vacation" proofTF="bca.jpg" status="Approve" statusStyle="text-green-400" />
            </TBody>
          </Table>
        </section>

        <Modal id="modalApprove" w="3/4">
          <div className="flex flex-col gap-2 py-2 px-6 bg-white border-2  border-gray-300 rounded-md">
            <button onClick={handleClose} class="absolute top-0 right-0 text-5xl text-gray-400 close-modal z-50 transform rotate-45">
              +
            </button>
            <section className="flex justify-between items-center ">
              <div>
                <img src="/assets/images/logo-dewe-black.png" alt="logo" />
              </div>
              <div className="text-right space-y-2">
                <h1 className="font-bold text-4xl">Booking</h1>
                <p className="text-gray-400 text-lg">
                  <span className="font-bold">Saturday</span>, 22 July 2020
                </p>
              </div>
            </section>

            <section className="flex justify-between items-center overflow-auto">
              <div className="flex flex-col justify-between gap-8">
                <div className="text-2xl font-bold">
                  <h1>6D/4N Fun Tassie Vacation</h1>
                  <p className="text-sm text-gray-400">Australia</p>
                </div>
                <div className="bg-yellow-100 text-yellow-400 p-2 rounded-md w-max">Waiting Approve</div>
              </div>
              <div className="flex flex-col justify-between gap-8">
                <InfoTrip title="Data Trip" desc="26 Agustus 2020" />
                <InfoTrip title="Accomodation" desc="Hotel 4 Night" />
              </div>
              <div className="flex flex-col justify-between gap-8">
                <InfoTrip title="Duration" desc="6 Day 4 Night" />
                <InfoTrip title="Transportation" desc="Qatar Airways" />
              </div>
              <div className="flex flex-col justify-between gap-8">
                <UploadProof image="/assets/images/proof.png" desc="Upload payment proof" />
              </div>
            </section>
            <section className="flex flex-col overflow-auto">
              <Table>
                <THeader col1="No" col2="Full Name" col3="Gender" col4="Phone" />
                <TBody>
                  <TData no="1" fullName="Nadrian" gender="Male" phone="08367236278" qty="2" />
                  <TData no="2" fullName="alfikri" gender="Female" phone="08367236278" qty="2" />
                </TBody>
                <TFoot total="IDR 12.000.000" />
              </Table>
            </section>
            <section className="flex justify-end text-white gap-4 ">
              <button className="px-4 py-1 rounded-md bg-red-500 font-bold">Cancel</button>
              <button className="px-4 py-1 rounded-md bg-green-500 font-bold">Approve</button>
            </section>
          </div>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}

export default ListTransaction;
