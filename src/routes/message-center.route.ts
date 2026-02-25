import { Router } from 'express';
import {
  getPastMessages,
  getScheduledMessages,
} from '../controllers/message-center.controller';
import { authGuard } from '../middlewares/auth';

const messageCenterRoutes = Router();

messageCenterRoutes.get('/past', authGuard, getPastMessages);
messageCenterRoutes.get('/scheduled', authGuard, getScheduledMessages);

export default messageCenterRoutes;
