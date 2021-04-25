import { Routes, Route } from "react-router";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import NewDish from "./pages/NewDish";
import Sidebar from "./ui/Sidebar";
import StorageContext from "../contexts/StorageContext";

function App() {
  return (
    <StorageContext>
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-2/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/new-dish" element={<NewDish />} />
          </Routes>
        </div>
      </div>
    </StorageContext>
  );
}

export default App;
