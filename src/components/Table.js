function Table2({ children }) {
  return <table className="table-auto text-left overflow-auto bg-white">{children}</table>;
}
function Table({ children }) {
  return <table className=" text-left table-auto w-800 md:w-auto overflow-auto">{children}</table>;
}
function TFoot(props) {
  return (
    <tfoot className="font-bold text-xs md:text-lg">
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className="py-2">Total</td>
        <td className="py-2">:</td>
        <td className="text-red-600 py-2">{props.total}</td>
      </tr>
    </tfoot>
  );
}
function TData2(props) {
  return (
    <tr className="border-b border-grey-600  overflow-hidden">
      <td className="px-2">{props.no}</td>
      <td>{props.user}</td>
      <td className="md:w-64 ">{props.trip}</td>
      <td>
        <a href={props.proofTF} target="_blank" rel="noreferrer">
          <img className="w-20" src={props.proofTF} alt="proof" />{' '}
        </a>
      </td>
      <td className="">{props.updatedAt}</td>
      <td className={`font-bold ${props.statusStyle} py-4`}>{props.status}</td>
      <td>
        <button onClick={props.onClick} type="button">
          <img id={props.id} src="/assets/icons/search.svg" alt="icon" />
        </button>
      </td>
    </tr>
  );
}

function TData(props) {
  return (
    <tr className="border-b border-grey-600 text-gray-400 text-xs md:text-lg">
      <td>{props.no}</td>
      <td>{props.fullName}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td className="text-black font-bold py-2">Qty</td>
      <td className="text-black font-bold py-2">:</td>
      <td className="text-black font-bold py-2">{props.qty}</td>
    </tr>
  );
}
function TBody({ children }) {
  return <tbody>{children}</tbody>;
}

function THeader(props) {
  return (
    <thead className="border-b border-grey-600 text-xs md:text-lg">
      <tr>
        <th className="py-2 px-2">{props.col1}</th>
        <th>{props.col2}</th>
        <th>{props.col3}</th>
        <th>{props.col4}</th>
        <th className="">{props.col5}</th>
        <th>{props.col6}</th>
        <th>{props.col7}</th>
      </tr>
    </thead>
  );
}
export { Table, Table2, THeader, TBody, TData, TData2, TFoot };
