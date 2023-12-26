import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import DictionaryPage from "../../features/dictionary/DictionaryPage";

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
    ],
  },
]);

export default router;
