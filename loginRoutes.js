import express from 'express';
import * as loginController from '../controllers/loginContoller.js';

const loginrouter = express.Router();

loginrouter.get('/', loginController.getusername);
loginrouter.get('/',loginController.getuserpassword);

export default loginrouter;