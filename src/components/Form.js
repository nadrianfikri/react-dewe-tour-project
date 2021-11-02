function Form(props) {
  return (
    <form action={props.action} method={props.method} encType={props.enctype} className="space-y-6 " onSubmit={props.submit}>
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
      <input onChange={props.onChange} type={props.typeInput} id={props.id} name={props.name} value={props.value} className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300" required />
    </div>
  );
}
function DoubleInput(props) {
  return (
    <div className="form-group overflow-auto  space-y-2 flex flex-col">
      <label htmlFor={props.labelFor} className="font-bold text-lg">
        {props.labelName}
      </label>
      <div className="flex items-center gap-4">
        <input onChange={props.onChange} type={props.typeInput} name="day" className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300" />
        <p className="font-bold text-lg pr-6">Day</p>
        <input onChange={props.onChange} type={props.typeInput} name="night" className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300" />
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
      <select onChange={props.onChange} type={props.typeInput} id={props.id} name={props.name} className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300">
        {props.children}
      </select>
    </div>
  );
}

function Option(props) {
  return (
    <>
      <option onChange={props.onChange} value={props.value}>
        {props.field}
      </option>
    </>
  );
}

function TextArea(props) {
  return (
    <div className="form-group space-y-2 flex flex-col">
      <label htmlFor={props.labelFor} className="font-bold text-lg">
        {props.labelName}
      </label>
      <textarea onChange={props.onChange} rows="4" cols="50" id={props.id} name={props.name} className="focus:outline-none focus:shadow-md p-2 bg-gray-200 rounded-md border-2 border-gray-300"></textarea>
    </div>
  );
}
function InputSubmit(props) {
  return (
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
      <input onChange={props.onChange} type="file" hidden id="image" name="image" />
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

export { Form, FormGroup, InputSubmit, InputImage, DirectText, TextArea, Select, Option, DoubleInput };
