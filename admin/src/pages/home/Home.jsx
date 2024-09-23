import AdminDashboard from "../../components/dashboard/dashboard";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <AdminDashboard/>
      </div>
    </div>
  );
};

export default Home;
