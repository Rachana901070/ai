import { Router } from 'express';
import { roleRequired, authRequired } from '../middleware/auth';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { Pickup } from '../models/Pickup';
import { Proof } from '../models/Proof';

const router = Router();

router.use(authRequired, roleRequired('admin'));

router.get('/posts', async (_req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).limit(200);
  res.json(posts);
});

router.get('/users', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).limit(200);
  res.json(users);
});

router.get('/pickups', async (_req, res) => {
  const pickups = await Pickup.find().sort({ createdAt: -1 }).limit(200);
  res.json(pickups);
});

router.get('/proofs', async (_req, res) => {
  const proofs = await Proof.find().sort({ createdAt: -1 }).limit(200);
  res.json(proofs);
});

router.get('/stats/live', async (_req, res) => {
  const [meals, donors, collectors] = await Promise.all([
    // naive counts for demo
    Proof.countDocuments(),
    User.countDocuments({ role: 'donor' }),
    User.countDocuments({ role: 'collector' }),
  ]);
  res.json({ mealsMatched: meals, donors, collectors });
});

export default router;
