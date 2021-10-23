function Table2({ children }) {
  return <table className="table-auto text-left overflow-auto bg-white">{children}</table>;
}
function Table({ children }) {
  return <table className="table-auto text-left overflow-auto">{children}</table>;
}
function TFoot(props) {
  return (
    <tfoot className="font-bold ">
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
    <tr className="border-b border-grey-600">
      <td className="px-2">{props.no}</td>
      <td>{props.user}</td>
      <td>{props.trip}</td>
      <td>{props.proofTF}</td>
      <td className={`font-bold ${props.statusStyle} py-4`}>{props.status}</td>
      <td>
        <a href="/">
          <img src="/assets/icons/search.svg" alt="icon" />
        </a>
      </td>
    </tr>
  );
}

function TData(props) {
  return (
    <tr className="border-b border-grey-600 text-gray-400">
      <td>{props.no}</td>
      <td>{props.fullName}</td>
      <td>{props.gender}</td>
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
    <thead className="border-b border-grey-600 ">
      <tr>
        <th className="py-2 px-2">{props.col1}</th>
        <th>{props.col2}</th>
        <th>{props.col3}</th>
        <th>{props.col4}</th>
        <th>{props.col5}</th>
        <th>{props.col6}</th>
      </tr>
    </thead>
  );
}
export { Table, Table2, THeader, TBody, TData, TData2, TFoot };
