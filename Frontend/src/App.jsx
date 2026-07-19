import React, { useState } from 'react';
import Login from './Login';
import Animais from './Animais';

function App() {
  
  const tokenSalvo = localStorage.getItem('token');
  const [estaLogado, setEstaLogado] = useState(!!tokenSalvo);

  
  return (
    <div>
      {estaLogado ? (
        <Animais />
      ) : (
        <Login onLoginSuccess={() => setEstaLogado(true)} />
      )}
    </div>
  );
}

export default App;