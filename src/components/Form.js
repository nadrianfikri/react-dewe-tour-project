function Form(props) {
  return (
    <form action={props.action} method={props.method} enctype={props.enctype} className="space-y-6 ">
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
      <input type={props.typeInput} id={props.id} name={props.name} value={props.value} className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300" />
    </div>
  );
}
function DoubleInput(props) {
  return (
    <div className="form-group space-y-2 flex flex-col">
      <label htmlFor={props.labelFor} className="font-bold text-lg">
        {props.labelName}
      </label>
      <div className="flex items-center gap-4">
        <input type={props.typeInput} name="day" className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300" />
        <p className="font-bold text-lg pr-6">Day</p>
        <input type={props.typeInput} name="night" className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300" />
        <p className="font-bold text-lg">Night</p>
      </div>
    </div>
  );
}
function Select(props) {
  return (
    <div className="form-group space-y-2 flex flex-col">
      <label htmlFor={props.labelFor} className="font-bold text-lg">
        {props.labelName}
      </label>
      <select type={props.typeInput} id={props.id} name={props.name} className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300">
        <option selected disabled>
          {' '}
        </option>
        <option value="Indonesia">Indonesia</option>
        <option value="Australia">Australia</option>
        <option value="Japan">Japan</option>
        <option value="South Korea"> South Korea</option>
      </select>
    </div>
  );
}

function TextArea(props) {
  return (
    <div className="form-group space-y-2 flex flex-col">
      <label htmlFor={props.labelFor} className="font-bold text-lg">
        {props.labelName}
      </label>
      <textarea rows="4" cols="50" id={props.id} name={props.name} className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300"></textarea>
    </div>
  );
}
function InputSubmit(props) {
  return (
    // flex-col
    <div className="form-group space-y-2 text-center">
      <input value={props.value} type="submit" name="submit" className={`font-bold p-2 bg-yellow-400 hover:bg-yellow-500 text-white text-lg rounded-md cursor-pointer px-20 w-${props.w}`} />
    </div>
  );
}
function InputImage(props) {
  return (
    <div className="form-group space-y-2 pb-20">
      <label htmlFor={props.labelFor} className="font-bold text-lg">
        {props.labelName}
      </label>
      <label htmlFor={props.labelFor} className="w-max text-yellow-500 bg-gray-200 rounded-md text-lg flex gap-10 cursor-pointer p-2 border-2 border-gray-300">
        Attach Here <img src="/assets/icons/attach.svg" alt="icon" />
      </label>
      <input type="file" hidden id="image" name="image" />
    </div>
  );
}
function DirectText(props) {
  return (
    <div className="form-group space-y-2 flex flex-col ">
      <p className="text-center text-gray-400">
        {props.desc}
        <button type="button" onClick={props.click} className="font-bold">
          {props.textLink}
        </button>
      </p>
    </div>
  );
}

export { Form, FormGroup, InputSubmit, InputImage, DirectText, TextArea, Select, DoubleInput };
