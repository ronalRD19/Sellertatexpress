import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Importa useHistory para redireccionar
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap

function LoginForm() {
  const [usuario, setusuario] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const history = useHistory(); // Obtiene la instancia de history

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/auth/login", {
      usuario: usuario,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        // Si el inicio de sesión es exitoso, redirige a la vista de inicio
        history.push("/inicio");
      }
    });
  };

  return (
    <div className="loginForm">
      <img src="/Logo.png" alt="Logo" className="logo" />
      <form onSubmit={login}> {/* Usa onSubmit para enviar el formulario */}
        <h4>Login Here</h4>
        <label htmlFor="usuario">Username*</label>
        <input
          className="textInput"
          type="text"
          name="usuario"
          value={usuario}
          onChange={(e) => setusuario(e.target.value)}
          placeholder="Enter your usuario"
          required
        />
        <label htmlFor="password">Password*</label>
        <input
          className="textInput"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          required
        />
        <input className="button" type="submit" value="Login" />
        <h1
          style={{
            color: "red",
            fontSize: "15px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {loginStatus}
        </h1>
      </form>
    </div>
  );
}

export default LoginForm;