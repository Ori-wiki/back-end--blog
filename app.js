import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';

mongoose
  .connect(
    'mongodb+srv://mudaUser:6SLy2Jv37xydT$d@cluster0.tlstkul.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('Db ok'))
  .catch((err) => console.log('Db error', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash: req.body.passwordHash,
  });

  res.json({
    succes: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server Ok');
});
