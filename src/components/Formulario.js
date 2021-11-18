import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import AlertaUsuario from './AlertaUsuario';

function Formulario(props) {
    // Estados
    const [sectores, setSectores] = useState(null);
    const [tipoAlerta, setTipoAlerta] = useState('alert alert-danger alert-dismissible fade show');
    const [alerta, setAlerta] = useState(false);
    const [textoAlerta, setTexto] = useState('');

    // Urls a la API
    const urlPersona = 'https://localhost:44378/api/persona';
    const urlSector = 'https://localhost:44378/api/sector';
    const urlZona = 'https://localhost:44378/api/zona';

    useEffect(() => {
        props.cargarRegistro();
    }, [props.dataPersonas]);

    useEffect(() => {
        cargarSectores(); 
    }, [props.tipoForm]);

    const cargarSectores = async () => {
        let response = await fetch(urlSector + '/listar');
        let data = await response.json();
        setSectores(data.result);
    }

    const handleSelect = (e) => {
        const sector = e.target.value;
        
        fetch(urlZona + '/listarZonas', {
            method: 'POST',
            body: JSON.stringify({
                CodSector: parseInt(sector)
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(data => props.setZonas(data.result));
    }

    const handleChange = (e) => {
        
        if(e.target.name === 'NomPersona') {
            if(!validarNombre(e.target.value) && e.target.value.length > 0) {
                return;
            }
        }
        
        if(e.target.name === 'Sueldo') {
            if(!validarSueldo(e.target.value) && e.target.value.length > 0)
                return;
        }

        props.setForm({
            ...props.form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(props.tipoForm === 'crear') {
            guardar();
        }
        else {
            actualizar();
        }
    }

    const guardar = () => {
        fetch(urlPersona + '/crear', {
            method: 'POST',
            body: JSON.stringify({
                CodPersona: parseInt(props.registro) + 1,
                NomPersona: props.form.NomPersona,
                FecNacimiento: props.form.FecNacimiento,
                CodSector: parseInt(props.form.CodSector),
                CodZona: parseInt(props.form.CodZona),
                Sueldo: parseFloat(props.form.Sueldo)
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                props.cargarDataPersonas();
                resetearCampos();
                setTipoAlerta('alert alert-success alert-dismissible fade show');
                setAlerta(!alerta);
                setTexto('Datos guardados correctamente');
            }
        })
    }

    const actualizar = () => {
        fetch(urlPersona + '/actualizar', {
            method: 'PUT',
            body: JSON.stringify({
                CodPersona: parseInt(props.registro),
                NomPersona: props.form.NomPersona,
                FecNacimiento: props.form.FecNacimiento,
                CodSector: parseInt(props.form.CodSector),
                CodZona: parseInt(props.form.CodZona),
                Sueldo: parseFloat(props.form.Sueldo)
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                props.cargarDataPersonas();
                resetearCampos();
                setTipoAlerta('alert alert-success alert-dismissible fade show');
                setAlerta(!alerta);
                setTexto('Datos actualizados correctamente');
            }
        })
    }

    const handleReset = () => {
        resetearCampos();
        props.cargarRegistro();
    }

    const resetearCampos = () =>  {
        props.setForm({
            NomPersona: '',
            FecNacimiento: '',
            CodSector: 0,
            CodZona: 0,
            Sueldo: 0
        });
        props.cargarRegistro();
        props.setZonas(null);
        props.setTipoForm('crear');
    }

    const validarNombre = (name) => {

        let valoresAceptados = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
        
        if(valoresAceptados.test(name)) 
            return true;
        else 
            return false;
    }

    const validarSueldo = (sueldo) => {
        let valoresAceptados = /^[0-9]$/;
        console.log(typeof sueldo);
        if(valoresAceptados.test(sueldo))
            return true;
        else 
            return false;
    }

    return (
        <div className="container-form">
            {alerta &&
            <AlertaUsuario 
            tipo={tipoAlerta} 
            texto={textoAlerta}
            setError={setAlerta}
            />
            }
            <form onSubmit={handleSubmit} onReset={handleReset} method="POST">
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Cod. Persona: </label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="CodPersona" 
                        value={
                            props.tipoForm === 'crear' && props.registro ? (props.registro + 1) :
                            (props.registro)
                        } 
                        autoFocus required readOnly />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Nombre: </label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="NomPersona" placeholder="Ingrese nombre" 
                        onChange={handleChange} 
                        value={props.form.NomPersona} 
                        autoFocus required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="fecha_nac">Fecha de Nacimiento: </label>
                    <div className="col-sm-8">
                        <input type="date" className="form-control" name="FecNacimiento" id="fecha_nac" 
                        onChange={handleChange} placeholder="Ingrese fecha de nacimeinto" 
                        value={props.form.FecNacimiento}
                        autoFocus required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="sueldo">Sueldo: </label>
                    <div className="col-sm-8">
                        <input type="number" className="form-control" name="Sueldo"
                        onChange={handleChange} placeholder="Ingrese sueldo" 
                        value={props.form.Sueldo}
                        autoFocus required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Sector: </label>
                    <div className="col-sm-8">
                        <select name="CodSector" id="cmbSector" value={props.form.CodSector} onChange={(e) => {
                            handleSelect(e);
                            handleChange(e);
                        }}>
                            <option value="0">Seleccione una opción</option>
                            {sectores && sectores.map(sector => (
                                <option key={sector['codSector']} value={sector['codSector']}>{sector['desSector']}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Zona: </label>
                    <div className="col-sm-8">
                        <select name="CodZona" id="cmbZona" value={props.form.CodZona} onChange={handleChange}>
                            <option value="0">Seleccione una opción</option>
                            {props.zonas && props.zonas.map(zona => (
                                <option key={zona['codZona']} value={zona['codZona']}>{zona['desZona']}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group col-sm-12 d-flex justify-content-center">
                    <button type="reset" id="nuevo" name="reset" className="btn btn-primary mr-2">Nuevo</button>
                    <button type="submit" id="grabar" name="grabar" className="btn btn-success mr-2">
                        {props.tipoForm === 'crear' ? "Guardar" : "Actualizar"}
                    </button>
                </div>
            </form>
        </div>    
    );
}

export default Formulario;