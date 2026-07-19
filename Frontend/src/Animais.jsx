import React, { useState, useEffect } from 'react';
import FormularioAnimal from './FormularioAnimal';

function Animais() {
  const [animais, setAnimais] = useState([]);
  const [erro, setErro] = useState('');
  
  const [animalEmEdicao, setAnimalEmEdicao] = useState(null);
  
  
  const [animalEmDetalhes, setAnimalEmDetalhes] = useState(null);

  const buscarAnimais = async () => {
    const token = localStorage.getItem('token');
    setErro('');

    try {
      const response = await fetch('http://localhost:5006/api/Animais', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar os dados. Verifique se você está logado.');
      }

      const data = await response.json();
      setAnimais(data);
    } catch (error) {
      setErro(error.message);
    }
  };

  useEffect(() => {
    buscarAnimais();
  }, []);

  const excluirAnimal = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este pet?')) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5006/api/Animais/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir o animal.');
      }

      buscarAnimais();
      
      if (animalEmEdicao && animalEmEdicao.id === id) setAnimalEmEdicao(null);
      if (animalEmDetalhes && animalEmDetalhes.id === id) setAnimalEmDetalhes(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const deslogar = () => {
    localStorage.removeItem('token');
    window.location.reload(); 
  };

  
  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lista de Animais</h2>
        <button onClick={deslogar} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sair
        </button>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <FormularioAnimal 
        onCadastrado={buscarAnimais} 
        animalEmEdicao={animalEmEdicao} 
        limparEdicao={() => setAnimalEmEdicao(null)} 
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Nome do Pet</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Espécie</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Tutor</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {animais.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Nenhum animal cadastrado ainda.</td>
            </tr>
          ) : (
            animais.map((animal) => (
              <tr key={animal.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{animal.id}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{animal.nome}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{animal.especie}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{animal.nomeTutor}</td>
                
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                  
                  {}
                  <button 
                    onClick={() => setAnimalEmDetalhes(animal)}
                    style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Detalhes
                  </button>

                  <button 
                    onClick={() => setAnimalEmEdicao(animal)}
                    style={{ padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Editar
                  </button>
                  
                  <button 
                    onClick={() => excluirAnimal(animal.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {}
      {}
      {}
      {animalEmDetalhes && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', width: '500px', maxWidth: '90%' }}>
            
            <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              Detalhes do Pet: {animalEmDetalhes.nome}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <p style={{ margin: 0 }}><strong>ID:</strong> {animalEmDetalhes.id}</p>
              <p style={{ margin: 0 }}><strong>Espécie:</strong> {animalEmDetalhes.especie}</p>
              <p style={{ margin: 0 }}><strong>Idade:</strong> {animalEmDetalhes.idade} anos</p>
              <p style={{ margin: 0 }}><strong>Peso:</strong> {animalEmDetalhes.peso} kg</p>
              <p style={{ margin: 0 }}><strong>Nascimento:</strong> {formatarData(animalEmDetalhes.dataNascimento)}</p>
            </div>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Dados do Tutor</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <p style={{ margin: 0 }}><strong>Tutor:</strong> {animalEmDetalhes.nomeTutor}</p>
              <p style={{ margin: 0 }}><strong>Endereço:</strong> {animalEmDetalhes.logradouro}, {animalEmDetalhes.numero}</p>
              <p style={{ margin: 0 }}><strong>Bairro:</strong> {animalEmDetalhes.bairro}</p>
              <p style={{ margin: 0 }}><strong>Cidade/UF:</strong> {animalEmDetalhes.cidade} - {animalEmDetalhes.uf}</p>
              <p style={{ margin: 0 }}><strong>CEP:</strong> {animalEmDetalhes.cep}</p>
            </div>

            <button 
              onClick={() => setAnimalEmDetalhes(null)}
              style={{ width: '100%', marginTop: '25px', padding: '10px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
              Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Animais;