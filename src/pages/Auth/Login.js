import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';

function Login() {
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
            <FormGroup labelFor="email" labelName="Email" typeInput="email" name="email" />
            <FormGroup labelFor="password" labelName="Password" typeInput="password" name="password" />
            <InputSubmit value="Login" w="full" />
            <DirectText click={handleLoginModal} desc="Don't have an account? Klik " textLink="Here" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Login;
