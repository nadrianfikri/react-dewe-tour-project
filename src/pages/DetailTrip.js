import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function DetailTrip() {
  return (
    <div className="pt-36 bg-gray-100">
      <main className="mx-auto w-auto lg:w-max px-2">
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
          <div className="flex-none w-1/2 md:w-auto relative ">
            <img src="/assets/images/details/detailAUS-4.png" alt="img" />
            <p className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white text-2xl font-bold">+5</p>
          </div>
        </div>
      </main>
      <Navbar bg="bg-navbar" class="none" />
      <Footer />
    </div>
  );
}

export default DetailTrip;
