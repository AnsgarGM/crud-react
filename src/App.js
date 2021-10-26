import "./App.css";
import Listar from "./components/Listar";
import Crear from "./components/Crear";
import Editar from "./components/Editar";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>
            Sistema
          </Link>
          <Link className="nav-item nav-link" to={"/crear"}>
            Crear empleado
          </Link>
          <Link className="nav-item nav-link" to={"/editar"}>
            Editar empleado
          </Link>
        </div>
      </nav>

      <div className="container">
        <Route exact path="/" component={Listar}></Route>
        <Route path="/crear" component={Crear}></Route>
        <Route path="/editar/:id" component={Editar}></Route>
      </div>
    </Router>
  );
}

export default App;
