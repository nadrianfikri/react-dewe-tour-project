import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Invoice from '../components/Invoice';
import Box from '../components/Box';
import NoData from '../components/NoData';
import { Modal, ModalTitle, ModalBody } from '../components/Modal';
import { Form, FormGroup, InputSubmit, InputImage } from '../components/Form';

import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/authContext';
import { API } from '../config/api';

function Profile() {
  const history = useHistory();
  const [state, dispatch] = useContext(AuthContext);
  const [trans, setTrans] = useState(null);
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    images: '',
    fullname: '',
    email: '',
    phone: '',
    address: '',
  }); //Store product data
  const { fullname, email, phone, address } = form;
  const id = state.user.id;

  // create func getData transaction
  const getData = async () => {
    try {
      // setForm for update profile
      setPreview(state?.user?.avatar);
      setForm({
        ...form,
        fullname: state.user.fullname,
        email: state.user.email,
        phone: state.user.phone,
        address: state.user.address,
      });

      const response = await API.get('/transaction');
      const datas = response.data.data;
      const mappedData = datas.map((data) => {
        data.trip.dateTrip = new Date(data.trip.dateTrip).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return data;
      });

      const filteredData = mappedData
        .filter((data) => data.user.id === state.user.id && data.status !== 'Waiting Payment')
        .reverse()
        .sort(function (a, b) {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
      setTrans(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [state]);

  // UPDATE PROFILE
  const handleChange = (e) => {
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

  // Create function for handle submit data ...
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // conditional if update profile without new avatar
      if (form.images === '') {
        // Configuration
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        // store data form
        const form = {
          fullname,
          email,
          phone,
          address,
        };
        // update user data
        await API.patch(`users/${id}`, form, config);
      } else {
        //  update profile with new avatar

        // Configuration
        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };

        // Store data with FormData as object
        const formData = new FormData();
        formData.set('avatar', form.images[0]);
        formData.set('fullname', form.fullname);
        formData.set('email', form.email);
        formData.set('phone', form.phone);
        formData.set('address', form.address);

        // update user data
        await API.patch(`users/${id}`, formData, config);
      }

      // check user updated
      const response = await API.get('/check-auth');
      if (response.status !== 200) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: 'AUTH_SUCCESS',
        payload,
      });

      document.querySelector('#userProfile').classList.toggle('hidden');
      history.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    document.querySelector('#userProfile').classList.toggle('hidden');
  };

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      {trans === null ? (
        <div>Loading...</div>
      ) : (
        <main className="md:container mx-auto overflow-auto pb-36">
          <Modal id="userProfile">
            <div className="pt-72">
              <ModalBody>
                <ModalTitle title="Edit Profile" top="top-96" />
                <Form action="/" method="post" submit={handleSubmit}>
                  <FormGroup
                    //
                    id="fullname"
                    labelFor="fullname"
                    labelName="Fullname"
                    typeInput="text"
                    name="fullname"
                    value={fullname}
                    onChange={handleChange}
                  />
                  <FormGroup
                    //
                    id="email"
                    labelFor="email"
                    labelName="Email"
                    typeInput="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <FormGroup
                    //
                    id="phone"
                    labelFor="phone"
                    labelName="Phone"
                    typeInput="text"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                  />
                  <FormGroup
                    //
                    id="address"
                    labelFor="address"
                    labelName="Address"
                    typeInput="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                  />
                  {preview && (
                    <div>
                      <img className="w-40 h-40 object-cover object-center" src={preview} alt="profile" />
                    </div>
                  )}
                  <InputImage onChange={handleChange} labelFor="images" labelName="Photo" />
                  <InputSubmit value="Save" w="full" />
                </Form>
              </ModalBody>
            </div>
          </Modal>
          <section className="px-2 sm:container mx-auto md:w-max pb-10 ">
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-24 bg-white p-6 rounded-md shadow">
              <div className="flex flex-col gap-2">
                <header className="pb-8">
                  <h1 className="text-4xl font-bold">Personal Info</h1>
                </header>
                <DataUser icon="/assets/icons/name.svg" desc="Full Name" name={state?.user?.fullname} />
                <DataUser icon="/assets/icons/email.svg" desc="Email" name={state?.user?.email} />
                <DataUser icon="/assets/icons/phone.svg" desc="Mobile Phone" name={state?.user?.phone} />
                <DataUser icon="/assets/icons/loc.svg" desc="Address" name={state?.user?.address} />
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <img src={state?.user?.avatar} alt="img" className="rounded-md h-64 border-2 border-gray-300 p-2" />
                <button onClick={showModal} className="bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-bold py-2 rounded-md w-3/4 md:w-full">
                  Edit Profile
                </button>
              </div>
            </div>
          </section>

          <section className="container mx-auto">
            <h1 className="text-2xl font-bold py-10">History Trip</h1>

            <>
              {trans !== null ? (
                <>
                  {trans.map((data, index) => {
                    return (
                      <Box key={index}>
                        <Invoice
                          // data trip
                          date={data.trip.dateTrip}
                          title={data.trip.title}
                          country={data.trip.country?.name}
                          day={data.trip.day}
                          night={data.trip.night}
                          accomodation={data.trip.accomodation}
                          transportation={data.trip.transportation}
                          // transaction
                          style={data.status === 'Approve' ? 'green' : data.status === 'Waiting Approve' ? 'yellow' : 'red'}
                          status={data.status}
                          attachment={data.attachment}
                          disabled={'disabled'}
                          proofDesc={data.status === 'Approve' ? 'TCK0101' : data.status === 'Waiting Approve' ? 'Proof of Payment' : 'Book Canceled'}
                          qty={data.qty}
                          total={data.total}
                          // user
                          userName={data.user.fullname}
                          userEmail={data.user.email}
                          userPhone={data.user.phone}
                        />
                      </Box>
                    );
                  })}
                </>
              ) : (
                <NoData desc="There is no data" />
              )}
            </>
          </section>
        </main>
      )}
      <Footer />
    </div>
  );
}

const DataUser = (props) => {
  return (
    <div className="data-user flex gap-2 pb-4">
      <div className="relative w-9">
        <img src={props.icon} alt="img" className="absolute right-1/2 bottom-1/2 transform translate-y-1/2 translate-x-1/2" />
      </div>
      <article className=" space-y-1">
        <dd className="text-sm font-bold">{props.name}</dd>
        <dd className="text-xs text-gray-400">{props.desc}</dd>
      </article>
    </div>
  );
};

export default Profile;
