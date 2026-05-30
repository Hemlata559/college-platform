
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import CollegePage from "../pages/CollegePage";
import ComparePage from "../pages/ComparePage";
import PredictorPage from "../pages/PredictorPage";
import DiscussionsPage from "../pages/DiscussionsPage";
import SavedPage from "../pages/SavedPage";
import LoginPage from "../pages/LoginPage";
import AuthCallbackPage from "../pages/AuthCallbackPage";

import ProtectedRoute from "../components/ProtectedRoute";

type Props = {
  currentUser: any;
  setCurrentUser: (value: any) => void;
};

const AppRoutes = ({ currentUser, setCurrentUser }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/college/:id" element={<CollegePage />} />

      <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />

      <Route
        path="/compare"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <ComparePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/predictor"
        element={<PredictorPage />}
      />

      <Route
        path="/discussions"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <DiscussionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <SavedPage currentUser={currentUser} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/auth/callback"
        element={<AuthCallbackPage setCurrentUser={setCurrentUser} />}
      />
    </Routes>
  );
};

export default AppRoutes;
