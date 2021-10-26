import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Editar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      empleado: [],
    };
  }

  cambioValor = (e) => {
    const state = this.state.empleado;
    state[e.target.name] = e.target.value;
    this.setState({ empleado: state });
  };

  enviarDatos = (e) => {
    e.preventDefault();
    const { id, nombre, correo } = this.state.empleado;

    var datosEnviar = { id: id, nombre: nombre, correo: correo };

    fetch(Api + "?actualizar=1", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.props.history.push("/");
      })
      .catch(console.log);
  };

  componentDidMount() {

    fetch(Api + "?consultar=" + this.props.match.params.id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({ datosCargados: true, empleado: datosRespuesta[0] });
        console.log("=>" + datosRespuesta);
      })
      .catch(console.log);
  }

  render() {
    const { datosCargados, empleado } = this.state;

    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card mt-3">
          <div className="card-header">Editar empleado</div>
          <div className="card-body">
            <form onSubmit={this.enviarDatos}>
              <div className="form-group">
                <label htmlFor="">Clave:</label>
                <input
                  type="text"
                  readOnly
                  value={empleado.id}
                  name="id"
                  id="id"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Clave{" "}
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  value={empleado.nombre}
                  onChange={this.cambioValor}
                  name="nombre"
                  id="nombre"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el nombre del empleado
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="correo">Correo</label>
                <input
                  type="text"
                  value={empleado.correo}
                  onChange={this.cambioValor}
                  name="correo"
                  id="correo"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el correo del empleado
                </small>
              </div>
              <div className="btn-group mt-3" role="group" aria-label="">
                <button type="submit" className="btn btn-success">
                  Actualizar empleado
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
}

export default Editar;
