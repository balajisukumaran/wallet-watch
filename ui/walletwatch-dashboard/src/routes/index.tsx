import { createBrowserRouter, Navigate } from "react-router-dom";

import { ROUTES } from "./constants";

// import {rotectedRoute}

import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import DashboardLayout from "@/components/app/Layouts/DashboardLayout";
import Budget from "@/pages/Budget";
import Income from "@/pages/Income";
import Transactions from "@/pages/Transactions";
import Logout from "@/pages/Logout";
import { ProtectedRoute, PublicRoute } from "@/auth";

const publicRoutes = [
  {
    path: ROUTES.DEFAULT,
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <Signup />,
      },
    ],
  },
];

const protectedRoutes = [
  {
    path: ROUTES.DEFAULT,
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.LOGOUT,
        element: <Logout />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardLayout />,
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
    ],
  },
];

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
]);
