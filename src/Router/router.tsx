import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import Home from "../pages/Home";
import React from "react";
import ManageUsers from "../pages/admin/ManageUsers";
import Helper from "../pages/admin/Helper"

import Signin from "../pages/Signin";
import AdminDashboard from "../pages/admin/Dashboard";
import Signup from "../pages/Signup";
import HelperDashboard from "../pages/helper/HelperDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import HelperHistory from "../pages/helper/HelperHistory";
import UserList from "../pages/user/UserList";
import UserHistory from "../pages/user/UserHistory";

import UserDanger from "../pages/user/UserDanger";



import Map from "../components/Map";
import ServiceList from "../components/ServiceList";
import SignUpHelper from "../pages/SignupHelper";
import HelpReq from "../pages/helper/HelpReq";


function Layout() {
  return (
    <>
    <div className=""> 		
 
		<main className="flex-grow">
			<Outlet />
	    </main>
		
		</div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
         { path: "admin", element: <AdminDashboard /> },
      { path: "listuser", element: <ManageUsers /> },
      { path: "listhelper", element: <Helper /> },

      { path: "helper", element: <HelperDashboard /> },
      { path: "helphistory", element: <HelperHistory /> },
      
 { path: "helpreq", element: <HelpReq /> },
      { path: "user", element: <UserDashboard /> },
         { path: "userhistory", element: <UserHistory /> },
      { path: "userlist", element: <UserList /> },

       { path: "dangerlist", element: <UserDanger /> },


      { path: "/service-list/:serviceType", element: <ServiceList /> },
    

	
	  { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
    {path:"signuphelper", element:<SignUpHelper/>}
    ],
  },


  {
    path: "/map",
    element: <Map />
  },

]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;