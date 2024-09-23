
export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },


  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },

];

export const hallColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "image",
    headerName: "Image",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photos} alt="" />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
 
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 80,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 90,
  },
  {
    field: "slotNumbers",
    headerName: "Slot Available",
    width: 350,   
    renderCell: (params) => (
      <ul className="flex">
        {params.value.map((a, index) => (
          <li key={index}>{a.number}</li>

        ))}
      </ul>
    ),
    type: 'string',
  },
  
  
];


export const contactColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "ph",
    headerName: "Phone Number",
    width: 200,
  },
  {
    field: "message",
    headerName: "Message",
    width: 200,
  },
  
];

export const feedbackColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 200,
  },
  {
    field: "reviewMessage",
    headerName: "Message",
    width: 200,
  },
];

export const TicketColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "hname",
    headerName: "Hall",
    width: 200,
  },
  {
    field: "sdate",
    headerName: "StartDate",
    width: 200,
  },
  {
    field: "edate",
    headerName: "EndDate",
    width: 200,
  }
]