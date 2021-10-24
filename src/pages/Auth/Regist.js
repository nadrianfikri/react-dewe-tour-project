import { Modal, ModalTitle, ModalBody } from '../../components/Modal';
import { Form, FormGroup, InputSubmit, DirectText } from '../../components/Form';

function Regist() {
  const handleRegistModal = () => {
    document.querySelector('#modalRegist').classList.add('hidden');
    document.querySelector('#modalLogin').classList.remove('hidden');
  };
  return (
    <>
      <Modal id="modalRegist">
        <ModalTitle title="Register" />
        <ModalBody>
          <Form>
            <FormGroup labelFor="name" labelName="Full Name" typeInput="name" name="name" />
            <FormGroup labelFor="email" labelName="Email" typeInput="email" name="email" />
            <FormGroup labelFor="password" labelName="Password" typeInput="password" name="password" />
            <FormGroup labelFor="phone" labelName="Phone" typeInput="number" name="phone" />
            <InputSubmit value="Register" w="full" />
            <DirectText click={handleRegistModal} desc="Already have an account? " textLink="Login" />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Regist;
