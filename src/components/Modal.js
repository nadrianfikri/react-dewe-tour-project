import img1 from '../assets/images/palm-2.png';
import img2 from '../assets/images/hibiscus 2.png';

function ModalTitle(props) {
  return (
    <div className="modal-title my-10">
      <h1 className="text-center font-bold text-4xl">{props.title}</h1>
      <button class="absolute top-12 right-10 text-2xl text-gray-400 close-modal z-50">x</button>
      <img src={img1} alt="img" className="absolute top-0 left-0" />
      <img src={img2} alt="img" className="absolute top-0 right-0" />
    </div>
  );
}

function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
}

function Modal({ children }) {
  return (
    <div className="modal overflow-auto h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative overflow-auto bg-white rounded-lg shadow-xl w-10/12 md:w-1/3 px-8 py-4 ">{children}</div>
    </div>
  );
}

export { Modal, ModalTitle, ModalBody };
