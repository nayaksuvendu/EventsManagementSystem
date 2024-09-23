import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/dataList/DataList";
import {  Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { contactColumns, feedbackColumns, hallColumns, roomColumns, TicketColumns, userColumns } from "./components/stracture/datatableStr.js";
import NewHall from "./pages/createHall/NewHall";
import NewSlot from "./pages/createSlot/NewSlot";
import UpdateHall from "./pages/updateHall/UpdateHall";
import UpdateSlot from "./pages/updateSlot/UpdateSlot";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Forgetpsw from "./pages/password/Forgetpsw.jsx";
import ResetPassword from "./pages/password/Resetpsw.jsx";
import PagenotFound from "./pages/pagenotfound/PagenotFound.jsx";

function App() {

  return (
        <Routes>
          <Route path="/">
                   
            <Route path="login" element={<Login/>} />
            <Route path="forgetpassword" element={<Forgetpsw/>} />
            <Route path="resetpassword" element={<ResetPassword/>} />
            <Route path="*" element={<PagenotFound/>} />

            <Route index element={ <ProtectedRoute> <Home/></ProtectedRoute> } />

            <Route path="users">
                <Route index element={ <ProtectedRoute> <List columns={userColumns}/> </ProtectedRoute> } />
            </Route>

          <Route path="halls">
              <Route index element={<ProtectedRoute><List columns={hallColumns}/></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewHall/></ProtectedRoute>}
              />
              <Route
                path="update"
                element={<ProtectedRoute><UpdateHall/></ProtectedRoute>}
              />
          </Route>

          <Route path="slots">
              <Route index element={<ProtectedRoute><List columns={roomColumns}/></ProtectedRoute>} />
              <Route path="new"
                element={<ProtectedRoute> <NewSlot/> </ProtectedRoute>}
              />
              <Route path="update"
                element={<ProtectedRoute> <UpdateSlot/> </ProtectedRoute>}
              />             
          </Route>

          <Route path="contact">
              <Route index element={<ProtectedRoute><List columns={contactColumns}/></ProtectedRoute>} />           
          </Route>

          <Route path="feedback">
              <Route index element={<ProtectedRoute><List columns={feedbackColumns}/></ProtectedRoute>} />           
          </Route>

          <Route path="ticketconfirm">
              <Route index element={<ProtectedRoute><List columns={TicketColumns}/></ProtectedRoute>} />          
          </Route>

          
          </Route>
     </Routes>
  
  );
}

export default App;
