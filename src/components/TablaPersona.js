import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TablasStyle.css';

function TablaPersona(props) {

    useEffect(() => {
        props.cargarDataPersonas();
    }, []);

    const handleEliminar = (persona) => {
        console.log(persona);
        if(window.confirm(`Esta seguro que quiere eliminar los datos de ${persona.nomPersona}`)) {
            fetch('https://localhost:44378/api/persona', {
                method: 'DELETE',
                body: JSON.stringify({
                    CodPersona: persona.codPersona
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => {
                if(res.ok) {
                    props.cargarDataPersonas();
                    props.cargarRegistro();
                }
            });
        }
    }

    const handleEditar = (persona) => {
        props.setTipoForm('editar');
        props.setForm({
            CodPersona: persona.codPersona,
            NomPersona: persona.nomPersona,
            FecNacimiento: persona.fecNacimiento.split('T')[0],
            CodSector: persona.codSector,
            CodZona: persona.codZona,
            Sueldo: persona.sueldo
        });
        cargarZonas(persona);
    }

    const cargarZonas = (persona) => {
        fetch('https://localhost:44378/api/zona', {
            method: 'POST',
            body: JSON.stringify({
                CodSector: parseInt(persona.codSector)
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            props.setZonas(data);
            props.setRegistro(persona.codPersona);
        });
    }

    return (
        <div className="table-responsive-sm" style={{'width': '100%','margin': '20px auto'}}>
            <table className="table">
                <thead className="thead-Sector text-center">
                    <tr className="text-center">
                        <td>Cod</td>
                        <td>Nombre</td>
                        <td>Fecha Nacimiento</td>
                        <td>Sector</td>
                        <td>Zona</td>
                        <td>Sueldo</td>
                        <td>Acciones</td>
                    </tr>
                </thead>
                <tbody className="tablaSectores" id="table_body">
                    {props.dataPersonas.length > 0 ? props.dataPersonas.map(persona => (
                        <tr className="text-center" key={persona.codPersona}>
                            <td>{persona.codPersona}</td>
                            <td>{persona.nomPersona}</td>
                            <td>{persona.fecNacimiento.split('T')[0]}</td>
                            <td>{persona.desSector}</td>
                            <td>{persona.desZona}</td>
                            <td>{persona.sueldo}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEditar(persona)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleEliminar(persona)}>Eliminar</button>
                            </td>
                        </tr>
                    )):
                    (<tr><td colSpan="7" className="text-center">No hay datos</td></tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TablaPersona;