import Content from './components/Content';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

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
