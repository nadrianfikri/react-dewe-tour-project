import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import SkeletonHome from '../components/SkeletonHome';
import { Overlay } from '../components/Modal';

import { Transition } from '@headlessui/react';
import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { AuthContext } from '../context/authContext';
import { API } from '../config/api';

function DetailTrip() {
  let history = useHistory();
  const { id } = useParams();
  const [state] = useContext(AuthContext);

  // store data
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [count, setCount] = useState(1);
  const [detailTrip, setDetailTrip] = useState(null);

  // create func get data detail trip
  const getDetail = async () => {
    try {
      const response = await API.get(`/trip/${id}`);
      const data = response.data.data;
      data.dateTrip = new Date(data.dateTrip).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

      setDetailTrip(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const form = {
        qty: count,
      };

      // convert form data to string
      const body = JSON.stringify(form);

      // insert data user for login process
      await API.post(`/transaction/${detailTrip.id}`, body, config);

      const alert = (
        <Alert
          variant="green"
          message="Transaction Success. Let's go to Payment!!"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);

      setTimeout(() => {
        history.push('/payment');
        setMessage(null);
      }, 2000);
    } catch (error) {
      const alert = (
        <Alert
          variant="red"
          message="Transaction Failed"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);
      console.log(error);
    }
  };

  const increment = () => {
    // set new value to state
    setCount(count === detailTrip.quotaFilled ? count : count + 1);
  };

  const decrement = () => {
    // set new value to state
    setCount(count <= 1 ? count : count - 1);
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
    }).format(number);
  };

  // call function with useEffect
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <>
      <div className="pt-36 bg-gray-100 ">
        <Navbar class="bg-navbar" />

        {detailTrip === null ? (
          <SkeletonHome />
        ) : (
          <>
            <main className="px-auto lg:px-36">
              <section className="mx-auto mb-10 w-auto px-2 ">
                <div className=" px-4 pb-6 space-y-4 ">
                  <h1 className="text-4xl md:text-5xl font-bold">{detailTrip?.title}</h1>
                  <p className="text-2xl text-gray-400">{detailTrip?.country?.name}</p>
                </div>
                <div className="pb-2 ">
                  <img className=" rounded-lg h-96 w-full object-cover object-center" src={detailTrip?.images[0]} alt="img" />
                </div>

                {/* images detail */}
                <div className="flex overflow-auto justify-between  gap-2">
                  <div className=" lg:flex-auto flex-none md:w-auto h-48 rounded-lg ">
                    <img className=" lg:h-auto max-h-48 w-full object-center object-cover rounded-lg" src={detailTrip?.images[1]} alt="img" />
                  </div>
                  <div className="flex-none lg:flex-auto   md:w-auto">
                    <img className=" lg:h-auto max-h-48 w-full object-center object-cover rounded-lg" src={detailTrip?.images[2]} alt="img" />
                  </div>
                  <button onClick={() => setIsOpen(true)} type="button" className="flex-none md:flex-auto sm:w-auto relative ">
                    <span className="absolute top-0 right-0 w-full h-full bg-gray-800 opacity-30 z-10"></span>

                    <img className=" lg:h-auto max-h-48 w-full  object-center object-cover rounded-lg" src={detailTrip?.images[3]} alt="img" />
                    <p className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white text-2xl font-bold">More +</p>
                  </button>
                </div>
              </section>

              <Article>
                <Header title="Information Trip" />
                <div className="flex overflow-auto justify-between space-x-8">
                  <ArticleBody title="Accomodation" icon="/assets/icons/hotel 1.svg" detail={detailTrip?.accomodation} />
                  <ArticleBody title="Transportation" icon="/assets/icons/plane 1.svg" detail={detailTrip?.transportation} />
                  <ArticleBody title="Eat" icon="/assets/icons/meal 1.svg" detail={detailTrip?.eat} />
                  <ArticleBody title="Duration" icon="/assets/icons/time 1.svg" detail={`${detailTrip?.day} Day ${detailTrip?.night} Night`} />
                  <ArticleBody title="Date Trip" icon="/assets/icons/calendar 1.svg" detail={detailTrip?.dateTrip} />
                </div>
              </Article>
              <Article>
                <Header title="Description" />
                <ArticleDesc desc={detailTrip.description} />
              </Article>

              <Article>
                <form action="/" method="post" onSubmit={handleOnSubmit}>
                  <div className="form-group border-b-2 flex justify-between items-center font-bold text-2xl">
                    <label className="flex-1 text-yellow-400" htmlFor="qty">
                      IDR. {rupiah(detailTrip?.price)}
                      <span className="text-black"> / Person</span>
                    </label>
                    <div className="flex flex-0 gap-2">
                      <button type="button" onClick={decrement}>
                        <img src="/assets/icons/Minus.svg" alt="icon" />
                      </button>
                      <input type="number" name="qty" value={count} readOnly className="py-4 focus:outline-none bg-transparent text-center font-bold w-10 text-lg" />
                      <button type="button" onClick={increment}>
                        <img src="/assets/icons/Plus.svg" alt="icon" />
                      </button>
                    </div>
                  </div>
                  <div className="form-group border-b-2 text-yellow-400 flex justify-between items-center font-bold text-2xl">
                    <label className="text-black" htmlFor="total">
                      Total:
                    </label>
                    <p className="py-4 focus:outline-none bg-transparent text-right font-bold ">IDR. {rupiah(detailTrip?.price * count)}</p>
                    <input type="number" hidden name="total" value={detailTrip?.price * count} />
                  </div>
                  <br />
                  {message && message}
                  <div className="form-group m-2 flex justify-end font-bold text-2xl">
                    {/* conditional btn */}
                    {state.isLogin && state.user.role === 'user' ? (
                      <input type="submit" value="BOOK NOW" className=" mt-4 py-2 px-10 bg-yellow-400 text-right text-white font-bold text-lg rounded-md hover:bg-yellow-500 cursor-pointer " />
                    ) : (
                      <input disabled type="submit" value="BOOK NOW" className=" mt-4 py-2 px-10 opacity-50 bg-gray-400 text-right text-white font-bold text-lg rounded-md " />
                    )}
                  </div>
                </form>
              </Article>
            </main>
            <Footer />
          </>
        )}
      </div>
      {/* Modal image */}
      <Transition show={isOpen}>
        <Overlay>
          <Transition.Child
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-0"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-0"
          >
            <div className=" relative  p-10 md:w-1080 w-auto flex gap-4 justify-center items-center overflow-auto">
              <button onClick={() => setIsOpen(false)} type="button" className="absolute top-0 right-3 w-7 h-7 text-white text-4xl rounded-full hover:text-red-500 transform rotate-45 flex justify-center items-center">
                +
              </button>
              <div className="flex gap-6 overflow-auto">
                {detailTrip?.images.map((data, index) => (
                  <img key={index} className="max-h-96 md:max-w-xl object-cover" src={data} alt="detail" />
                ))}
              </div>
            </div>
          </Transition.Child>
        </Overlay>
      </Transition>
    </>
  );
}

function Article({ children }) {
  return <article className="flex flex-col gap-3 p-4 overflow-auto">{children}</article>;
}
export function Header(props) {
  return <header className="text-lg font-extrabold">{props.title}</header>;
}
function ArticleBody(props) {
  return (
    <div className="flex-none">
      <p className="text-xs text-gray-400">{props.title}</p>
      <div className="flex gap-3 space-y-2 font-bold">
        <img src={props.icon} alt="img" />
        <h2 className="pb-2">{props.detail}</h2>
      </div>
    </div>
  );
}
function ArticleDesc(props) {
  return (
    <div className="flex-auto text-sm text-justify  text-gray-400">
      <p>{props.desc}</p>
    </div>
  );
}

export default DetailTrip;
