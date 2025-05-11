import "./styles/App.css";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import ProtectedRoute from "./components/protectedroute";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useSnack, useSnackDispatch } from "./contexts/snackcontext";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const snackcontext = useSnack();
  const snackdispatch = useSnackDispatch();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get("http://localhost:8001/api/auth/me", {
          withCredentials: true,
        });
        setIsLoggedIn(true);
        snackdispatch({
          type: "show",
          message: `ยินดีต้อนรับ ${res.data.displayname}`,
        });
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [snackdispatch]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {loading ? (
        <div className="content">
          <CircularProgress />
        </div>
      ) : (
        <Routes>
          <Route index element={<Landing />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* <Landing /> */}
          {/* <Login /> */}
          {/* <Register /> */}
        </Routes>
      )}
      <Snackbar
        open={snackcontext.isOpen}
        autoHideDuration={2000}
        onClose={() => snackdispatch({ type: "hide" })}
        message={snackcontext.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <Footer />
    </>
  );
}

export default App;
