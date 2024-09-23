import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
  const navigate = useNavigate();

  // Handle session storage and list initialization
  useEffect(() => {
    if (data) {
      sessionStorage.setItem("alldata", JSON.stringify(data));
      setList(data);  // Set list directly from fetched data
    } else {
      const sessionData = JSON.parse(sessionStorage.getItem("alldata") || "[]");
      setList(sessionData);
    }
  }, [data]);

  // Handle deleting an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      window.Notification(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <div className="cellAction">
            <div
              className=" p-1 border-2 rounded-lg border-red-600 text-red-700 hover:text-white hover:bg-red-600 cursor-pointer "
              onClick={() => handleDelete(id)}
            >
              Delete
            </div>
            {((path === "slots") || (path === "halls")) && (
              <div
                className=" p-1 border-2 rounded-lg border-blue-600 text-blue-700 hover:text-white hover:bg-blue-600 cursor-pointer "
                onClick={() => navigate(`/${path}/update`, { state: id })}
              >
                Update
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="w-full flex items-center justify-between font-bold text-3xl text-indigo-600 capitalize">
        {((path === "slots") || (path === "halls")) && (
          <Link
            to={`/${path}/new`}
            className="text-decoration-none text-white text-base bg-green-600 rounded-lg font-medium border-green p-2 cursor-pointer hover:bg-white hover:text-green-700"
          >
            Add New
          </Link>
        )}
      </div>
      {loading ? (
        "Loading..."
      ) : error ? (
        <div className="text-red-500 font-bold">Error in loading data</div>
      ) : (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={100}
          rowsPerPageOptions={[25,65,100]}
          rowHeight={100}
          checkboxSelection
          getRowId={(row) => row._id}
          pagination
        />
      )}
    </div>
  );
};

export default Datatable;

