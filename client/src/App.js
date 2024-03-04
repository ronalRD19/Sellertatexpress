import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from "./home/HomePage";
import AboutPage from "./home/AboutPage";
import Navbar from './nav/Navbar';
import LoginForm from "./login_registro/LoginForm";
import RegisterForm from "./login_registro/RegisterForm";
/*import ClientesForm from "./ClientesForm";
import ClientesForm1 from './ClientesForm1';
import ClientesForm3 from './ClientesForm3';*/


function App() {
  return (
    <Router>
      <div>
      <Navbar /> {/* Navbar siempre visible */}
        <Switch>
        <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/usuarios">
            <RegisterForm />
          </Route>
          <Route path="/auth">
            <LoginForm />
          </Route>
          {/* Ruta predeterminada, por si el usuario accede a una URL no definida */}
          <Route path="/">
            <HomePage  />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
