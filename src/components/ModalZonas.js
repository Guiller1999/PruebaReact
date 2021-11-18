import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TablasStyle.css';

function ModalZonas(props) {

    const [data, setData] = useState({});

    useEffect(() => {
       fetch('https://localhost:44378/api/persona/consultarPersonaSueldo', {
           method: 'POST',
           body: JSON.stringify({
               CodZona: parseInt(props.dataSeleccionada)
           }),
           headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
           }
       })
       .then(res => res.json())
       .then(r => setData(r.result)) 
    });

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Lista de Personas por Zona</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-striped table-hover">
                            <thead className="thead-Persona text-center">
                                <tr>
                                    <td>Cod</td>
                                    <td>Nombre</td>
                                    <td>Sueldo</td>
                                </tr>
                            </thead>
                            <tbody className="tablaPersona" id="table_persona">
                                {data.length >0  ? data.map(persona => (
                                    <tr key={persona.codPersona} className="text-center ">
                                        <td>{persona.codPersona}</td>
                                        <td>{persona.nomPersona}</td>
                                        <td>{persona.sueldo}</td>
                                    </tr>
                                )):
                                <tr>
                                    <td colSpan="3" className="text-center">Cargando Datos</td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default ModalZonas;