import Modal from "./modal";
import { useState } from "react";
import Register from "../pages/register";
import Login from "../pages/login";
import { Link, useNavigate } from "react-router";
// import axios from "axios";
import { useSnackDispatch } from "../contexts/snackcontext";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const snackdispatch = useSnackDispatch();
  const navigate = useNavigate();

  function handleOpenModal(type) {
    setModalType(type);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setModalType("");
  }

  async function handleLogout() {
    // try {
    //   const res = await axios.get(
    //     "https://taskit-auth.onrender.com/api/auth/logout"
    // "http://localhost:8001/api/auth/logout",
    // {
    //   withCredentials: true,
    // }
    // );

    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
    snackdispatch({ type: "show", message: "ออกจากระบบเรียบร้อยแล้ว" });
    //   console.log(res.data);
    // } catch (error) {
    //   console.log("test");
    //   snackdispatch({ type: "show", message: "กรุณาลองใหม่อีกครั้ง" });
    //   console.log("error ", error);
    // }
  }

  function renderModalContent() {
    switch (modalType) {
      case "register":
        return <Register handleCloseModal={handleCloseModal} />;
      case "login":
        return (
          <Login
            handleCloseModal={handleCloseModal}
            setIsLoggedIn={setIsLoggedIn}
          />
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div className="row navbar">
        <div className="col">
          <Link to="/" style={{ cursor: "pointer" }}>
            Taskit
          </Link>
        </div>
        <div className="col-auto row" style={{ justifyContent: "flex-end" }}>
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                style={{ margin: "10px", cursor: "pointer" }}
              >
                แดชบอร์ด
              </Link>
              <button
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={handleLogout}
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <button
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("register");
                }}
              >
                สมัครสมาชิก
              </button>
              <button
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal("login");
                }}
              >
                เข้าสู่ระบบ
              </button>
            </>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {renderModalContent()}
      </Modal>
    </>
  );
}

export default Navbar;
