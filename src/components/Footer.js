import image from '../assets/images/leaf.png';
function Footer() {
  return (
    <div id="footer" className="relative text-center bg-yellow-400  text-white text-md md:text-lg py-4 md:py-6 mt-20">
      <p className="w-3/4 md:w-full pl-10 md:pl-0">Copyright @ 2021 Dewe Tour - Fikri Nadrian All Rights reserved</p>
      <img className="absolute bottom-0 right-0 md:h-auto h-full" src={image} alt="palm" />
    </div>
  );
}

export default Footer;
