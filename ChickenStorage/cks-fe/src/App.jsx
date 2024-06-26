import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./Component/Layout/Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Component/Page/Dashboard/Root";
import Container from "./Component/Layout/Container";
import Menu from "./Component/Page/Menu/Root";
import MenuAdd from "./Component/Page/Menu/Add";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.esm";
import EditProd from "./Component/Page/Menu/Edit";
import EditMenu from "./Component/Page/Menu/Edit";
import Order from "./Component/Page/Order/Root";
import ShowOrder from "./Component/Page/Order/Show";
import HistoryOrder from "./Component/Page/Order/History";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/Menu",
      element: <Menu />,
    },
    {
      path: "/MenuAdd",
      element: <MenuAdd />,
    },
    {
      path: "/EditMenu/:id",
      element: <EditMenu />,
    },
    {
      path: "/Order",
      element: <Order />,
    },
    {
      path: "/OrderOnProcess",
      element: <ShowOrder />,
    },
    {
      path: "/HistoryOrder",
      element: <HistoryOrder />,
    },
  ]);

  return (
    <>
      <Header />
      <div style={{ marginTop: "70px" }}></div>
      <div className="d-flex flex-row"></div>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </>
  );
}
