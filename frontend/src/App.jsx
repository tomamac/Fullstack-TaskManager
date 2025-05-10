import "./styles/App.css";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Modal from "./components/modal";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import {
  SnackProvider,
  useSnack,
  useSnackDispatch,
} from "./contexts/snackcontext";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const snackcontext = useSnack();
  const snackdispatch = useSnackDispatch();

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Dashboard /> */}
        {/* <Landing /> */}
        {/* <Login /> */}
        {/* <Register /> */}
      </Routes>
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
