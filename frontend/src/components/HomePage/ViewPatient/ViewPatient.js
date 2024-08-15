// src/components/HomePage/ViewPatient/ViewPatient.js
import React from 'react';
import './ViewPatient.css'; // Importa o CSS para estilização

const ViewPatient = ({ patient }) => {
  return (
    <div className="view-patient-container">
      <h2>Detalhes do Paciente</h2>
      <div className="patient-details">
        <div className="detail-item">
          <h3>Nome:</h3>
          <p>{patient.name}</p>
        </div>
        <div className="detail-item">
          <h3>Data de Nascimento:</h3>
          <p>{patient.dateOfBirth}</p>
        </div>
        <div className="detail-item">
          <h3>Idade:</h3>
          <p>{patient.age}</p>
        </div>
        <div className="detail-item">
          <h3>CPF:</h3>
          <p>{patient.cpf}</p>
        </div>
        <div className="detail-item">
          <h3>Email:</h3>
          <p>{patient.email}</p>
        </div>
        <div className="detail-item">
          <h3>Telefone:</h3>
          <p>{patient.phone}</p>
        </div>
      </div>
      <div className="button-container">
        <button>Editar</button>
        <button>Excluir</button>
      </div>
    </div>
  );
};

export default ViewPatient;
