import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import DictionaryPage from "../../features/dictionary/DictionaryPage";
import LearnThroughImagesPage from "../../features/learn-through-images/LearnThroughImagesPage";
import LoginPage from "../../features/user/LoginPage";
import RegisterPage from "../../features/user/RegisterPage";
import LearnFlashCardPage from "../../features/flash-card/LearnFlashCardPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dictionary" />,
      },
      {
        path: "/dictionary",
        element: <DictionaryPage />,
      },
      {
        path: "/learn-through-images",
        element: <LearnThroughImagesPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/learn-flashcard",
        element: <LearnFlashCardPage />,
      },
    ],
  },
]);

export default router;
