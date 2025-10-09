import { Router } from 'express';
import { z } from 'zod';
import { authRequired, roleRequired } from '../middleware/auth';
import { Post } from '../models/Post';
import { Pickup } from '../models/Pickup';

const router = Router();

const acceptSchema = z.object({ postId: z.string() });

router.post('/accept', authRequired, roleRequired('collector'), async (req, res) => {
  const parsed = acceptSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const post = await Post.findById(parsed.data.postId);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.status !== 'pending') return res.status(400).json({ error: 'Post not available' });
  post.status = 'matched';
  post.assignedCollector = req.auth!.userId as any;
  await post.save();
  const pickup = await Pickup.create({ postId: post._id, collectorId: req.auth!.userId as any, status: 'accepted' });
  res.json(pickup);
});

router.get('/', authRequired, roleRequired('collector','admin'), async (req, res) => {
  const list = await Pickup.find({ collectorId: req.auth!.userId }).sort({ createdAt: -1 });
  res.json(list);
});

router.patch('/:id/status', authRequired, roleRequired('collector','admin'), async (req, res) => {
  const { status } = req.body as { status?: string };
  if (!status) return res.status(400).json({ error: 'status required' });
  const pickup = await Pickup.findById(req.params.id);
  if (!pickup) return res.status(404).json({ error: 'Not found' });
  if (pickup.collectorId.toString() !== req.auth!.userId && req.auth!.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const allowed = ['accepted','en_route','picked_up','delivered','cancelled'] as const;
  if (!allowed.includes(status as any)) return res.status(400).json({ error: 'Invalid status' });
  pickup.status = status as any;
  await pickup.save();
  if (status === 'picked_up' || status === 'delivered') {
    const post = await Post.findById(pickup.postId);
    if (post) {
      post.status = status === 'picked_up' ? 'picked_up' : 'delivered';
      await post.save();
    }
  }
  res.json(pickup);
});

export default router;
