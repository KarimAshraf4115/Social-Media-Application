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
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PostDetails from "./pages/PostDetails/PostDetails";
import useNetworkState from "./../node_modules/react-use/esm/useNetworkState";
import Offline from "./Offline/Offline";
const queryClient = new QueryClient();
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
      {
        path: "postDetails/:id",
        element: (
          <Protected>
            <PostDetails />
          </Protected>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const networkState = useNetworkState();
  if (!networkState.online) {
    return <Offline />;
  }
  return (
    <>
      <AppToaster />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
