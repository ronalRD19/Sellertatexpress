import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'; // Asegúrate de crear este archivo CSS para los estilos personalizados
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">Inicio</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/about">Acerca de</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/auth">Iniciar Sesión</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/usuarios">Registrarse</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;