import express from 'express';
import * as emergencyController from '../controllers/emergencyController.js';

const router = express.Router();

router.route('/')
    .post(emergencyController.createEmergency)
    .get(emergencyController.getAllAlerts);

export default router;
