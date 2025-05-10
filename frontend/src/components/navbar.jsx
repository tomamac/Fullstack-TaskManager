import Modal from "./modal";
import { useState } from "react";
import Register from "../pages/register";
import Login from "../pages/login";
import { Link } from "react-router";

function Navbar({ isLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  function handleOpenModal(type) {
    setModalType(type);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setModalType("");
  }

  function renderModal() {
    switch (modalType) {
      case "register":
        return <Register handleCloseModal={handleCloseModal} />;
      case "login":
        return <Login handleCloseModal={handleCloseModal} />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="row navbar">
        <div className="col-7">
          <Link to="/" style={{ cursor: "pointer" }}>Taskit</Link>
        </div>
        <div className="col-5 row" style={{ justifyContent: "flex-end" }}>
          {isLoggedIn ? (
            <>
              <button href="" style={{ margin: "10px", cursor: "pointer" }}>
                Dashboard
              </button>
              <button style={{ margin: "10px", cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <>
              <button
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("register");
                }}
              >
                Register
              </button>
              <button
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("login");
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {renderModal()}
      </Modal>
    </>
  );
}

export default Navbar;
