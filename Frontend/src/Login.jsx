import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  
  const handleLogin = async (event) => {
    event.preventDefault(); 
    setErro(''); 

    try {
      
      const response = await fetch('http://localhost:5006/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error('E-mail ou senha inválidos!');
      }

      
      const data = await response.json();
      
      
      localStorage.setItem('token', data.token);
      
      alert('Login realizado com sucesso! Token guardado.');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      

    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '350px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Acesso ao Sistema</h2>
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>E-mail:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Ex: admin@petshop.com"
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            placeholder="Sua senha"
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {}
        {erro && <p style={{ color: 'red', fontSize: '14px' }}>{erro}</p>}

        <button 
            type="submit" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;