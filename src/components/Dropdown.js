function Dropdown(props) {
  return (
    <div id="dropdown" className="absolute hidden text-black top-15 right-8 bg-white w-max h-max  rounded-lg">
      {props.children}
      <div className="flex py-4 px-10 gap-3 items-center border-t-2 space-y-2 border-gray-400">
        <img src="/assets/icons/logout.svg" alt="" />
        <button onClick={props.click} type="button" className="text-lg font-bold">
          Logout
        </button>
      </div>
    </div>
  );
}
export const DropdownItem = ({ children }) => {
  return <div className="flex py-4 px-10 gap-3 items-center">{children}</div>;
};

export default Dropdown;
