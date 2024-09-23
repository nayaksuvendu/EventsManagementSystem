import{Routes,Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Searchlist from "./pages/searchedhall/Searchedhall.jsx";
import BookingHall from "./pages/bookinghall/BookingHall.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/user/Signup.jsx'
import Login from './pages/user/Login.jsx'
import Forgetpsw from "./pages/user/Forgetpsw.jsx";
import Resetpsw from "./pages/user/Resetpsw.jsx";
import Contactus from "./components/homeComponents/Contactus.jsx";
import FailPayment from "./pages/payment/FailPayment.jsx";
import SuccessPayment from "./pages/payment/SuccessPayment.jsx";
import CheckoutPage from "./pages/payment/CheckoutPage.jsx";
import ReviewForm from "./components/homeComponents/ReviewForm.jsx";
import PagenotFound from "./pages/pagenotfound/PagenotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/halls" element={<Searchlist/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup />} />
      <Route path="halls/register" element={<Signup />} />
      <Route path="halls/login" element={<Login/>}/>
      <Route path="/fhalls/:id" element={<BookingHall/>} />
      <Route path="/contact" element={<Contactus/>} />
      <Route path="/feedback" element={<ReviewForm/>} />
      <Route path="/forgetpassword" element={<Forgetpsw/>} />
      <Route path="/resetpassword" element={<Resetpsw/>} />
      <Route path='/payment/checkout' element={<CheckoutPage/>}></Route>
      <Route path='/payment/fail' element={<FailPayment/>}></Route>
      <Route path='/payment/success' element={<SuccessPayment/>}></Route>
      <Route path='*' element={<PagenotFound/>}></Route>
    </Routes>
    
    
  );
}

export default App;
