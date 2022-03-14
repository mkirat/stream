import express, { Router } from 'express';
import authRouter from './auth';
import videoRouter from './video';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/video', videoRouter);

export default router;
