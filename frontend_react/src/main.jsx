import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from './Pages/Home'
import MenuApp from './Componentes/Menu'
import RutaNotFound from './Componentes/RutaNotFound'

let router = createBrowserRouter([
  {
    path: "/",
    element: <MenuApp />,
    errorElement: (
      <>
        <MenuApp />
        <RutaNotFound />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
)
