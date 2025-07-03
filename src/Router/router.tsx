import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import Home from "../pages/Home";
import React from "react";
import ManageUsers from "../pages/ManageUsers";
import Helper from "../pages/Helper"

import Signin from "../pages/Signin";
//import Signup from "../pages/Signup";



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
      { path: "listuser", element: <ManageUsers /> },
       { path: "listhelper", element: <Helper /> },
	
	  { path: "signin", element: <Signin /> },
	//  {path: "signup", element: <Signup/>}
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