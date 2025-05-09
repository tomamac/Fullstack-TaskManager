import "./styles/App.css";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Modal from "./components/modal";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Landing />
      {/* <Dashboard /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <Footer />
    </>
  );
}

export default App;
