import React, { useState } from "react";
import Axios from "axios";

function RegisterForm() {
  const [id, setid] = useState("0");
  const [nombre, setnombre] = useState("");
  const [usuario, setusuario] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setrol] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/usuarios", {
      id: id,
      nombre: nombre,
      usuario: usuario,
      password: password,
      rol: rol,
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("CUENTA CREADA CON ÉXITO");
      }
    });
  };

  return (
    <div className="loginForm">
      <form>
        <h4>Register Here</h4>
        <label htmlFor="id">id*</label>
        <input
          className="textInput"
          type="text"
          name="id"
          onChange={(e) => setid(e.target.value)}
          placeholder="Enter your id"
          required
        />
        <label htmlFor="nombre">nombre*</label>
        <input
          className="textInput"
          type="text"
          name="nombre"
          onChange={(e) => setnombre(e.target.value)}
          placeholder="Enter your nombre Address"
          required
        />
        <label htmlFor="usuario">usuario*</label>
        <input
          className="textInput"
          type="text"
          name="usuario"
          onChange={(e) => setusuario(e.target.value)}
          placeholder="Enter your usuario"
          required
        />
        <label htmlFor="password">Password*</label>
        <input
          className="textInput"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          required
        />
        <label htmlFor="rol">rol*</label>
        <input
          className="textInput"
          type="text"
          name="rol"
          onChange={(e) => setrol(e.target.value)}
          placeholder="Enter your rol"
          required
        />
        <input
          className="button"
          type="submit"
          onClick={register}
          value="Create an account"
        />
        <h1
          style={{
            fontSize: "15px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {registerStatus}
        </h1>
      </form>
    </div>
  );
}

export default RegisterForm;