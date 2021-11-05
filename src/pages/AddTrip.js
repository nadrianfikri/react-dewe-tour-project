import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Form, FormGroup, TextArea, InputSubmit, InputImage, Select, Option, DoubleInput } from '../components/Form';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../config/api';

function AddTrip() {
  let history = useHistory();
  // console.clear();
  const title = 'Admin Add Trip';
  document.title = `DeweTour | ${title} `;

  // store data
  const [country, setCountry] = useState([]);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: '',
    country: '',
    accomodation: '',
    transportation: '',
    eat: '',
    day: '',
    night: '',
    date: '',
    price: '',
    quota: '',
    desc: '',
    images: '',
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

  // handle change data on form
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // console.log(form);

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
      formData.set('accomodation', form.accomodation);
      formData.set('transportation', form.transportation);
      formData.set('eat', form.eat);
      formData.set('day', form.day);
      formData.set('night', form.night);
      formData.set('date', form.date);
      formData.set('quota', form.quota);
      formData.set('desc', form.desc);
      formData.set('images', form.images, form.images.name);
      formData.set('country', document.getElementById('country').value);

      // Insert product data here ...
      const response = await API.post('/trip', formData, config);
      console.log(response);
      history.push('/add-trip');
    } catch (error) {}

    history.push('/add-trip');
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />

      <main className="container mx-auto pb-36 ">
        <div className="pb-10">
          <h1 className="text-4xl font-bold">Income Trip</h1>
        </div>
        <div className="overflow-auto">
          <Form action="/" submit={handleOnSubmit} enctype="multipart/form-data">
            <FormGroup onChange={handleOnChange} labelFor="title" labelName="Title Trip" typeInput="text" name="title" id="title" />
            <Select onChange={handleOnChange} labelFor="country" labelName="Country" name="country" id="country">
              {country.map((data, index) => {
                return <Option key={index} value={data.id} field={data.name} />;
              })}
            </Select>
            <FormGroup onChange={handleOnChange} labelFor="accomodation" labelName="Accomodation" typeInput="text" name="accomodation" id="accomodation" />
            <FormGroup onChange={handleOnChange} labelFor="transportation" labelName="Transportation" typeInput="text" name="transportation" id="transportation" />
            <FormGroup onChange={handleOnChange} labelFor="eat" labelName="Eat" typeInput="text" name="eat" id="eat" />
            <DoubleInput onChange={handleOnChange} labelFor="duration" labelName="Duration" typeInput="number" />
            <FormGroup onChange={handleOnChange} labelFor="date" labelName="Date Trip" typeInput="date" name="date" id="date" />
            <FormGroup onChange={handleOnChange} labelFor="price" labelName="Price" typeInput="number" name="price" id="price" />
            <FormGroup onChange={handleOnChange} labelFor="quota" labelName="Quota" typeInput="number" name="quota" id="quota" />
            <TextArea onChange={handleOnChange} labelFor="desc" labelName="Description" name="desc" id="desc" />
            {preview && (
              <div className="flex gap-2">
                <img
                  src={preview}
                  style={{
                    maxWidth: '150px',
                    maxHeight: '150px',
                    objectFit: 'cover',
                  }}
                  alt="preview"
                />
              </div>
            )}
            <InputImage onChange={handleOnChange} labelFor="images" labelName="Images" />
            <InputSubmit value="Add Trip" />
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddTrip;
