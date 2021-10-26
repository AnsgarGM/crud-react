import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
      errores: [],
    };
  }

  verificarError(elemento) {
    return this.state.errores.indexOf(elemento) !== -1;
  }

  enviarDatos = (e) => {
    e.preventDefault();
    const { nombre, correo } = this.state;    
    
    var errores = [];
    if (!nombre) errores.push("Error_nombre");
    if (!correo) errores.push("Error_correo");
    this.setState({ errores: errores });
    if (errores.length > 0) return false;

    var datosEnviar = { nombre: nombre, correo: correo };

    fetch(Api + "?insertar=1", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.props.history.push("/");
      })
      .catch(console.log);
  };

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state, errores:[] });
  };

  render() {
    const { nombre, correo } = this.state;

    return (
      <div className="card mt-3">
        <div className="card-header">Crear empleado</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={this.cambioValor}
                name="nombre"
                id="nombre"
                className={
                  ((this.verificarError("Error_nombre")) ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el nombre del empleado
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input
                type="text"
                value={correo}
                onChange={this.cambioValor}
                name="correo"
                id="correo"
                className={
                  ((this.verificarError("Error_correo")) ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el correo del empleado
              </small>
            </div>
            <div className="btn-group mt-3" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar nuevo empleado
              </button>
              <Link to={"/"} className="btn btn-primary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    );
  }
}

export default Crear;
