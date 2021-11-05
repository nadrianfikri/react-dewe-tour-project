export default function Alert(props) {
  return (
    <div className={`text-${props.variant}-700 bg-${props.variant}-200 relative flex justify-center items-center p-2  rounded-md`}>
      <button onClick={props.onClick} className="absolute top-1 right-2 text-2xl text-gray-400 close-modal z-50 transform rotate-45">
        +
      </button>
      <p>{props.message}</p>
    </div>
  );
}
