import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Table, THeader, TBody, TData, TFoot } from '../components/Table';

function Payment() {
  return (
    <div className="pt-36 bg-gray-100">
      <Navbar bg="bg-navbar" class="none" />
      <main className="container mx-auto overflow-auto">
        <div className="flex flex-col gap-2 py-2 px-6 bg-white border-2  border-gray-300 rounded-md">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

function InfoTrip(props) {
  return (
    <div>
      <dt className="text-lg font-bold">{props.title}</dt>
      <dd className="text-sm text-gray-400">{props.desc}</dd>
    </div>
  );
}
function UploadProof(props) {
  return (
    <div>
      <img className="h-36 border-2 border-gray-600 rounded" src={props.image} alt="img" />
      <dd className="text-sm text-gray-400">{props.desc}</dd>
    </div>
  );
}

export default Payment;
