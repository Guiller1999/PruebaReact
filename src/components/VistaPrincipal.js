import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Formulario from './Formulario';
import TablaPersona from './TablaPersona';
import VistaInformacion from './VistaInformacion';

function VistaPrincipal(props) {
    // Estados
    const [dataPersonas, setDataPersonas] = useState({});
    const [registro, setRegistro] = useState('');
    const [form, setForm] = useState({
        NomPersona: '',
        FecNacimiento: '',
        CodSector: 0,
        CodZona: 0,
        Sueldo: 0
    });
    const [tipoForm , setTipoForm] = useState('crear');
    const [zonas, setZonas] = useState(null);

    const cargarDataPersonas = async () => {
        let response = await fetch('https://localhost:44378/api/persona');
        let data = await response.json();
       setDataPersonas(data);
    }

    const cargarRegistro = async () => {
        let response = await fetch('https://localhost:44378/api/codigo');
        let data = await response.json();
        setRegistro(data);
    }

    return (
        <>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">Prueba</Link>
        
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/">Nuevo</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/informacion">Listar Información</Link></li>
                    </ul> 
                </nav>
                <button onClick = {() => {
                    let ruta = window.location.href;
                    let nuevaRuta = ruta.substring(0, ruta.lastIndexOf('/'));
                    
			        console.log(nuevaRuta);
                    localStorage.setItem('logeado', false);
                    props.setLogeado(false);
                    //window.location.href = nuevaRuta + '/';
                    }} 
                    className="btn btn-danger">
                    Salir
                </button>
                <Switch>
                    <Route exact path="/">    
                        <div className="bg-dark m-5 text-white text-center">
                            <h1>REGISTRO DE NUEVA PERSONA</h1>
                        </div>
                        <Formulario 
                            cargarDataPersonas={cargarDataPersonas} 
                            registro={registro}
                            cargarRegistro={cargarRegistro}
                            form={form}
                            setForm={setForm}
                            tipoForm={tipoForm}
                            setTipoForm={setTipoForm}
                            zonas={zonas}
                            setZonas={setZonas}
                        />
                        <TablaPersona 
                            dataPersonas={dataPersonas} 
                            cargarDataPersonas={cargarDataPersonas}
                            cargarRegistro={cargarRegistro}
                            setForm={setForm}
                            setTipoForm={setTipoForm}
                            setZonas={setZonas}
                            setRegistro={setRegistro}
                        />
                    </Route>
                    <Route exact path="/informacion">
                        <VistaInformacion />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default VistaPrincipal;