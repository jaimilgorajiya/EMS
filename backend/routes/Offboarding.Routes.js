import express from 'express';
import { 
    initiateOffboarding, 
    getOffboardings, 
    getOffboardingDetails, 
    updateOffboarding, 
    finalizeOffboarding 
} from '../controllers/Offboarding.Controller.js';

const router = express.Router();

// In protected routes (add middleware as needed)
router.post('/initiate', initiateOffboarding);
router.get('/', getOffboardings);
router.get('/:id', getOffboardingDetails);
router.put('/:id', updateOffboarding);
router.post('/finalize/:id', finalizeOffboarding);

export default router;
