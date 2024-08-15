const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // Importando os validadores
const Patient = require('../models/Patient');

// Obter todos os pacientes
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().exec();
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pacientes' });
  }
});

// Obter paciente por id (usando _id do MongoDB)
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).exec();
    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar paciente' });
  }
});

// Atualizar paciente por id (usando _id do MongoDB)
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).exec();
    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar paciente' });
  }
});


// Rota para criar um paciente com validação
router.post(
  '/',
  [
    // Validações de entrada usando express-validator
    body('name').notEmpty().withMessage('O nome é obrigatório'),
    body('date_of_birth').isISO8601().withMessage('Data de nascimento inválida').toDate(),
    body('age').isInt({ min: 0 }).withMessage('Idade deve ser um número inteiro positivo'),
    body('cpf').notEmpty().isLength({ min: 11, max: 11 }).withMessage('CPF deve ter exatamente 11 dígitos').matches(/^\d+$/).withMessage('CPF deve conter apenas dígitos'),
    body('email').isEmail().withMessage('Email inválido'),
    body('phone').notEmpty().withMessage('Telefone é obrigatório'),
  ],
  async (req, res) => {
    // Verificação dos erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id, name, date_of_birth, age, cpf, email, phone } = req.body;

      // Verifica se o id já existe
      const existingPatient = await Patient.findOne({ id });
      if (existingPatient) {
        return res.status(400).json({ error: 'Paciente com esse ID já existe' });
      }

      const newPatient = new Patient({ id, name, date_of_birth, age, cpf, email, phone });
      await newPatient.save();
      res.status(201).json(newPatient);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar paciente' });
    }
  }
);

module.exports = router;
