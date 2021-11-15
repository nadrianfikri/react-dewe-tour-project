import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Invoice from '../components/Invoice';
import Box from '../components/Box';
import NoData from '../components/NoData';
import { Modal, ModalTitle, Overlay } from '../components/Modal';

import { Transition } from '@headlessui/react';
import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/authContext';
import { API } from '../config/api';

function Profile() {
  const title = 'Profile';
  document.title = 'Dewe Tour | ' + title;

  const history = useHistory();
  const [state, dispatch] = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const [trans, setTrans] = useState([]);
  const [filterData, setFilterData] = useState([]);

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

      setTrans(mappedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    setFilterData(trans);
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

      setIsOpen(false);
      history.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const filterDataByStatus = (e) => {
    const status = e.target.id;

    const data = trans.filter((item) => item.user.id === state.user.id && item.status === status);

    setFilterData(data);
  };
  console.log(filterData);

  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      {trans === null ? (
        <div>Loading...</div>
      ) : (
        <main className="md:container mx-auto overflow-auto pb-36">
          <Transition show={isOpen}>
            <Overlay>
              <Transition.Child
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-0"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-0"
              >
                <Modal>
                  <ModalTitle title="Edit Profile" onClick={() => setIsOpen(false)} />
                  <section className="px-2 sm:container mx-auto md:w-max pb-10 ">
                    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-24 bg-white p-6 rounded-md shadow">
                      <div className="flex flex-col gap-2 text-gray-500">
                        <DataUser icon="/assets/icons/name.svg" desc="Full Name">
                          <input type="text" className="border border-gray-300 rounded-lg focus:outline-none px-2" name="fullname" value={fullname} onChange={handleChange} />
                        </DataUser>
                        <DataUser icon="/assets/icons/email.svg" desc="Email">
                          <input type="text" className="border border-gray-300 rounded-lg focus:outline-none px-2" name="email" value={email} onChange={handleChange} />
                        </DataUser>
                        <DataUser icon="/assets/icons/phone.svg" desc="Mobile Phone">
                          <input type="text" className="border border-gray-300 rounded-lg focus:outline-none px-2" name="phone" value={phone} onChange={handleChange} />
                        </DataUser>
                        <DataUser icon="/assets/icons/loc.svg" desc="Address">
                          <input type="text" className="border border-gray-300 rounded-lg focus:outline-none px-2" name="address" value={address} onChange={handleChange} />
                        </DataUser>
                      </div>

                      <div className="flex flex-col gap-2 justify-center items-center">
                        {preview && (
                          <div>
                            <img className="rounded-lg w-40 h-40 object-cover object-center" src={preview} alt="profile" />
                          </div>
                        )}
                        <label className="bg-yellow-200 text-center text-yellow-700 rounded-lg px-2 w-full cursor-pointer" htmlFor="files">
                          Change Photo
                        </label>
                        <input type="file" name="images" id="files" onChange={handleChange} hidden />
                      </div>
                    </div>
                    <button onClick={handleSubmit} className="flex-none bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-bold py-2 rounded-md w-full">
                      Save
                    </button>
                  </section>
                </Modal>
              </Transition.Child>
            </Overlay>
          </Transition>

          {/* User profiles */}
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
                <button onClick={() => setIsOpen(true)} className="bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-bold py-2 rounded-md w-full">
                  Edit Profile
                </button>
              </div>
            </div>
          </section>
          <section className="container mx-auto">
            <h1 className="text-2xl font-bold py-10">History Trip</h1>

            <div className="bg-blue-100 flex my-10">
              <button onClick={filterDataByStatus} id="Waiting Payment" className="bg-gray-50 py-2 px-4 w-full hover:bg-red-600 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300">
                Waiting Payment
              </button>
              <button onClick={filterDataByStatus} id="Waiting Approve" className="bg-gray-50 py-2 px-4 w-full hover:bg-yellow-500 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300">
                Waiting Approve
              </button>
              <button onClick={filterDataByStatus} id="Approve" className="bg-gray-50 py-2 px-4 w-full hover:bg-green-500 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300">
                Approve
              </button>
              <button onClick={filterDataByStatus} id="Canceled" className="bg-gray-50 py-2 px-4 w-full hover:bg-red-600 hover:text-white font-semibold border border-gray-200 text-gray-500 transition duration-300">
                Canceled
              </button>
            </div>
            <>
              {filterData.length > 0 ? (
                <>
                  {filterData.map((data, index) => {
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
        {props.children}
        <dd className="text-sm font-bold">{props.name}</dd>
        <dd className="text-xs text-gray-400">{props.desc}</dd>
      </article>
    </div>
  );
};

export default Profile;
