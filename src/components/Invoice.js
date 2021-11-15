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
        <div className="w-28 md:w-auto">
          <img src="/assets/images/logo-dewe-black.png" alt="logo" />
        </div>
        <div className="text-right space-y-2">
          <h1 className="font-bold text-xl md:text-4xl">Booking</h1>
          <p className="text-gray-400 text-xs md:text-lg">{props.date}</p>
        </div>
      </section>
      <section className="flex flex-col md:flex-row justify-between items-streach md:items-center gap-2 overflow-auto">
        <div className="flex flex-col justify-between gap-2 md:gap-8">
          <div className="text-md md:text-2xl font-bold overflow-hidden">
            <h1 className=" lg:w-96 line-clamp-3">{props.title}</h1>
            <p className="text-xs md:text-sm text-gray-400">{props.country}</p>
          </div>
          <div className={`bg-${props.style}-100 text-${props.style}-400 p-2 rounded-md w-max text-xs md:text-lg`}>{props.status}</div>
        </div>
        <div className="flex flex-row md:flex-col justify-between gap-8">
          <InfoTrip title="Data Trip" desc={props.date} />
          <InfoTrip title="Accomodation" desc={props.accomodation} align="text-right md:text-left" />
        </div>
        <div className="flex flex-row md:flex-col justify-between gap-8">
          <InfoTrip title="Duration" desc={`${props.day} Day ${props.night} Night`} />
          <InfoTrip title="Transportation" desc={props.transportation} align="text-right md:text-left" />
        </div>
        <div className="flex flex-col items-center md:justify-between text-center gap-8">
          <UploadProof id={props.id} onChange={props.onChange} image={props.attachment} desc={props.proofDesc} disabled={props.disabled} />
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
    <div className={`info-trip ${props.align}`}>
      <dt className="text-xs md:text-lg font-bold">{props.title}</dt>
      <dd className="text-xs md:text-sm text-gray-400">{props.desc}</dd>
    </div>
  );
}
export function UploadProof(props) {
  return (
    <div>
      <label className={`cursor-pointer${props.disabled}`} htmlFor={`${props.id}${props.disabled}`}>
        <img className="h-36 w-36 border-2 object-cover border-gray-600 rounded" src={props.image} alt="img" />
      </label>
      <input onChange={props.onChange} type="file" id={props.id} name="image" hidden />
      <dd className="text-sm mt-2 text-gray-400">{props.desc}</dd>
    </div>
  );
}

export default Invoice;
