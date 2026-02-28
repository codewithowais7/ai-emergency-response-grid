import express from 'express';
import * as ambulanceController from '../controllers/ambulanceController.js';

const router = express.Router();

router.get('/', ambulanceController.getAllAmbulances);
router.get('/:id', ambulanceController.getAmbulance);
router.patch('/:id/status', ambulanceController.updateStatus);
router.patch('/:id/location', ambulanceController.updateLocation);

export default router;
