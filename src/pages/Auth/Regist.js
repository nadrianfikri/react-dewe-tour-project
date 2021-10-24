import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';

function Regist() {
  return (
    <>
      <Modal>
        <ModalTitle title="Register" />
        <ModalBody>
          <Form>
            <FormGroup labelFor="name" labelName="Full Name" typeInput="name" name="name" />
            <FormGroup labelFor="email" labelName="Email" typeInput="email" name="email" />
            <FormGroup labelFor="password" labelName="Password" typeInput="password" name="password" />
            <FormGroup labelFor="phone" labelName="Phone" typeInput="number" name="phone" />
            <InputSubmit value="Register" />
            <DirectText route="/login" desc="Already have an account? " textLink="Login" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Regist;
