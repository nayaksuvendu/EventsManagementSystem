import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/halls/countByType");

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHqGDXDjesKLp8Hs0i3AOVgcOicEqZKcrKrWbszkbbY473Apva6PwupoROkWrJe1ZcJA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlunoHylUo4E2E7E5f_UPGxoJYDbVihy3-lg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_z9WvJczYCe8fW3VfzDckeoTjgHfFU6jtgcymmfgFAF3gKc-K1DnmB_XUHHRnGOwdg5s&usqp=CAU",   
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZWvQtNge3Eg_T1aHqdCltqUnmz_NDyPpphwMf2Y9pAgidj-rjZNCQv7fDKDkAXLv67n0&usqp=CAU", 
    "https://images.tribuneindia.com/cms/gall_content/2018/10/2018_10$largeimg28_Sunday_2018_005912011.jpg",
    "https://5.imimg.com/data5/WX/YF/GLADMIN-55973599/wedding-hall-1000x1000.png"  
  ];

  return (
    <div className="w-full flex  flex-wrap gap-5 text-center bg-transparent overflow-hidden text-white justify-center items-center">
      {loading ? (
        "Loading..."
      ) : error ? (
        <div className="text-white">Error in loading</div>
      ) : (
        data && images.length === data.length ? (
          images.map((img, i) => (
            <div
              className="flex-1 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out mt-4 hover:scale-105"
              key={i}
            >
              <img
                src={img}
                alt={`Property ${data[i]?.type}`} // Alt text added for accessibility
                className="w-full h-[150px] object-cover rounded-lg shadow-lg border-2"
              />
              <div className="mt-2">
                <h1 className="text-white font-bold text-lg">{data[i]?.type}</h1>
              </div>
            </div>
          ))
        ) : (
          <div>Data and image count mismatch</div>
        )
      )}
    </div>
  );
};

export default PropertyList;
