import { Card1, Card2 } from '../../components/Card';
import dataDestinations from '../../assets/destination.json';
import serveContent from '../../assets/serveContent.json';

function Content() {
  return (
    <div id="content" className="flex flex-col justify-center items-center pb-10">
      <div id="service" className="flex flex-wrap justify-center  transform -translate-y-8  px-4">
        {serveContent.map((data) => (
          <Card1 title={data.title} body={data.description} img={data.icon} />
        ))}
      </div>

      <div id="group-tour">
        <div className="text-5xl text-center my-10 mb-20">
          <h1>Group Tour</h1>
        </div>
        <div className="group-content container flex justify-center items-center flex-wrap">
          {dataDestinations.map((data) => (
            <Card2 id={data.id} title={data.name} img={data.thumbnailImage} capacity={data.capacity} price={data.price} country={data.country} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
