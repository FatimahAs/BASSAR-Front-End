import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Home from "./components/Home";
import TripNavigator from "./components/Map"; // بدون تعديل
import NormalUserForm from "./components/NormalUserForm";
import HelperUserForm from "./components/HelperUserForm";
import NormalUserLogin from "./components/NormalUserLogin";
import HelperUserLogin from "./components/HelperUserLogin";
import HelperUserPage from "./components/HelperUserPage";
import ServiceList from "./components/ServiceList";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<TripNavigator />} />
          <Route path="/normal" element={<NormalUserForm />} />
          <Route path="/helper" element={<HelperUserForm />} />
          <Route path="/normaluser/login" element={<NormalUserLogin />} />
          <Route path="/helper/login" element={<HelperUserLogin />} />
          <Route path="/helper/page/:id" element={<HelperUserPage />} />
          <Route path="/service-list/:serviceType" element={<ServiceList />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

