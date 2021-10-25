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
    <div className="modal-title my-10">
      <h1 className="text-center font-bold text-4xl">{props.title}</h1>
      <button onClick={handleClose} className="absolute top-12 right-10 text-2xl text-gray-400 close-modal z-50 transform rotate-45">
        +
      </button>
      <img src={img1} alt="img" className="absolute top-0 left-0" />
      <img src={img2} alt="img" className="absolute top-0 right-0" />
    </div>
  );
}

function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
}

function Modal(props) {
  return (
    <div id={props.id} className="modal hidden overflow-auto h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-all duration-500">
      <div className={`relative overflow-auto bg-white rounded-lg shadow-xl  w-10/12 md:w-1/3 px-8 py-4 md:w-${props.w}`}>{props.children}</div>
    </div>
  );
}

export { Modal, ModalTitle, ModalBody };
