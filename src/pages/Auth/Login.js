import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';

function Login() {
  return (
    <>
      <Modal>
        <ModalTitle title="Login" />
        <ModalBody>
          <Form>
            <FormGroup labelFor="email" labelName="Email" typeInput="email" inputName="email" />
            <FormGroup labelFor="password" labelName="Password" typeInput="password" inputName="password" />
            <InputSubmit value="Login" />
            <DirectText route="/" desc="Don't have an account? Klik " textLink="Here" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Login;
