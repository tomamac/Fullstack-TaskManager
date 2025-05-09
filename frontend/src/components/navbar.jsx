import Modal from "./modal";
import { useState } from "react";
import Register from "../pages/register";
import Login from "../pages/login";

function Navbar({ isLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  function handleOpenModal(type) {
    setModalType(type);
    setIsModalOpen(true);
  }

  function renderModal() {
    switch (modalType) {
      case "register":
        return <Register />;
      case "login":
        return <Login />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="row navbar">
        <div className="col-7">
          <a style={{ cursor: "pointer" }}>Taskit</a>
        </div>
        <div className="col-5 row" style={{ justifyContent: "flex-end" }}>
          {isLoggedIn ? (
            <>
              <a href="" style={{ margin: "10px", cursor: "pointer" }}>
                Dashboard
              </a>
              <a style={{ margin: "10px", cursor: "pointer" }}>Logout</a>
            </>
          ) : (
            <>
              <a
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("register");
                }}
              >
                Register
              </a>
              <a
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("login");
                }}
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {renderModal()}
      </Modal>
    </>
  );
}

export default Navbar;
