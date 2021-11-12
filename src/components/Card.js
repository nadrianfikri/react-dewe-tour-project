import { Link } from 'react-router-dom';
function Card1(props) {
  return (
    <div id={props.id} className="text-center rounded-sm bg-white p-4 mx-8 mb-8 w-64 h-80">
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
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <div id="card" className={`${props.hidden}  rounded-md bg-white p-2 m-5 w-350 h-350`}>
      <div className="card-img relative flex justify-center">
        <img className="rounded-md  h-60 w-1080 object-center object-cover" src={props.img} alt="mainimage" />
        <p className="absolute top-3 rounded-bl-md rounded-tl-md right-0 px-3 py-1 bg-white text-sm">
          {props.quotaFill}/{props.quota}
        </p>
      </div>
      <div className="card-title my-4 font-medium text-xl overflow-hidden overflow-ellipsis">
        <Link to={`/detail-trip/${props.id}`} className="whitespace-nowrap ">
          {props.title}
        </Link>
      </div>
      <div className="card-body flex justify-between text-lg">
        <p className="text-yellow-400 font-black">
          <span className="pr-2">IDR.</span>
          {rupiah(props.price)}
        </p>
        <p className="text-gray-400 font-semibold">{props.country}</p>
      </div>
    </div>
  );
}

export { Card1, Card2 };
