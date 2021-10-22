import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DetailTrip() {
  return (
    <div className="pt-36 bg-gray-100">
      <Navbar bg="bg-navbar" class="none" />
      <main className="px-auto lg:px-36">
        <section className="mx-auto mb-10 w-auto lg:w-max px-2">
          <div className=" px-4 pb-6 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">6D/4N Fun Tassie Vacation + Sydney</h1>
            <p className="text-2xl text-gray-400">Australia</p>
          </div>
          <div className="pb-2">
            <img className="rounded-lg" src="/assets/images/details/detailAUS-1.png" alt="img" />
          </div>

          <div className="flex overflow-auto justify-between gap-2">
            <div className="flex-none w-1/2 md:w-auto">
              <img src="/assets/images/details/detailAUS-2.png" alt="img" />
            </div>
            <div className="flex-none w-1/2 md:w-auto">
              <img src="/assets/images/details/detailAUS-3.png" alt="img" />
            </div>
            <a href="/" className="flex-none w-1/2 md:w-auto relative ">
              <img src="/assets/images/details/detailAUS-4.png" alt="img" />
              <p className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white text-2xl font-bold">+5</p>
            </a>
          </div>
        </section>

        <Article>
          <Header title="Information Trip" />
          <div className="flex overflow-auto justify-between space-x-8">
            <ArticleBody title="Accomodation" icon="/assets/icons/hotel 1.svg" detail="Hotel 4 Night" />
            <ArticleBody title="Transportation" icon="/assets/icons/plane 1.svg" detail="Qatar Airways" />
            <ArticleBody title="Eat" icon="/assets/icons/meal 1.svg" detail="Include as Itinenary" />
            <ArticleBody title="Duration" icon="/assets/icons/time 1.svg" detail="6 Day 4 Night" />
            <ArticleBody title="Date Trip" icon="/assets/icons/calendar 1.svg" detail="26 August 2020" />
          </div>
        </Article>
        <Article>
          <Header title="Description" />
          <ArticleDesc desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
        </Article>
      </main>
      <Footer />
    </div>
  );
}
function Article({ children }) {
  return <article className="flex flex-col gap-3 p-4 overflow-auto">{children}</article>;
}
function Header(props) {
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
