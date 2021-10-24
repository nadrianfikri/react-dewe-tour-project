import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import datas from '../assets/destination.json';

function DetailTrip() {
  const { id } = useParams();

  let index = id - 1;
  const [detail] = useState(datas[index]);
  const [count, setCount] = useState(1);

  const increment = () => {
    // set new value to state
    setCount((prevState) => prevState + 1);
  };

  const decrement = () => {
    // set new value to state
    setCount(count <= 0 ? count : count - 1);
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
    }).format(number);
  };
  console.log(detail);

  return (
    <div className="pt-36 bg-gray-100">
      <Navbar bg="bg-navbar" class="none" />
      <main className="px-auto lg:px-36">
        <section className="mx-auto mb-10 w-auto lg:w-max px-2">
          <div className=" px-4 pb-6 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">{detail.name}</h1>
            <p className="text-2xl text-gray-400">{detail.country}</p>
          </div>
          <div className="pb-2">
            <img className="rounded-lg" src={`/assets/images/details/${detail.detailImage[0]}`} alt="img" />
          </div>

          <div className="flex overflow-auto justify-between gap-2">
            <div className="flex-none w-1/2 md:w-auto">
              <img src={`/assets/images/details/${detail.detailImage[1]}`} alt="img" />
            </div>
            <div className="flex-none w-1/2 md:w-auto">
              <img src={`/assets/images/details/${detail.detailImage[2]}`} alt="img" />
            </div>
            <a href="/" className="flex-none w-1/2 md:w-auto relative ">
              <img src={`/assets/images/details/${detail.detailImage[3]}`} alt="img" />
              <p className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white text-2xl font-bold">+5</p>
            </a>
          </div>
        </section>

        <Article>
          <Header title="Information Trip" />
          <div className="flex overflow-auto justify-between space-x-8">
            <ArticleBody title="Accomodation" icon="/assets/icons/hotel 1.svg" detail={detail.accomodation} />
            <ArticleBody title="Transportation" icon="/assets/icons/plane 1.svg" detail={detail.transportation} />
            <ArticleBody title="Eat" icon="/assets/icons/meal 1.svg" detail={detail.eat} />
            <ArticleBody title="Duration" icon="/assets/icons/time 1.svg" detail={detail.duration} />
            <ArticleBody title="Date Trip" icon="/assets/icons/calendar 1.svg" detail={detail.date} />
          </div>
        </Article>
        <Article>
          <Header title="Description" />
          <ArticleDesc desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
        </Article>

        <Article>
          <form action="/">
            <div className="form-group border-b-2 flex justify-between items-center font-bold text-2xl">
              <label className="flex-1 text-yellow-400" htmlFor="qty">
                IDR. {rupiah(detail.price)}
                <span className="text-black"> / Person</span>
              </label>
              <div className="flex flex-0 gap-2">
                <button type="button" onClick={decrement}>
                  <img src="/assets/icons/Minus.svg" alt="icon" />
                </button>
                <input type="number" name="qty" value={count} readonly className="py-4 focus:outline-none bg-transparent text-center font-bold w-10 text-lg" />
                <button type="button" onClick={increment}>
                  <img src="/assets/icons/Plus.svg" alt="icon" />
                </button>
              </div>
            </div>
            <div className="form-group border-b-2 text-yellow-400 flex justify-between items-center font-bold text-2xl">
              <label className="text-black" htmlFor="total">
                Total:
              </label>
              <p className="py-4 focus:outline-none bg-transparent text-right font-bold ">IDR. {rupiah(detail.price * count)}</p>
              <input type="number" hidden name="total" value={detail.price * count} />
            </div>
            <div className="form-group m-2 flex justify-end font-bold text-2xl">
              <input type="submit" value="BOOK NOW" className=" mt-4 py-2 px-10 bg-yellow-400 text-right text-white font-bold text-lg rounded-md hover:bg-yellow-500 cursor-pointer " />
            </div>
          </form>
        </Article>
      </main>
      <Footer />
    </div>
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
      <div className="flex gap-3 space-y-2 text-lg font-bold">
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
