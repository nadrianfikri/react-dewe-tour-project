function Search(props) {
  return (
    <div className="pt-10">
      <form onSubmit={props.onSubmit} className="flex flex-col space-y-4">
        <label className="text-md md:text-lg" htmlFor="seacrhBar">
          Find great places to holiday
        </label>
        <div className=" flex flex-row">
          <input onChange={props.onChange} className="flex-1 px-4 py-2 rounded-md rounded-tr-none rounded-br-none focus:border-transparent outline-none text-gray-600" type="text" />

          <a onClick={props.onClick} className="text-white font-bold bg-yellow-400 px-4 md:px-8 py-2 rounded-md rounded-tl-none rounded-bl-none hover:bg-yellow-500 transition duration-400 ease-out cursor-pointer" href="#group-tour">
            Search
          </a>
        </div>
      </form>
    </div>
  );
}

export default Search;
