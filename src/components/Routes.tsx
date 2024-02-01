import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import Home from "./home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
