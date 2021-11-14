import img1 from '../assets/images/palm-2.png';
import img2 from '../assets/images/hibiscus 2.png';

function ModalTitle(props) {
  const handleClose = () => {
    let modals = document.querySelectorAll('.modal');

    for (const modal of modals) {
      modal.classList.add('hidden');
    }
  };

  return (
    <div className={`modal-title my-10 ${props.margin}`}>
      <h1 className="text-center font-bold text-4xl">{props.title}</h1>
      <button onClick={props.onClick} className={`absolute top-12 right-10 text-2xl text-gray-400 close-modal z-50 transform rotate-45 ${props.top}`}>
        +
      </button>
      <img src={img1} alt="img" className="absolute top-0 left-0" />
      <img src={img2} alt="img" className="absolute top-0 right-0" />
    </div>
  );
}

function ModalBody({ children }) {
  return <div className="modal-body ">{children}</div>;
}

function Modal(props) {
  return <div className={`relative overflow-auto bg-white rounded-lg shadow-xl p-8 m-4 ${props.width}`}>{props.children}</div>;
}
function Overlay(props) {
  return (
    <div id="modal" className={`modal overflow-auto h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ${props.margin}`}>
      {props.children}
    </div>
  );
}

export { Modal, ModalTitle, ModalBody, Overlay };
