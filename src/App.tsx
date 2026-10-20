import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import AppToaster from "./AppToaster/AppToaster";
import AuthContextProvider from "./context/AuthContextProvider";
import Protected from "./components/ProtectedRoutes/Protected";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Protected>
            {" "}
            <Home />{" "}
          </Protected>
        ),
      },
      {
        path: "home",
        element: (
          <Protected>
            {" "}
            <Home />{" "}
          </Protected>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AppToaster />
      <AuthContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </AuthContextProvider>
    </>
  );
}
