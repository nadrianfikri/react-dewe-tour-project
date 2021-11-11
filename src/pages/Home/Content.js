import { Card1 } from '../../components/Card';
import serveContent from '../../assets/serveContent.json';

function Content(props) {
  return (
    <div id="content" className="flex flex-col justify-center items-center pb-10">
      <div id="service" className="flex flex-wrap justify-center  transform -translate-y-8  px-4">
        {serveContent.map((data, index) => (
          <Card1 key={index} id={data.id} title={data.title} body={data.description} img={data.icon} />
        ))}
      </div>

      <div id="group-tour">
        <div className="text-5xl text-center my-10 mb-20">
          <h1>Group Tour</h1>
        </div>
        <div className="group-content container flex justify-center items-center flex-wrap">{props.children}</div>
      </div>
    </div>
  );
}

export default Content;
