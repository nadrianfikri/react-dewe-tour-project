import React, { useState } from 'react';
const styles = {
  transition: 'all 0.3s ease-out',
};

function Dropdown(props) {
  const [state, setState] = useState({
    opacity: 0,
    scale: 1,
  });

  const onScale = () => {
    setState({
      scale: state.scale > 1 ? 1 : 1.3,
    });
  };

  return (
    <div id="dropdown" className="absolute text-black top-16 right-6 bg-white w-max h-max rounded-lg transition-all duration-300" style={props.styles}>
      <span className="absolute -top-2 right-2 bg-white w-8 h-8 transform rotate-45"></span>
      {props.children}
      <div className="flex py-4 px-10 gap-3 items-center border-t-2 space-y-2 border-gray-400 hover:bg-gray-100 transition-all duration-300 rounded-lg">
        <img src="/assets/icons/logout.svg" alt="" />
        <button onClick={props.click} type="button" className="text-lg font-bold">
          Logout
        </button>
      </div>
    </div>
  );
}
export const DropdownItem = ({ children }) => {
  return <div className="relative flex py-4 px-10 gap-3 items-center hover:bg-gray-100 transition-all duration-300 rounded-lg z-50">{children}</div>;
};

export default Dropdown;
