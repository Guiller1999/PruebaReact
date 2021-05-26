import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AlertaUsuario(props) {

    const cerrarAlerta = () => {
        props.setError(false);
    }

    return (
        <div className={props.tipo} role="alert">
            {props.texto}
            <button type="button" id="close" className="btn-close" 
                data-dismiss="alert" aria-label="Close" onClick={cerrarAlerta}>
                
            </button>
        </div>
    );
}

export default AlertaUsuario;