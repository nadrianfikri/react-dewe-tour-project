import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Form, FormGroup, TextArea, InputSubmit, InputImage, Select, DoubleInput } from '../components/Form';
function AddTrip() {
  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />

      <main className="container mx-auto overflow-auto pb-36 ">
        <div className="pb-10">
          <h1 className="text-4xl font-bold">Income Trip</h1>
        </div>
        <div>
          <Form action="/">
            <FormGroup labelFor="title" labelName="Title Trip" typeInput="text" name="title" id="title" />
            <Select labelFor="country" labelName="Country" typeInput="text" name="country" id="country" />
            <FormGroup labelFor="accomodation" labelName="Accomodation" typeInput="text" name="accomodation" id="accomodation" />
            <FormGroup labelFor="transportation" labelName="Transportation" typeInput="text" name="transportation" id="transportation" />
            <FormGroup labelFor="eat" labelName="Eat" typeInput="text" name="eat" id="eat" />
            <DoubleInput labelFor="duration" labelName="Duration" typeInput="text" />
            <FormGroup labelFor="date" labelName="Date Trip" typeInput="date" name="date" id="date" />
            <FormGroup labelFor="price" labelName="Price" typeInput="number" name="price" id="price" />
            <FormGroup labelFor="quota" labelName="Quota" typeInput="number" name="quota" id="quota" />
            <TextArea labelFor="desc" labelName="Description" name="desc" id="desc" />
            <InputImage labelFor="image" labelName="Image" />
            <InputSubmit value="Add Trip" />
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddTrip;
