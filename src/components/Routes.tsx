import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import Home from "./home/Home";
import Chat from "./chat-list/chat/Chat";

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
  {
    path: "/chats/:_id",
    element: <Chat />,
  },
]);

export default router;
