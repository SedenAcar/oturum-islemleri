import express from 'express';
import authController from '../controllers/authController.js';

const authrouter = express.Router();

authrouter.get('/', authController);

export default authrouter;