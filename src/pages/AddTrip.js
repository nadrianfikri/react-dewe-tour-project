import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Form, FormGroup, TextArea, InputSubmit, InputImage, Select, DoubleInput } from '../components/Form';

import { useHistory } from 'react-router-dom';

function AddTrip() {
  const history = useHistory();

  const [state, setState] = useState({
    id: '',
    name: '',
    capacity: '',
    price: '',
    country: '',
    thumbnailImage: '',
    detailImage: '',
    accomodation: '',
    transportation: '',
    eat: '',
    duration: {
      day: '',
      night: '',
    },
    date: '',
    description: '',
  });

  const handleOnChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const dataLocalStorage = JSON.parse(localStorage.getItem('tour_data'));

    const data = {
      id: dataLocalStorage.length + 1,
      name: state.title,
      capacity: `${state.quota}/15`,
      price: state.price,
      country: state.country,
      thumbnailImage: state.image,
      detailImage: ['detailAUS-1.png', 'detailAUS-2.png', 'detailAUS-3.png', 'detailAUS-4.png'],
      accomodation: state.accomodation,
      transportation: state.transportation,
      eat: state.eat,
      duration: {
        day: state.day,
        night: state.night,
      },
      date: state.date,
      description: state.desc,
    };

    dataLocalStorage.push(data);
    localStorage.setItem('tour_data', JSON.stringify(dataLocalStorage));

    console.log(dataLocalStorage);
    history.push('/');
  };
  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />

      <main className="container mx-auto pb-36 ">
        <div className="pb-10">
          <h1 className="text-4xl font-bold">Income Trip</h1>
        </div>
        <div className="overflow-auto">
          <Form action="/" submit={handleOnSubmit}>
            <FormGroup onChange={handleOnChange} labelFor="title" labelName="Title Trip" typeInput="text" name="title" id="title" />
            <Select labelFor="country" labelName="Country" typeInput="text" name="country" id="country" />
            <FormGroup onChange={handleOnChange} labelFor="accomodation" labelName="Accomodation" typeInput="text" name="accomodation" id="accomodation" />
            <FormGroup onChange={handleOnChange} labelFor="transportation" labelName="Transportation" typeInput="text" name="transportation" id="transportation" />
            <FormGroup onChange={handleOnChange} labelFor="eat" labelName="Eat" typeInput="text" name="eat" id="eat" />
            <DoubleInput onChange={handleOnChange} labelFor="duration" labelName="Duration" typeInput="number" />
            <FormGroup onChange={handleOnChange} labelFor="date" labelName="Date Trip" typeInput="date" name="date" id="date" />
            <FormGroup onChange={handleOnChange} labelFor="price" labelName="Price" typeInput="number" name="price" id="price" />
            <FormGroup onChange={handleOnChange} labelFor="quota" labelName="Quota" typeInput="number" name="quota" id="quota" />
            <TextArea onChange={handleOnChange} labelFor="desc" labelName="Description" name="desc" id="desc" />
            <InputImage onChange={handleOnChange} labelFor="image" labelName="Image" />
            <InputSubmit value="Add Trip" />
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddTrip;
