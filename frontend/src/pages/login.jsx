import Modal from "../components/modal";
import { useState } from "react";
import "../styles/modal-form.css";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  function submitForm(formData) {
    setLoginData({
      username: formData.get("username"),
      password: formData.get("password"),
    });
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form action={submitForm}>
        <input
          type="text"
          name="username"
          className="row"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          className="row"
          placeholder="Password"
        />
        <button className="submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
