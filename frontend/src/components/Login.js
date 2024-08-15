import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password
      });
      console.log('Login bem-sucedido:', res.data);

      // Armazenar o token no localStorage
      localStorage.setItem('token', res.data.token);

      // Redirecionar para a página home
      navigate('/home');

    } catch (err) {
      console.error('Erro na requisição de login:', err);
      if (err.response) {
        console.error('Dados do erro:', err.response.data); // Detalhes do erro retornado pelo servidor
      }
    }
  };



  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/images/logo-policlinica.png" className="logo-policlinica" alt="Logo da Policlinica" />
        <h3 htmlFor="senha" className="login-label">LOGIN</h3>
        <p className="welcome-message">Bem-vindo! Faça login com suas credenciais.</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="senha" className="form-label">Senha</label>
          <div className="password-container">
            <input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} show-password-icon`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <button className="btn-login" type="submit">Login</button>
          <div className="login-options">
            <a href="/forgot-password">Esqueci minha senha</a>
          </div>
        </form>
      </div>
    </div>
  );


};

export default Login;
