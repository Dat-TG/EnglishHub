import { createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import HomePage from "../../features/home/HomePage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
