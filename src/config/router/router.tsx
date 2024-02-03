import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import DictionaryPage from "../../features/dictionary/DictionaryPage";
import LearnThroughImagesPage from "../../features/learn-through-images/LearnThroughImagesPage";
import LoginPage from "../../features/user/LoginPage";
import RegisterPage from "../../features/user/RegisterPage";
import FlashCardSetsPage from "../../features/flash-card/FlashCardSetsPage";
import LearnFlashCardPage from "../../features/flash-card/LearnFlashCardPage";
import CreateSet from "../../features/flash-card/CreateSet";
import EditSet from "../../features/flash-card/EditSet";
import SpellingCheckPage from "../../features/spell-check/SpellCheckPage";
import GrammarCheckPage from "../../features/grammar-check/GrammarCheckPage";
import AboutPage from "../../features/about/AboutPage";

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
        element: <FlashCardSetsPage />,
      },
      {
        path: "/learn-flashcard/:ListId",
        element: <LearnFlashCardPage />,
      },
      {
        path: "/create-set",
        element: <CreateSet />,
      },
      {
        path: "/edit-set/:ListId",
        element: <EditSet />,
      },
      {
        path: "/check-spelling",
        element: <SpellingCheckPage />,
      },
      {
        path: "check-grammar",
        element: <GrammarCheckPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;
