import Hero from './Home/Hero';
import Content from './Home/Content';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Hero />
      <Content />
      <Footer />
    </div>
  );
}

export default Home;
