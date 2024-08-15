import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Home.css'; // Importa o arquivo CSS para estilização

const Home = () => {
  const navigate = useNavigate(); // Usa useNavigate

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <div className="home-container">

      <div className="navbar">
        <div className="navbar-logo">
          <img src="/images/logo-policlinica.png" alt="Logo da Policlinica" className="navbar-logo-img" />
          <h1>Policlínica</h1>
        </div>
        <div className="navbar-links">
          <a href="/create-client">Novo Paciente</a>
          <a href="/search">Pesquisa</a>
          <a href="/preference">Preferências</a>
          <a href="/notification">Notificações</a>
          <a href="/perfil">Perfil</a>
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>


      <div className="main-content">
        <div className="sidebar">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#agendamentos">Agendamentos</a></li>
            <li><a href="#pacientes">Pacientes</a></li>
            <li><a href="#medicos">Médicos</a></li>
            <li><a href="#financeiro">Financeiro</a></li>
            <li><a href="#relatorios">Relatórios</a></li>
            <li><a href="#historico">Histórico</a></li>
            <li><a href="#settings">Configurações</a></li>
            <li><a href="#ajuda">Ajuda</a></li>
          </ul>
        </div>


        <div className="content">
  <h2>Bem-vindo à Tela Home</h2>
  <p>Este é o painel principal, onde você pode gerenciar os pacientes.</p>

  {/* Menu com botão para cadastrar novo paciente */}
  <div className="menu">
    <button onClick={handleNewPatient} className="btn-new-patient">
      Cadastrar Novo Paciente
    </button>
  </div>

  {/* Lista de pacientes */}
  <div className="patient-list">
    <h3>Lista de Pacientes</h3>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data de Nascimento</th>
          <th>Idade</th>
          <th>CPF</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.cpf}>
            <td>{patient.name}</td>
            <td>{patient.date_of_birth}</td>
            <td>{patient.age}</td>
            <td>{patient.cpf}</td>
            <td>{patient.email}</td>
            <td>{patient.phone}</td>
            <td>
              <button onClick={() => handleViewPatient(patient.cpf)}>Ver</button>
              <button onClick={() => handleEditPatient(patient.cpf)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>




      </div>
    </div>
  );
};

export default Home;
