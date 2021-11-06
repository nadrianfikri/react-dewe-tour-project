import { Table, THeader, TBody, TData, TFoot } from './Table';

function Invoice(props) {
  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <>
      {/* box invoice */}
      <section className="flex justify-between items-center ">
        <div>
          <img src="/assets/images/logo-dewe-black.png" alt="logo" />
        </div>
        <div className="text-right space-y-2">
          <h1 className="font-bold text-4xl">Booking</h1>
          <p className="text-gray-400 text-lg">
            <span className="font-bold">Saturday</span>, {props.date}
          </p>
        </div>
      </section>
      <section className="flex justify-between items-center overflow-auto">
        <div className="flex flex-col justify-between gap-8">
          <div className="text-2xl font-bold">
            <h1>{props.title}</h1>
            <p className="text-sm text-gray-400">{props.country}</p>
          </div>
          <div className={`bg-${props.style}-100 text-${props.style}-400 p-2 rounded-md w-max`}>{props.status}</div>
        </div>
        <div className="flex flex-col justify-between gap-8">
          <InfoTrip title="Data Trip" desc={props.date} />
          <InfoTrip title="Accomodation" desc={props.accomodation} />
        </div>
        <div className="flex flex-col justify-between gap-8">
          <InfoTrip title="Duration" desc={`${props.day} Day ${props.night} Night`} />
          <InfoTrip title="Transportation" desc={props.transportation} />
        </div>
        <div className="flex flex-col justify-between text-center gap-8">
          <UploadProof image={props.attachment} desc={props.proofDesc} />
        </div>
      </section>
      <section className="flex flex-col overflow-auto">
        <Table>
          <THeader col1="No" col2="Full Name" col3="Email" col4="Phone" />
          <TBody>
            <TData no="1" fullName={props.userName} email={props.userEmail} phone={props.userPhone} qty={props.qty} />
          </TBody>
          <TFoot total={`IDR. ${rupiah(props.total)}`} />
        </Table>
      </section>
      {/* end invoice */}
    </>
  );
}

export function InfoTrip(props) {
  return (
    <div className="info-trip">
      <dt className="text-lg font-bold">{props.title}</dt>
      <dd className="text-sm text-gray-400">{props.desc}</dd>
    </div>
  );
}
export function UploadProof(props) {
  return (
    <div>
      <img className="h-36 border-2 border-gray-600 rounded" src={props.image} alt="img" />
      <dd className="text-sm text-gray-400">{props.desc}</dd>
    </div>
  );
}

export default Invoice;
