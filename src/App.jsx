import React, { createContext, Suspense, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdmissionForm from "./forms/AdmissionForm";
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const UserContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    console.log("userData________", loggedInUser);
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div
                  style={{ height: "100vh" }}
                  className=" w-100 d-flex align-items-center justify-content-center"
                >
                  {" "}
                  <Spinner animation="grow" />
                </div>
              }
            >
              <DefaultLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="admission"
            element={
              <PrivateRoute>
                <AdmissionForm />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="transaction"
            element={
              <PrivateRoute>
                <Transaction />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" />
    </UserContext.Provider>
  );
};

export default App;
