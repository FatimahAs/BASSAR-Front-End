import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "../pages/Home";





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