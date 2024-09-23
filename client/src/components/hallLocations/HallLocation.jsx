import useFetch from "../../hooks/useFetch.js";

const Featured = () => {
  const { loading, error } = useFetch('/halls/countByCity?cities=vijayawada,Karimnagar,Warangal'); 

  return (
    <div className="w-full flex justify-center items-center  text-white">
      {loading ? (
        "Loading..."
      ) : error ? (
        <div className="text-white font-bold">Error in loading data</div>
      ) : (
        <div className="flex gap-48 ">
          <div className="relative flex-1 rounded-lg overflow-hidden h-[250px] transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-315aabe8b17c1cea0e5d70506b49f8cb-lq"
              alt="Hyderabad"
              className="w-full h-full object-cover border-2 rounded-lg shadow-lg cursor-pointer"
            />
            <div className="absolute bottom-0 left-5 font-bold text-white">
              <h1>Hyderabad</h1>
            </div>
          </div>

          <div className="relative flex-1 rounded-lg overflow-hidden h-[250px] transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src="https://cdn.s3waas.gov.in/s372b32a1f754ba1c09b3695e0cb6cde7f/uploads/bfi_thumb/2018110238-olw9z028xotq284rskaog9ckyd3v7lvz3gngqu4xr4.jpg"
              alt="Karimnagar"
              className="w-full h-full object-cover border-2 rounded-lg shadow-lg cursor-pointer"
            />
            <div className="absolute bottom-0 left-5 font-bold text-white text-center">
              <h1>Karimnagar</h1>
            </div>
          </div>

          <div className="relative flex-1 rounded-lg overflow-hidden h-[250px] transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt="Warangal"
              className="w-full h-full object-cover border-2 rounded-lg shadow-lg cursor-pointer"
            />
            <div className="absolute bottom-0 left-5 font-bold text-white">
              <h1>Warangal</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured;

