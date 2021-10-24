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
    document.querySelector('#modalLogin').classList.toggle('hidden');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    dispatch({
      type: 'LOGIN',
      payload: {
        email,
        password,
      },
    });
  };

  const handleLoginModal = () => {
    document.querySelector('#modalLogin').classList.add('hidden');
    document.querySelector('#modalRegist').classList.remove('hidden');
  };
  return (
    <>
      <Modal id="modalLogin">
        <ModalTitle title="Login" />
        <ModalBody>
          <Form>
            <FormGroup id="email" labelFor="email" labelName="Email" typeInput="email" name="email" />
            <FormGroup id="password" labelFor="password" labelName="Password" typeInput="password" name="password" />
            <InputSubmit submit={handleOnSubmit} value="Login" w="full" />
            <DirectText click={handleLoginModal} desc="Don't have an account? Klik " textLink="Here" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Login;
