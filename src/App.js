import React, {useState} from 'react';
import Login from './components/Login';
import VistaPrincipal from './components/VistaPrincipal';

function App() {
  const [logeado, setLogeado] = useState(false);

  if(localStorage.getItem('logeado') === undefined) {
    localStorage.setItem('logeado', logeado);
  }

  return (
      <>
      { 
        localStorage.getItem('logeado') === 'false' ? <div className="App"> <Login setLogeado={setLogeado} /> </div>:
        <VistaPrincipal setLogeado={setLogeado} logeado={logeado}/>
      }
      </>
  );
}

export default App;
