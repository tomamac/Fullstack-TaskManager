import { useState } from "react";
import "../styles/modal-form.css";
import axios from "axios";
import { useSnackDispatch } from "../contexts/snackcontext";

function Register({ handleCloseModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const snackdispatch = useSnackDispatch();

  async function postRegister() {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/auth/register",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUsername("");
      setPassword("");

      snackdispatch({ type: "show", message: "สมัครสมาชิกสำเร็จ" });
      console.log(res.data);
      handleCloseModal();
    } catch (error) {
      snackdispatch({ type: "show", message: `${error.response.data.error}` });
      console.log("error ", error);
    }
  }

  function submitForm(e) {
    e.preventDefault();

    if (password !== confirmpassword) {
      snackdispatch({ type: "show", message: "กรุณากรอกรหัสใหม่อีกครั้ง" });
      return;
    }

    postRegister();
  }

  return (
    <div className="form-container">
      <h2>Register</h2>
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
        <input
          type="password"
          name="confirmpassword"
          className="row"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmpassword}
          required
        />
        <button className="submit" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
