import { useNavigate } from "react-router-dom";
import Products from "./Products";
import { AiOutlineLogout } from "react-icons/ai";
const Dashboard = () => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col bg-red-100 h-screen">
      <div className="flex items-center justify-center flex items-center bg-red-100">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          <div className="hover:bg-red-400 rounded-full">
            <AiOutlineLogout className="fill-red-800 font-bold text-3xl" />
          </div>
          <p>Log out</p>
        </div>
      </div>
        <Products />
    </div>
  );
};

export default Dashboard;
