import image from '../assets/images/leaf.png';
function Footer() {
  return (
    <div id="footer" className=" relative text-center bg-yellow-400 text-white text-lg py-6 mt-20">
      <p>Copyright @ 2020 Dewe Tour - Fikri Nadrian All Rights reserved</p>
      <img className="absolute bottom-0 right-0" src={image} alt="palm" />
    </div>
  );
}

export default Footer;
