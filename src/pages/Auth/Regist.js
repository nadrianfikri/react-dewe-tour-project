import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';

function Regist() {
  const history = useHistory();

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleOnChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const user = userLocalStorage.user;

    const data = {
      id: user.length + 1,
      name: state.name,
      email: state.email,
      password: state.password,
      phone: state.phone,
      status: 0,
    };

    user.push(data);
    localStorage.setItem(
      'user',
      JSON.stringify({
        isLogin: false,
        user,
      })
    );

    document.querySelector('#modalRegist').classList.toggle('hidden');
    history.push('/');
  };

  const handleRegistModal = () => {
    document.querySelector('#modalRegist').classList.toggle('hidden');
    document.querySelector('#modalLogin').classList.toggle('hidden');
  };

  return (
    <>
      <Modal id="modalRegist">
        <ModalTitle title="Register" />
        <ModalBody>
          <Form action="/" submit={handleOnSubmit}>
            <FormGroup onChange={handleOnChange} labelFor="name" labelName="Full Name" typeInput="name" name="name" />
            <FormGroup onChange={handleOnChange} labelFor="email" labelName="Email" typeInput="email" name="email" />
            <FormGroup onChange={handleOnChange} labelFor="password" labelName="Password" typeInput="password" name="password" />
            <FormGroup onChange={handleOnChange} labelFor="phone" labelName="Phone" typeInput="number" name="phone" />
            <InputSubmit value="Register" w="full" />
            <DirectText click={handleRegistModal} desc="Already have an account? " textLink="Login" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Regist;
