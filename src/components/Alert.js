export default function Alert(props) {
  return (
    <div className={`text-${props.variant}-700 bg-${props.variant}-200 fixed top-16 left-0 w-full min-w-max h-16  flex justify-center items-center gap-6 p-2 text-center  rounded-md z-50`}>
      <p className=" text-center">{props.message}</p>
      <button onClick={props.onClick} className="absolute right-4  text-3xl text-gray-400 close-modal z-50 transform rotate-45">
        +
      </button>
    </div>
  );
}
