import { Router } from 'express';
import { Proof } from '../models/Proof';
import { User } from '../models/User';

const router = Router();

// Live stats for landing page (unauthenticated)
router.get('/stats', async (_req, res) => {
  const [mealsMatched, donors, collectors] = await Promise.all([
    Proof.countDocuments(),
    User.countDocuments({ role: 'donor' }),
    User.countDocuments({ role: 'collector' }),
  ]);
  res.json({ mealsMatched, donors, collectors });
});

export default router;
