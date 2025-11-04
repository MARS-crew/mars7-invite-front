import { createBrowserRouter } from "react-router-dom";
import BotChatPage from "../page/testChat/BotChatPage";
import ApplicationForm from "../page/form/ApplicationForm";
import SubmitForm from "../page/form/SubmitForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BotChatPage />,
  },
  {
    path: "/form",
    element: <ApplicationForm />,
  },
  {
    path: "/submit",
    element: <SubmitForm />,
  },
]);

export default router;
