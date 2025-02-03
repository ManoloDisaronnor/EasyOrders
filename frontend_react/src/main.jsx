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
import RutaNotFound from './Pages/RutaNotFound'
import { TemaProvider } from './Componentes/TemaProvider'
import FormularioAltaCliente from './Pages/FormularioAltaCliente'
import ListaClientes from './Pages/ListaClientes'

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
      {
        path: "/altaCliente",
        element: <FormularioAltaCliente />,
      },
      {
        path: "/listaClientes",
        element: <ListaClientes />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <TemaProvider>
    <RouterProvider router={router} />
  </TemaProvider>
)
