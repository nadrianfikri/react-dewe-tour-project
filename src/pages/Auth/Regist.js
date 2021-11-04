import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';
import Alert from '../../components/Alert';

import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

// get API config
import { API } from '../../config/api';

function Regist() {
  const history = useHistory();

  const [state, dispatch] = useContext(AuthContext);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const { fullname, email, password, phone } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(form);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      // create config content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // convert formdata to string
      const body = JSON.stringify(form);

      // insert data user to database
      const response = await API.post('/register', body, config);
      // console.log(response);

      // notif
      if (response.data.status === 'Success') {
        const alert = <Alert variant="green" message="Success" />;
        setMessage(alert);
      } else {
        const alert = <Alert variant="red" message="Failed" />;
        setMessage(alert);
      }
      //   setMessage(alert);
      document.querySelector('#modalRegist').classList.toggle('hidden');
      history.push('/');
    } catch (error) {
      const alert = <Alert variant="red" message="Failed" />;
      setMessage(alert);
      console.log(error);
    }
  };

  const handleRegistModal = () => {
    document.querySelector('#modalRegist').classList.toggle('hidden');
    document.querySelector('#modalLogin').classList.toggle('hidden');
  };

  return (
    <>
      <Modal id="modalRegist">
        <ModalTitle title="Register" />
        {message && message}
        <ModalBody>
          <Form submit={handleOnSubmit}>
            <FormGroup
              //
              onChange={handleOnChange}
              labelFor="name"
              labelName="Full Name"
              typeInput="name"
              name="fullname"
              value={fullname}
            />
            <FormGroup
              //
              onChange={handleOnChange}
              labelFor="email"
              labelName="Email"
              typeInput="email"
              name="email"
              value={email}
            />
            <FormGroup
              //
              onChange={handleOnChange}
              labelFor="password"
              labelName="Password"
              typeInput="password"
              name="password"
              value={password}
            />
            <FormGroup
              //
              onChange={handleOnChange}
              labelFor="phone"
              labelName="Phone"
              typeInput="number"
              name="phone"
              value={phone}
            />
            <InputSubmit value="Register" w="full" />
            <DirectText click={handleRegistModal} desc="Already have an account? " textLink="Login" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Regist;
