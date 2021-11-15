import { ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

// get API config
import { API, setAuthToken } from '../../config/api';
import { useHistory } from 'react-router';
import Alert from '../../components/Alert';

function Login(props) {
  let history = useHistory();

  const [state, dispatch] = useContext(AuthContext);

  const [message, setMessage] = useState(null);
  const [showText, setShowText] = useState(false);

  // store data with useState
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      // create config content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // convert form data to string
      const body = JSON.stringify(form);

      // insert data user for login process
      const response = await API.post('/login', body, config);
      setAuthToken(response.data.data.token);

      //checking process
      if (response?.status === 200) {
        // send data to context
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });
      }
      // role user check
      setTimeout(() => {
        if (response.data.data.role === 'admin') {
          history.push('/income-trip');
        }
      }, 1000);

      const alert = (
        <Alert
          variant="green"
          message="Login Success"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);
      setForm({
        email: '',
        password: '',
      });
      history.push('/');
    } catch (error) {
      const alert = (
        <Alert
          variant="red"
          message="Email or Password is Wrong"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);

      setTimeout(() => {
        setMessage(null);
      }, 1500);

      console.log(error);
    }
  };

  return (
    <>
      <ModalBody>
        {message && message}
        <Form action="/" method="post" submit={handleOnSubmit}>
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
            id="password"
            labelFor="password"
            labelName="Password"
            typeInput={showText ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChange}
          >
            <button type="button" onClick={() => setShowText(!showText)} className="absolute top-2 right-2 w-7 text-gray-500 z-50">
              {showText ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </FormGroup>
          <InputSubmit value="Login" w="full" />
          <DirectText
            //
            click={props.onClick}
            desc="Don't have an account? Klik "
            textLink="Here"
          />
        </Form>
      </ModalBody>
    </>
  );
}

export default Login;
