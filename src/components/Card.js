function Card(props) {
  return (
    <div id="card" className="text-center rounded-sm bg-white p-6 mx-8 mb-8 w-64 h-80">
      <div className="card-img">
        <img src={props.img} alt="img" />
      </div>
      <div className="card-title text-2xl font-bold">{props.title}</div>
      <div className="card-body">
        <p className="text-gray-400 text-lg">{props.body}</p>
      </div>
    </div>
  );
}

export default Card;
