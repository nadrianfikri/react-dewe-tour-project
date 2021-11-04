export default function Alert(props) {
  return (
    <div className={`text-${props.variant}-700 bg-${props.variant}-200 flex justify-center items-center p-2  rounded-md`}>
      <p>{props.message}</p>
    </div>
  );
}
