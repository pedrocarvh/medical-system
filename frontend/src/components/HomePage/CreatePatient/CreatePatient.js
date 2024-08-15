import React, { useState } from 'react';
import axios from 'axios';
import { cpf as cpfValidator } from 'cpf-cnpj-validator'; // Importando o validador de CPF
import { useNavigate } from 'react-router-dom';
import './CreatePatient.css';

const CreatePatient = () => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [cpfValue, setCpfValue] = useState(''); // Renomeado para cpfValue
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreatePatient = async (patientData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/patients', patientData);
      console.log('Paciente criado com sucesso:', response.data);
      alert('Paciente cadastrado com sucesso!');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      setError('Erro ao criar paciente. Tente novamente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const patientData = {
      name,
      date_of_birth: dateOfBirth,
      age,
      cpf: cpfValue, // Atualizado para usar cpfValue
      email,
      phone
    };

    if (!cpfValidator.isValid(cpfValue)) { // Usando cpfValidator para validar CPF
      setError('CPF inválido');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Email inválido');
      return;
    }

    handleCreatePatient(patientData);
  };

  return (
    <div className="create-patient-container">
      <h2>Cadastrar Novo Paciente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Data de Nascimento:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        <label>
          Idade:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            value={cpfValue}
            onChange={(e) => setCpfValue(e.target.value)} // Atualizado para setCpfValue
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Cadastrar Paciente</button>
      </form>
    </div>
  );
};

export default CreatePatient;
