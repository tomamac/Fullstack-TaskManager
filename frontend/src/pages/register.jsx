import Modal from "../components/modal";
import { useState } from "react";
import "../styles/modal-form.css";

function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  function submitForm(formData) {
    if (formData.get("password") !== formData.get("confirmpassword")) {
      alert("invalid credentials");
      return;
    }

    setRegisterData({
      username: formData.get("username"),
      password: formData.get("password"),
    });
  }

  return (
    <div className="form-container">
      <h2>Register</h2>
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
        <input
          type="password"
          name="confirmpassword"
          className="row"
          placeholder="Confirm Password"
        />
        <button className="submit" type="submit">
          register
        </button>
      </form>
    </div>
  );
}

export default Register;
