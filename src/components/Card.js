function Card1(props) {
  return (
    <div id="card" className="text-center rounded-sm bg-white p-4 mx-8 mb-8 w-64 h-80">
      <div className="card-img mt-6 flex justify-center">
        <img src={props.img} alt="img" />
      </div>
      <div className="card-title my-4 text-2xl font-bold">{props.title}</div>
      <div className="card-body m-4">
        <p className="text-gray-400 text-lg">{props.body}</p>
      </div>
    </div>
  );
}
function Card2(props) {
  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <div id="card" className="rounded-md bg-white p-2 m-5 w-350 h-350">
      <div className="card-img relative flex justify-center">
        <img className="rounded-md" src={props.img} alt="img" />
        <p className="absolute top-3 rounded-bl-md rounded-tl-md right-0 px-3 py-1 bg-white text-sm">{props.capacity}</p>
      </div>
      <div className="card-title my-4 font-medium text-xl">{props.title}</div>
      <div className="card-body flex justify-between text-lg">
        <p className="text-yellow-400 font-black">{rupiah(props.price)}</p>
        <p className="text-gray-400 font-semibold">{props.country}</p>
      </div>
    </div>
  );
}

export { Card1, Card2 };
