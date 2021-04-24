import { Routes, Route } from "react-router";
import Orders from "./components/pages/Orders";
import Menu from "./components/pages/Menu";
import NewDish from "./components/pages/NewDish";
import Sidebar from "./components/ui/Sidebar";

function App() {
  return (
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
  );
}

export default App;
