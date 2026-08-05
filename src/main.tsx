import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import Layout from "./kernel/presentation/Layout.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import About from "./pages/about/About.tsx";
import ContactUs from "./pages/contact-us/ContactUs.tsx";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import App from "./kernel/core/App.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import VideoPage from "./pages/video/VideoPage.tsx";
import VideoDetails from "./pages/video/VideoDetails.tsx";

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"/about",
        element:<About/>
      },{
        path:"/contact",
        element:<ContactUs />
      },{
        path:"/login",
        element:<Login />
      },{
        path:"/signup",
        element:<SignUp />
      },{
        path:"/dashboard",
        element:<DashboardPage />
      },{
        path:"/video",
        element:<VideoPage />,
      },
        {
            path:"/video/:id",
            element:<VideoDetails />,
        }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router}/>
    </App>
  </React.StrictMode>,
)
