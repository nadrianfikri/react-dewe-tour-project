import './Hero.css';

function Hero(props) {
  return (
    <div id="hero-section" className="relative bg-hero bg-no-repeat bg-cover bg-center pb-28 text-white">
      <div className="container  relative z-10 mx-auto pt-36 ">
        <h1 className="text-5xl md:text-6xl font-bold">Explore</h1>
        <h1 className=" text-5xl md:text-6xl font-light">your amazing city together</h1>
        {props.children}
      </div>
    </div>
  );
}

export default Hero;
