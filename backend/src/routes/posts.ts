import { Router } from 'express';
import { z } from 'zod';
import { authRequired } from '../middleware/auth';
import { Post } from '../models/Post';
import { upload } from '../utils/upload';

const router = Router();

const createSchema = z.object({
  foodType: z.string().min(2),
  quantity: z.string().min(1),
  expiryTime: z.string().datetime(),
  location: z.object({ lat: z.number(), lng: z.number(), address: z.string().optional() }),
  notes: z.string().optional(),
  anonymous: z.boolean().optional(),
});

router.post('/', authRequired, upload.array('photos', 4), async (req, res) => {
  const parsed = createSchema.safeParse(JSON.parse(req.body.data || '{}'));
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const photoFiles = (req.files as Express.Multer.File[] | undefined) || [];
  const photos = photoFiles.map((f) => `/uploads/${f.filename}`);
  const doc = await Post.create({ ...parsed.data, createdBy: req.auth!.userId, photos });
  res.json(doc);
});

router.get('/', authRequired, async (req, res) => {
  const status = (req.query.status as string) || undefined;
  const posts = await Post.find(status ? { status } : {}).sort({ createdAt: -1 }).limit(100);
  res.json(posts);
});

router.get('/:id', authRequired, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

router.put('/:id', authRequired, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (post.createdBy.toString() !== req.auth!.userId) return res.status(403).json({ error: 'Forbidden' });
  if (post.status !== 'pending') return res.status(400).json({ error: 'Cannot edit after matched' });
  const { notes, quantity, expiryTime, anonymous } = req.body;
  if (notes !== undefined) post.notes = notes;
  if (quantity !== undefined) post.quantity = quantity;
  if (expiryTime !== undefined) post.expiryTime = new Date(expiryTime);
  if (anonymous !== undefined) post.anonymous = !!anonymous;
  await post.save();
  res.json(post);
});

router.delete('/:id', authRequired, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (post.createdBy.toString() !== req.auth!.userId) return res.status(403).json({ error: 'Forbidden' });
  if (post.status !== 'pending') return res.status(400).json({ error: 'Cannot delete after matched' });
  await post.deleteOne();
  res.json({ ok: true });
});

export default router;
