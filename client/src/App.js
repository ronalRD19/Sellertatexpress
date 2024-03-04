import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
/*import ClientesForm from "./ClientesForm";
import ClientesForm1 from './ClientesForm1';
import ClientesForm3 from './ClientesForm3';*/

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/usuarios">
            <RegisterForm />
          </Route>
          <Route path="/auth">
            <LoginForm />
          </Route>
          {/* Ruta predeterminada, por si el usuario accede a una URL no definida */}
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
