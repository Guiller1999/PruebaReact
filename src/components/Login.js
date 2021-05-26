import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertaUsuario from './AlertaUsuario';

function Login(props) {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);   

    const handleChange = (e) => {
        if(e.target.name === 'username') {
            setUser(e.target.value);
        }
        else {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isUser();
    }

    const isUser = async () => {
        try {
            let response = await fetch('https://localhost:44378/api/usuario', 
            {
                method: 'POST',
                body: JSON.stringify({
                    NomUsuario: user,
                    Password: password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            });
            let res = await response.json();
            
            if(!res) {
                console.log('Hola');
                setError(true);
                props.setLogeado(false);
            }
            else {
                localStorage.setItem('logeado', true);
                props.setLogeado(true);
            }
        }
        catch (error) {
            console.log(error)
            setError(true);
            props.setLogeado(false);
        }
    }

    const alertaError = 'alert alert-danger alert-dismissible fade show';

    return (
        <div className='container-login'>
            <h1 className='text-center'>Login</h1>
            {error && 
            <AlertaUsuario 
                tipo={alertaError} 
                texto={'Error. Usuario y/o contraseña incorrecta'}
                setError={setError}
            />            
            }
            <form onSubmit={handleSubmit} method='POST'>
                <div className='form-group row mt-2'>
                    <label className="col-sm-2 col-md-3 col-xl-2 col-form-label" htmlFor="username">Usuario: </label>
                    <div className='col-sm-12 col-md-9 col-xl-10'>
                        <input type="text" name="username" id="username" className="form-control" placeholder="Ingrese nombre de usuario" autoFocus required 
                        onChange={e => handleChange(e)}/>
                    </div>
                </div><br></br>
                <div className='form-group row mt-10'>
                    <label className="col-sm-2 col-md-3 col-xl-2 col-form-label" htmlFor="password">Contraseña: </label>
                    <div className='col-sm-12 col-md-9 col-xl-10'>
                        <input type="password" name="password" id="password" className="form-control" placeholder="Ingrese contraseña" required
                        onChange={e => handleChange(e)}/>
                    </div>
                </div><br></br>
                <div className='form-group row'>
                    <div className="col-md-10 col-sm-12 offset-md-3 offset-xl-2 container-button">
                        <button type="submit" id="sesion" className="btn btn-primary">
                            Iniciar Sesión</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;