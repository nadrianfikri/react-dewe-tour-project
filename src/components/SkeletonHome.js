function SkeletonHome() {
  return (
    <div className="h-screen p-2 space-y-4">
      {/* search */}
      <div className=" flex flex-col items-center w-full h-96 border-2 rounded-md mt-20">
        <div className="flex container animate-pulse flex-col  h-full justify-center gap-4 p-4">
          <div className="w-3/4 bg-gray-300 h-14 rounded-md "></div>
          <div className="w-1/2 bg-gray-300 h-14 rounded-md "></div>
          <div className="w-56 mt-10 bg-gray-300 h-6 rounded-md "></div>

          <div className="flex gap-2 w-full ">
            <div className="w-full bg-gray-300 h-8 rounded-md "></div>
            <div className="w-36 bg-gray-300 h-8 rounded-md "></div>
          </div>
        </div>
      </div>

      {/* card */}
      <div className="flex justify-center gap-4 flex-wrap">
        <section className="w-60 h-72 border-2 rounded-md mx-auto ">
          <div className="flex animate-pulse flex-col items-center h-full space-y-5 p-3">
            <div className="w-20 bg-gray-300 h-20 rounded-full "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-52 bg-gray-300 h-10 rounded-md "></div>
              <div className="w-52 bg-gray-300 h-5 rounded-md "></div>
              <div className="w-52 bg-gray-300 h-5 rounded-md "></div>
              <div className="w-36 bg-gray-300 h-5 rounded-md "></div>
            </div>
          </div>
        </section>
        <section className="w-60 h-72 border-2 rounded-md mx-auto ">
          <div className="flex animate-pulse flex-col items-center h-full space-y-5 p-3">
            <div className="w-20 bg-gray-300 h-20 rounded-full "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-52 bg-gray-300 h-10 rounded-md "></div>
              <div className="w-52 bg-gray-300 h-5 rounded-md "></div>
              <div className="w-52 bg-gray-300 h-5 rounded-md "></div>
              <div className="w-36 bg-gray-300 h-5 rounded-md "></div>
            </div>
          </div>
        </section>
        <section className="w-60 h-72 border-2 rounded-md mx-auto ">
          <div className="flex animate-pulse flex-col items-center h-full space-y-5 p-3">
            <div className="w-20 bg-gray-300 h-20 rounded-full "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-52 bg-gray-300 h-10 rounded-md "></div>
              <div className="w-52 bg-gray-300 h-5 rounded-md "></div>
              <div className="w-52 bg-gray-300 h-5 rounded-md "></div>
              <div className="w-36 bg-gray-300 h-5 rounded-md "></div>
            </div>
          </div>
        </section>
        <section className="w-60 h-72 border-2 rounded-md mx-auto ">
          <div className="flex animate-pulse flex-col items-center h-full space-y-5 p-3">
            <div className="w-20 bg-gray-300 h-20 rounded-full "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-52 bg-gray-300 h-10 rounded-md "></div>
              <div className="w-52 bg-gray-300 h-5 rounded-md "></div>
              <div className="w-52 bg-gray-300 h-5 rounded-md "></div>
              <div className="w-36 bg-gray-300 h-5 rounded-md "></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SkeletonHome;
