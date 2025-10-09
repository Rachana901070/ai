import { Router } from 'express';
import { z } from 'zod';
import { upload } from '../utils/upload';
import { authRequired, roleRequired } from '../middleware/auth';
import { Proof } from '../models/Proof';
import { Pickup } from '../models/Pickup';
import { Post } from '../models/Post';

const router = Router();

const metaSchema = z.object({
  geo: z.object({ lat: z.number(), lng: z.number() }),
  signature: z.string().optional(),
  otp: z.string().optional(),
  beneficiaryCount: z.number().int().nonnegative().optional(),
  notes: z.string().optional(),
});

router.post('/:pickupId', authRequired, roleRequired('collector','admin'), upload.fields([
  { name: 'photos', maxCount: 5 },
  { name: 'video', maxCount: 1 },
]), async (req, res) => {
  const metaRaw = req.body.data;
  const parsed = metaSchema.safeParse(JSON.parse(metaRaw || '{}'));
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const pickup = await Pickup.findById(req.params.pickupId);
  if (!pickup) return res.status(404).json({ error: 'Pickup not found' });
  if (pickup.collectorId.toString() !== req.auth!.userId && req.auth!.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

  const photoFiles = (req.files as any)?.photos as Express.Multer.File[] | undefined;
  const videoFile = (req.files as any)?.video?.[0] as Express.Multer.File | undefined;
  if (!photoFiles || photoFiles.length === 0) return res.status(400).json({ error: 'Photo required' });
  const photos = photoFiles.map((f) => `/uploads/${f.filename}`);
  const video = videoFile ? `/uploads/${videoFile.filename}` : undefined;

  const proof = await Proof.create({
    pickupId: pickup._id,
    photos,
    geo: parsed.data.geo,
    signature: parsed.data.signature,
    otp: parsed.data.otp,
    video,
    beneficiaryCount: parsed.data.beneficiaryCount,
    notes: parsed.data.notes,
  });

  // Mark delivered
  pickup.status = 'delivered';
  await pickup.save();
  const post = await Post.findById(pickup.postId);
  if (post) { post.status = 'delivered'; await post.save(); }

  res.json(proof);
});

export default router;
