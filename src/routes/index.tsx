import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import BotChatPage from "../page/testChat/BotChatPage";
import ApplicationForm from "../page/form/ApplicationForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <BotChatPage />,
  },
  {
    path: "/form",
    element: <ApplicationForm />,
  },
]);

export default router;
