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
        <th>{props.col1}</th>
        <th>{props.col2}</th>
        <th>{props.col3}</th>
        <th>{props.col4}</th>
      </tr>
    </thead>
  );
}
export { Table, THeader, TBody, TData, TFoot };
