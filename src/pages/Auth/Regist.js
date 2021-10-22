import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';

function Regist() {
  return (
    <>
      <Modal>
        <ModalTitle title="Register" />
        <ModalBody>
          <Form>
            <FormGroup labelFor="name" labelName="Full Name" typeInput="name" inputName="name" />
            <FormGroup labelFor="email" labelName="Email" typeInput="email" inputName="email" />
            <FormGroup labelFor="password" labelName="Password" typeInput="password" inputName="password" />
            <FormGroup labelFor="phone" labelName="Phone" typeInput="number" inputName="phone" />
            <InputSubmit value="Register" />
            <DirectText route="/" desc="Already have an account? " textLink="Login" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Regist;
