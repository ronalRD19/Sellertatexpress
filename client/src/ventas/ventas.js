import React, { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap
import "./ventas.css";

function VentasForm() {
  const [id, setId] = useState("");
  const [fechaVenta, setFechaVenta] = useState("");
  const [montoTotal, setMontoTotal] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/ventas", {
      id: id,
      fechaVenta: fechaVenta,
      montoTotal: montoTotal,
      idCliente: idCliente,
      idUsuario: idUsuario
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("Venta efectiva");
      }
    });
  };

  return (
    <form onSubmit={register}>
      <label htmlFor="id">ID:</label>
      <input type="text" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} required />
      <br />

      <label htmlFor="fechaVenta">Fecha de Venta:</label>
      <input type="date" id="fechaVenta" name="fechaVenta" value={fechaVenta} onChange={(e) => setFechaVenta(e.target.value)} required />
      <br />

      <label htmlFor="montoTotal">Monto Total:</label>
      <input type="text" id="montoTotal" name="montoTotal" value={montoTotal} onChange={(e) => setMontoTotal(e.target.value)} required />
      <br />

      <label htmlFor="idCliente">ID del Cliente:</label>
      <input type="text" id="idCliente" name="idCliente" value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required />
      <br />

      <label htmlFor="idUsuario">ID del Usuario:</label>
      <input type="text" id="idUsuario" name="idUsuario" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} required />
      <br />

      <button type="submit">Registrar Venta</button>
      <p>{registerStatus}</p>
    </form>
  );
}

export default VentasForm;
