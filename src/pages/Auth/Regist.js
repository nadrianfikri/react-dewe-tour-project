import { ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import Alert from '../../components/Alert';

import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

// get API config
import { API } from '../../config/api';

function Regist(props) {
  const history = useHistory();

  const [state, dispatch] = useContext(AuthContext);
  const [showText, setShowText] = useState(false);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
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

      // notif
      if (response.data.status === 'Success') {
        const alert = <Alert variant="green" message="Success" />;
        setForm({
          fullname: '',
          email: '',
          password: '',
          phone: '',
        });
        setMessage(alert);
      } else {
        const alert = <Alert variant="red" message={response.data.message} />;
        setMessage(alert);
      }
      setTimeout(() => {
        setMessage(null);
        history.push('/');
      }, 1500);
    } catch (error) {
      const alert = <Alert variant="red" message="Failed" />;
      setMessage(alert);
      setTimeout(() => {
        setMessage(null);
      }, 1000);
      console.log(error);
    }
  };

  return (
    <>
      <ModalBody>
        {message && message}
        <Form submit={handleOnSubmit}>
          <FormGroup
            //
            onChange={handleOnChange}
            labelFor="name"
            labelName="Full Name"
            typeInput="text"
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
            id="password"
            labelFor="password"
            labelName="Password"
            typeInput={showText ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleOnChange}
          >
            <button type="button" onClick={() => setShowText(!showText)} className="absolute top-2 right-2 w-7 text-gray-500 z-50">
              {showText ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </FormGroup>
          <FormGroup
            //
            onChange={handleOnChange}
            labelFor="phone"
            labelName="Phone"
            typeInput="text"
            name="phone"
            value={phone}
          />
          <InputSubmit value="Register" w="full" />
          <DirectText click={props.onClick} desc="Already have an account? " textLink="Login" />
        </Form>
      </ModalBody>
    </>
  );
}

export default Regist;
