import { createBrowserRouter, Navigate } from "react-router-dom";

import { ROUTES } from "./constants";

import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import Layout from "@/components/app/Layout";
import Budget from "@/pages/Budget";
import Income from "@/pages/Income";
import Transactions from "@/pages/Transactions";
import Logout from "@/pages/Logout";

export const router = createBrowserRouter([
  {
    path: ROUTES.DEFAULT,
    element: <Navigate to={ROUTES.LOGIN} />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Budget />,
      },
      {
        path: ROUTES.BUDGET,
        element: <Budget />,
      },
      {
        path: ROUTES.INCOME,
        element: <Income />,
      },
      {
        path: ROUTES.TRANSACTION,
        element: <Transactions />,
      },
    ],
  },
  {
    path: ROUTES.LOGOUT,
    element: <Logout />,
  },
]);
