import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditPatient.css';

const EditPatient = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Patient ID:", patientId); // Verifique o valor do patientId

    if (patientId) {
      axios.get(`/api/patients/${patientId}`)
        .then(response => {
          setPatient(response.data);
        })
        .catch(error => {
          console.error('Error fetching patient data:', error.response ? error.response.data : error.message);
        });
    } else {
      console.error('No patient ID provided');
    }
  }, [patientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`/api/patients/${patientId}`, patient);
      console.log(response.data);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  if (!patient) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="edit-patient-container">
      <h2>Editar Paciente</h2>
      <form className="edit-patient-form" onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            className="edit-patient-input"
            type="text"
            name="name"
            value={patient.name || ''}
            onChange={handleChange}
          />
          {errors.name && <span className="edit-patient-error">{errors.name}</span>}
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            className="edit-patient-input"
            type="date"
            name="date_of_birth"
            value={patient.date_of_birth || ''}
            onChange={handleChange}
          />
          {errors.date_of_birth && <span className="edit-patient-error">{errors.date_of_birth}</span>}
        </div>
        <div>
          <label>Idade:</label>
          <input
            className="edit-patient-input"
            type="number"
            name="age"
            value={patient.age || ''}
            onChange={handleChange}
          />
          {errors.age && <span className="edit-patient-error">{errors.age}</span>}
        </div>
        <div>
          <label>CPF:</label>
          <input
            className="edit-patient-input"
            type="text"
            name="cpf"
            value={patient.cpf || ''}
            onChange={handleChange}
          />
          {errors.cpf && <span className="edit-patient-error">{errors.cpf}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            className="edit-patient-input"
            type="email"
            name="email"
            value={patient.email || ''}
            onChange={handleChange}
          />
          {errors.email && <span className="edit-patient-error">{errors.email}</span>}
        </div>
        <div>
          <label>Telefone:</label>
          <input
            className="edit-patient-input"
            type="text"
            name="phone"
            value={patient.phone || ''}
            onChange={handleChange}
          />
          {errors.phone && <span className="edit-patient-error">{errors.phone}</span>}
        </div>
        <button className="edit-patient-button" type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditPatient;
