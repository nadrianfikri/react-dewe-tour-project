function Modal() {
  return (
    <div class="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white rounded shadow-lg w-10/12 md:w-1/3">
        {/* modal title */}
        <div class="border-b px-4 py-2 flex justify-between items-center">
          <h3 class="font-semibold text-lg">Modal Title</h3>
          <button class="text-black close-modal">x</button>
        </div>
        {/* modal body */}
        <div class="p-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum, delectus cumque fugiat nemo ducimus quae deserunt cupiditate sapiente incidunt aut accusantium dolore assumenda vitae similique, exercitationem voluptatum
          praesentium laboriosam nam.
        </div>
        <div class="flex justify-end items-center w-100 border-t p-3">
          <button class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal">Cancel</button>
          <button class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white">Oke</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
