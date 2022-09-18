import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoute";
import { useState } from "react";
import Context from "./context/Context";
import Checkout from "./components/Checkout";
import { useEffect } from "react";
function App() {
  const [userName, setUserName] = useState("john");
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState<any>({});
  const [cart, setCart] = useState(0);
  const [summary, setSummary] = useState<any>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const handleTabClose = (event:any) => {
      localStorage.removeItem("user")
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div className="wrapper">
       <Context.Provider
            value={{
              userName,
              setUserName,
              products,
              setProducts,
              qty,
              setQty,
              cart,
              setCart,
              summary,
              setSummary,
              total,
              setTotal,
            }}
          >
      <BrowserRouter>
        <Routes>
         
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
