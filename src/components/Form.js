function Form(props) {
  return (
    <form action={props.action} className="space-y-6 ">
      {props.children}
    </form>
  );
}
function FormGroup(props) {
  return (
    <div className="form-group space-y-2 flex flex-col">
      <label htmlFor={props.labelFor} className="font-bold text-lg">
        {props.labelName}
      </label>
      <input type={props.typeInput} name={props.inputName} className="focus:outline-none p-2 bg-gray-200 rounded-md" />
    </div>
  );
}
function InputSubmit(props) {
  return (
    <div className="form-group space-y-2 flex flex-col ">
      <input value={props.value} type="submit" name="submit" className="font-bold p-2 bg-yellow-400 hover:bg-yellow-500 text-white text-lg rounded-md cursor-pointer" />
    </div>
  );
}
function DirectText(props) {
  return (
    <div className="form-group space-y-2 flex flex-col ">
      <p className="text-center text-gray-400">
        {props.desc}
        <a href={props.route} className="font-bold">
          {props.textLink}
        </a>
      </p>
    </div>
  );
}

export { Form, FormGroup, InputSubmit, DirectText };
