import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { getCurrentAuthUser } from "./utils/api";
import { loadFromStorage, removeFromStorage, saveToStorage } from "./utils/storage";

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() =>
    loadFromStorage("currentUser", null)
  );

  useEffect(() => {
    if (currentUser) {
      saveToStorage("currentUser", currentUser);
    } else {
      removeFromStorage("authToken");
      removeFromStorage("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    const token = loadFromStorage<string | null>("authToken", null);
    if (!token) return;

    getCurrentAuthUser()
      .then((user) => {
        setCurrentUser(user.name || user.email);
      })
      .catch(() => {
        removeFromStorage("authToken");
        removeFromStorage("currentUser");
        setCurrentUser(null);
      });
  }, []);

  return (
    <div className="app-shell">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="app-main">
        <AppRoutes currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
