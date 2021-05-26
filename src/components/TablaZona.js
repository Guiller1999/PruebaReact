import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './TablasStyle.css';

function TablaZona(props) {

    const [dataZonaSector , setData] = useState({});

    useEffect(() => {
        fetch('https://localhost:44378/api/zonasector')
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    const handleClick = (data) => {
        props.setDataSeleccionada(data);
    }

    return (

        <div className="table-responsive-sm" style={{'width': '60%', 'margin': '20px auto'}}>
            <table className="table">
                <thead className="thead-Sector text-center">
                    <tr className="text-center">
                        <td>Sector</td>
                        <td>Zona</td>
                        <td>Sueldo</td>
                    </tr>
                </thead>
                <tbody className="tablaSectores" id="table_body">
                    {dataZonaSector.length > 0 ? dataZonaSector.map(data => (
                        <tr key={data.codZona} className="text-center" onClick={() => handleClick(data.codZona)}
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <td>{data.desSector}</td>
                            <td>{data.desZona}</td>
                            <td>{data.sueldo}</td>
                        </tr>
                    )): <tr>
                            <td colSpan="3">No hay Datos</td>
                        </tr>}
                </tbody>
            </table>
        </div>
    );
}

export default TablaZona;