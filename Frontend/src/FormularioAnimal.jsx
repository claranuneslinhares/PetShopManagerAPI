import React, { useState, useEffect } from 'react';

function FormularioAnimal({ onCadastrado, animalEmEdicao, limparEdicao }) {
  const formInicial = {
    nome: '', idade: '', peso: '', dataNascimento: '', especie: '',
    nomeTutor: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: ''
  };

  const [formData, setFormData] = useState(formInicial);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  
  useEffect(() => {
    if (animalEmEdicao) {
      
      const dataFormatada = animalEmEdicao.dataNascimento ? animalEmEdicao.dataNascimento.split('T')[0] : '';
      setFormData({ ...animalEmEdicao, dataNascimento: dataFormatada });
    } else {
      setFormData(formInicial); 
    }
  }, [animalEmEdicao]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    const token = localStorage.getItem('token');
    
    
    const isEdicao = !!animalEmEdicao; 
    
    
    const url = isEdicao ? `http://localhost:5006/api/Animais/${animalEmEdicao.id}` : 'http://localhost:5006/api/Animais';
    const method = isEdicao ? 'PUT' : 'POST';

    try {
      const bodyData = {
        ...formData,
        idade: parseInt(formData.idade),
        peso: parseFloat(formData.peso)
      };

      
      if (isEdicao) bodyData.id = animalEmEdicao.id;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        throw new Error(isEdicao ? 'Erro ao atualizar os dados.' : 'Erro ao cadastrar.');
      }

      setMensagem(isEdicao ? 'Pet atualizado com sucesso!' : 'Pet cadastrado com sucesso!');
      setFormData(formInicial);
      
      
      if (limparEdicao) limparEdicao();
      if (onCadastrado) onCadastrado();

    } catch (error) {
      setErro(error.message);
    }
  };

  const cancelar = () => {
    setFormData(formInicial);
    setMensagem('');
    setErro('');
    if (limparEdicao) limparEdicao();
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
      <h3>{animalEmEdicao ? 'Editar Pet' : 'Cadastrar Novo Pet'}</h3>
      
      {mensagem && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        
        <div><label>Nome do Pet:</label><input type="text" name="nome" value={formData.nome} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Espécie:</label><input type="text" name="especie" value={formData.especie} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Idade:</label><input type="number" name="idade" value={formData.idade} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Peso (kg):</label><input type="number" step="0.1" name="peso" value={formData.peso} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Data de Nascimento:</label><input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Nome do Tutor:</label><input type="text" name="nomeTutor" value={formData.nomeTutor} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>CEP:</label><input type="text" name="cep" value={formData.cep} onChange={handleChange} required maxLength="10" style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Logradouro:</label><input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Número:</label><input type="text" name="numero" value={formData.numero} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Bairro:</label><input type="text" name="bairro" value={formData.bairro} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>Cidade:</label><input type="text" name="cidade" value={formData.cidade} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} /></div>
        <div><label>UF:</label><input type="text" name="uf" value={formData.uf} onChange={handleChange} required maxLength="2" style={{ width: '100%', padding: '8px' }} /></div>

        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: animalEmEdicao ? '#007BFF' : '#28a745', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
            {animalEmEdicao ? 'Atualizar Pet' : 'Salvar Pet'}
          </button>
          
          {}
          {animalEmEdicao && (
            <button type="button" onClick={cancelar} style={{ padding: '10px', backgroundColor: '#6c757d', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormularioAnimal;