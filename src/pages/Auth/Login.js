import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';

// get API config
import { API, setAuthToken } from '../../config/api';
import { useHistory } from 'react-router';
import Alert from '../../components/Alert';

function Login() {
  let history = useHistory();

  const [state, dispatch] = useContext(AuthContext);

  const [message, setMessage] = useState(null);

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
      if (response.data.data.role === 'admin') {
        setTimeout(() => {
          history.push('/income-trip');
        }, 1000);
      } else {
        history.push('/');
      }

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

      setTimeout(() => {
        setMessage(null);
      }, 1500);

      setForm({
        email: '',
        password: '',
      });
    } catch (error) {
      const alert = (
        <Alert
          variant="red"
          message="Login Failed"
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

  const handleLoginModal = () => {
    document.querySelector('#modalLogin').classList.toggle('hidden');
    document.querySelector('#modalRegist').classList.toggle('hidden');
  };
  return (
    <>
      <Modal id="modalLogin">
        <ModalTitle title="Login" />
        {message && message}
        <ModalBody>
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
              typeInput="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <InputSubmit value="Login" w="full" />
            <DirectText
              //
              click={handleLoginModal}
              desc="Don't have an account? Klik "
              textLink="Here"
            />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Login;
