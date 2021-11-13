import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import { Dialog, Transition } from '@headlessui/react';

import { Form, FormGroup, TextArea, InputSubmit, InputImage, Select, Option, DoubleInput } from '../components/Form';

import { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../config/api';

function AddTrip() {
  let history = useHistory();

  const title = 'Admin Add Trip';
  document.title = `DeweTour | ${title} `;

  // store data
  let [isOpen, setIsOpen] = useState(false);
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
    quotaFilled: '',
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
      formData.set('quotaFilled', form.quota);
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
  const filteredCountry = country.find((item) => item.id === Number(form?.country));

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />

      <main className="container mx-auto pb-36 ">
        <div className="pb-10">
          <h1 className="text-4xl font-bold">Income Trip</h1>
        </div>
        {/* modal */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsOpen(false)}>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 mb-2 text-center">
                    Confirm add new trip
                  </Dialog.Title>
                  {/* dialog isi */}
                  {/* preview data */}
                  <div className="preview-data space-y-4">
                    <div className="flex flex-col gap-3">
                      <p className="font-bold">
                        Title: <span className="font-normal">{form.title}</span>
                      </p>
                      <p className="font-bold">
                        Country: <span className="font-normal ">{filteredCountry?.name}</span>
                      </p>
                      <div>
                        <p className="font-bold">Images: </p>
                        <div className="flex flex-row flex-wrap gap-2">
                          {preview &&
                            preview.map((file) => {
                              return <img className="w-40 h-40 object-cover object-center" src={file.preview} alt="preview" />;
                            })}
                        </div>
                      </div>
                      <p className="font-bold">
                        Description: <span className="font-normal text-sm">{form.description}</span>
                      </p>
                    </div>
                    <div className=" flex gap-6">
                      <div className="right space-y-1">
                        <p className="font-bold">
                          Accomodation: <span className="font-normal">{form.accomodation}</span>
                        </p>
                        <p className="font-bold">
                          Transportation: <span className="font-normal">{form.transportation}</span>
                        </p>
                        <p className="font-bold">
                          Eat: <span className="font-normal">{form.eat}</span>
                        </p>
                        <p className="font-bold">
                          Date trip: <span className="font-normal">{form.dateTrip}</span>
                        </p>
                      </div>
                      <div className="left space-y-1">
                        <p className="font-bold">
                          Day: <span className="font-normal">{form.day}</span>
                        </p>
                        <p className="font-bold">
                          Night: <span className="font-normal">{form.night}</span>
                        </p>
                        <p className="font-bold">
                          Price: <span className="font-normal">{form.price}</span>
                        </p>
                        <p className="font-bold">
                          Quota: <span className="font-normal">{form.quota}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-500">Make sure the data you entered is correct. Because the data can not be changed back</p>
                  </div>

                  <div className="mt-4 flex gap-4 justify-end">
                    <button onClick={() => setIsOpen(false)} type="button" className="px-12 py-2  bg-red-400 text-white text-center font-bold rounded-lg hover:bg-red-500 ">
                      Cancel
                    </button>
                    <button onClick={handleOnSubmit} type="button" className="px-12 py-2  bg-yellow-400 text-white text-center font-bold rounded-lg hover:bg-yellow-500 ">
                      Add Trip
                    </button>
                    {message && message}
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {/* form */}
        <div className="overflow-auto">
          <Form enctype="multipart/form-data">
            <FormGroup onChange={handleOnChange} labelFor="title" labelName="Title Trip" typeInput="text" name="title" id="title" />
            <Select onChange={handleOnChange} labelFor="country" labelName="Country" name="country" id="country">
              <option value="DEFAULT" disabled>
                {' '}
              </option>
              {country.map((data, index) => {
                return <Option key={index} value={data.id} field={data.name} id={data.name} />;
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

            <div className="flex justify-center w-full">
              <button onClick={() => setIsOpen(true)} type="button" className="px-12 py-2  bg-yellow-400 text-white text-center font-bold rounded-lg hover:bg-yellow-500 ">
                Add trip
              </button>
            </div>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddTrip;
