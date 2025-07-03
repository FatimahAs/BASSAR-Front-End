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



function Layout() {
  return (
    <>
    <div className="min-h-screen flex flex-col"> 		
 
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
         { path: "user", element: <UserDashboard /> },
	
	  { path: "signin", element: <Signin /> },
	  {path: "signup", element: <Signup/>}
    ],
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