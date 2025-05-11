import { useState } from "react";
import "../styles/modal-form.css";
import axios from "axios";
import { useSnackDispatch } from "../contexts/snackcontext";
import { useNavigate } from "react-router";

function Login({ handleCloseModal, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const snackdispatch = useSnackDispatch();
  const navigate = useNavigate();

  async function postLogin() {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/auth/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUsername("");
      setPassword("");

      setIsLoggedIn(true);
      navigate("/dashboard");
      snackdispatch({ type: "show", message: "เข้าสู่ระบบสำเร็จ" });
      console.log(res.data);
      handleCloseModal();
    } catch (error) {
      snackdispatch({ type: "show", message: `${error.response.data.error}` });
      console.log("error ", error);
    }
  }

  function submitForm(e) {
    e.preventDefault();

    postLogin();
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="username"
          className="row"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          type="password"
          name="password"
          className="row"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button className="submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
