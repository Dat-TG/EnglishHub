import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import DictionaryPage from "../../features/dictionary/DictionaryPage";
import LearnThroughImagesPage from "../../features/learn-through-images/LearnThroughImagesPage";

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
    ],
  },
]);

export default router;
