// routes/home.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware para verificar o token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'Nenhum token, autorização negada' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

// Rota protegida
router.get('/data', authMiddleware, (req, res) => {
  res.json({ msg: 'Dados protegidos', user: req.user });
});

module.exports = router;
