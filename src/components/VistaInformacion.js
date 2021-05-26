import ModalZonas from './ModalZonas';
import TablaZona from './TablaZona';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function VistaInformacion () {

    const [dataSeleccionada, setDataSeleccionada] = useState(0);

    return (
        <>
            <div className="bg-dark m-5 text-white text-center">
                <h1>LISTADO DE SUELDOS POR SECTOR Y ZONA</h1>
            </div>
            <TablaZona setDataSeleccionada={setDataSeleccionada}/>
            <ModalZonas dataSeleccionada={dataSeleccionada}/>
        </>
    );
}

export default VistaInformacion;