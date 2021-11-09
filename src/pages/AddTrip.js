import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alert';

import { Form, FormGroup, TextArea, InputSubmit, InputImage, Select, Option, DoubleInput } from '../components/Form';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../config/api';

function AddTrip() {
  let history = useHistory();

  const title = 'Admin Add Trip';
  document.title = `DeweTour | ${title} `;

  // store data
  const [country, setCountry] = useState([]);
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: '',
    country: '',
    accomodation: '',
    transportation: '',
    eat: '',
    day: '',
    night: '',
    dateTrip: '',
    price: '',
    quota: '',
    description: '',
    images: [],
  });

  // Fetching country data
  const getCountry = async () => {
    try {
      const response = await API.get('/country');
      setCountry(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  // handle change data on form
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      const fileList = Array.from(e.target.files);

      const mappedFiles = fileList.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      }));

      setPreview(mappedFiles);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // Create store data with FormData as object here ...
      const formData = new FormData();

      formData.set('title', form.title);
      formData.set('country_id', form.country);
      formData.set('accomodation', form.accomodation);
      formData.set('transportation', form.transportation);
      formData.set('eat', form.eat);
      formData.set('day', form.day);
      formData.set('night', form.night);
      formData.set('dateTrip', form.dateTrip);
      formData.set('price', form.price);
      formData.set('quota', form.quota);
      formData.set('description', form.description);

      // iterate file bcs formData decline fileList
      for (let i = 0; i < form.images.length; i++) {
        formData.append('images', form.images[i]);
      }

      // Insert product data here ...
      await API.post('/trip', formData, config);

      const alert = (
        <Alert
          variant="green"
          message="Add new data is successfull"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);

      setTimeout(() => {
        history.push('/income-trip');
        setMessage(null);
      }, 1500);
    } catch (error) {
      const alert = (
        <Alert
          variant="red"
          message="Add data failed"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />

      <main className="container mx-auto pb-36 ">
        <div className="pb-10">
          <h1 className="text-4xl font-bold">Income Trip</h1>
        </div>
        <div className="overflow-auto">
          <Form submit={handleOnSubmit} enctype="multipart/form-data">
            <FormGroup onChange={handleOnChange} labelFor="title" labelName="Title Trip" typeInput="text" name="title" id="title" />
            <Select onChange={handleOnChange} labelFor="country" labelName="Country" name="country" id="country">
              <option value="DEFAULT" disabled>
                {' '}
              </option>
              {country.map((data, index) => {
                return <Option key={index} value={data.id} field={data.name} />;
              })}
            </Select>
            <FormGroup onChange={handleOnChange} labelFor="accomodation" labelName="Accomodation" typeInput="text" name="accomodation" id="accomodation" />
            <FormGroup onChange={handleOnChange} labelFor="transportation" labelName="Transportation" typeInput="text" name="transportation" id="transportation" />
            <FormGroup onChange={handleOnChange} labelFor="eat" labelName="Eat" typeInput="text" name="eat" id="eat" />
            <DoubleInput onChange={handleOnChange} labelFor="duration" labelName="Duration" typeInput="number" />
            <FormGroup onChange={handleOnChange} labelFor="date" labelName="Date Trip" typeInput="date" name="dateTrip" id="dateTrip" />
            <FormGroup onChange={handleOnChange} labelFor="price" labelName="Price" typeInput="number" name="price" id="price" />
            <FormGroup onChange={handleOnChange} labelFor="quota" labelName="Quota" typeInput="number" name="quota" id="quota" />
            <TextArea onChange={handleOnChange} labelFor="description" labelName="Description" name="description" id="description" />
            <div className="flex flex-row flex-wrap gap-2">
              {preview &&
                preview.map((file) => {
                  return <img className="w-40 h-40 object-cover object-center" src={file.preview} alt="preview" />;
                })}
            </div>
            <InputImage onChange={handleOnChange} labelFor="images" labelName="Images" />

            <InputSubmit value="Add Trip" />
          </Form>
          {message && message}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddTrip;
