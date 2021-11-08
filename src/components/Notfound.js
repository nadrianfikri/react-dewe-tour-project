import { useHistory } from 'react-router';

function Notfound() {
  const history = useHistory();

  return (
    <div className=" h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-5xl font-black">
        <span className="bg-yellow-400 mr-6">404</span> PAGE NOT FOUND
      </h1>
      <button type="button" className="bg-yellow-400 px-8 py-2 text-2xl rounded-lg" onClick={() => history.goBack()}>
        Go Back
      </button>
    </div>
  );
}

export default Notfound;
