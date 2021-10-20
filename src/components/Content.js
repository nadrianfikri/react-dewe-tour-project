import Card from './Card';
import dataDestinations from '../assets/destination.json';

function Content() {
  return (
    <div id="content" className="flex flex-col justify-center items-center">
      <div id="service" className="flex flex-wrap justify-center  transform -translate-y-8 px-4">
        <Card title="Best Price Guarantee" body="A small river named Duren flows by es" />
        <Card title="Best Price" body="A small river named Duren flows by es" />
        <Card title="Best Price" body="A small river named Duren flows by es" />
        <Card title="Best Price" body="A small river named Duren flows by es" />
      </div>

      <div id="group-tour">
        <div className="text-5xl text-center my-10 mb-20">
          <h1>Group Tour</h1>
        </div>
        <div className="group-content container flex justify-center items-center flex-wrap">
          {dataDestinations.map((data) => (
            <Card title={data.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
