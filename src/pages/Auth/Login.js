import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
function Login() {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    console.log('App component did mount');

    dispatch({ type: 'AUTH' });
  }, []);
  useEffect(() => {
    if (state.user.email) {
      console.log('App component did update');
    }
  }, [state]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const listUser = dataUser.user;

    document.querySelector('#modalLogin').classList.toggle('hidden');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const matchUser = listUser.find((user) => {
      if (user.email === email && user.password === password) {
        return user;
      } else {
        return null;
      }
    });

    if (matchUser) {
      dispatch({
        type: 'LOGIN',
        payload: matchUser,
      });
    } else {
      alert('Email or Password is wrong');
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
        <ModalBody>
          <Form action="/" method="post" submit={handleOnSubmit}>
            <FormGroup id="email" labelFor="email" labelName="Email" typeInput="email" name="email" />
            <FormGroup id="password" labelFor="password" labelName="Password" typeInput="password" name="password" />
            <InputSubmit value="Login" w="full" />
            <DirectText click={handleLoginModal} desc="Don't have an account? Klik " textLink="Here" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Login;
