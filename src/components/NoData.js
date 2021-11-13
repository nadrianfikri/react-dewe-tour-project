export default function NoData(props) {
  return (
    <div className=" flex flex-col items-center text-center text-2xl">
      <p className="text-gray-500 border-b border-gray-200 transform translate-y-20">{props.desc}</p>
      <img className="lg:w-3/4 rounded-xl" src="/assets/images/dataNotFound.png" alt="notfound" />
    </div>
  );
}
