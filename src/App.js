import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
// admin
import CreateUsers from "./pages/admin-pages/Users";
import Dashboard from "./pages/admin-pages/Dashboard"

// user 
import UserDashboard from './pages/user-pages/UserDashboard';
import Aboutus from './pages/user-pages/Aboutus'
import Clients from "./pages/admin-pages/Clients";
import Role from "./pages/admin-pages/Role";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ItwineAdvantages from "./pages/user-pages/ItwineAdvantages";
import Service from "./pages/user-pages/Service";
import Leave from "./pages/user-pages/Leave";
import EmpLeave from "./pages/admin-pages/EmpLeave";
import News from "./pages/admin-pages/News";
import Projects from "./pages/admin-pages/Projects";
import Holidays from "./pages/admin-pages/Holidays";
import Demo from "./pages/admin-pages/Demo";
import Teams from "./pages/admin-pages/Teams";
import Events from "./pages/admin-pages/Events"
import SmsTemplate from "./pages/admin-pages/SmsTemplate";
import Practice from "./pages/admin-pages/Practice";
import Demoone from "./pages/admin-pages/Demoone";
import Fetchapidummy from "./pages/admin-pages/Fetchapidummy";

function App() {

  return (
    <div className="App">
      <div className="conatiner-fluid">
        <div className="wrapper">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/admin-dashboard" element={<Dashboard />} />
            <Route exact path="/clients" element={<Clients />} />
            <Route exact path="/role" element={<Role />} />
            <Route exact path="/emp-leave" element={<EmpLeave />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/holidays" element={<Holidays />} />
            <Route exact path="/teams" element={<Teams/>}/>
            <Route exact path="/demo" element={<Demo />} />
            <Route exact path="/create-user" element={<CreateUsers />} />
            <Route exact path="/user-dashboard" element={<UserDashboard />} />
            <Route exact path="/aboutus" element={<Aboutus />} />
            <Route exact path="/itwineads" element={<ItwineAdvantages />} />
            <Route exact path="/service" element={<Service />} />
            <Route exact path="/leave" element={<Leave />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/sms" element={<SmsTemplate />} />
            <Route exact path="/practice" element={<Practice />} />
            <Route exact path="/practice" element={<Practice />} />
            <Route exact path="/demoone" element={<Demoone />} />
            <Route exact path="/dummyapi" element={<Fetchapidummy />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;