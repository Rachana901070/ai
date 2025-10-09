"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const Post_1 = require("../models/Post");
const upload_1 = require("../utils/upload");
const router = (0, express_1.Router)();
const createSchema = zod_1.z.object({
    foodType: zod_1.z.string().min(2),
    quantity: zod_1.z.string().min(1),
    expiryTime: zod_1.z.string().datetime(),
    location: zod_1.z.object({ lat: zod_1.z.number(), lng: zod_1.z.number(), address: zod_1.z.string().optional() }),
    notes: zod_1.z.string().optional(),
    anonymous: zod_1.z.boolean().optional(),
});
router.post('/', auth_1.authRequired, upload_1.upload.array('photos', 4), async (req, res) => {
    const parsed = createSchema.safeParse(JSON.parse(req.body.data || '{}'));
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    const photoFiles = req.files || [];
    const photos = photoFiles.map((f) => `/uploads/${f.filename}`);
    const doc = await Post_1.Post.create({ ...parsed.data, createdBy: req.auth.userId, photos });
    res.json(doc);
});
router.get('/', auth_1.authRequired, async (req, res) => {
    const status = req.query.status || undefined;
    const posts = await Post_1.Post.find(status ? { status } : {}).sort({ createdAt: -1 }).limit(100);
    res.json(posts);
});
router.get('/:id', auth_1.authRequired, async (req, res) => {
    const post = await Post_1.Post.findById(req.params.id);
    if (!post)
        return res.status(404).json({ error: 'Not found' });
    res.json(post);
});
router.put('/:id', auth_1.authRequired, async (req, res) => {
    const post = await Post_1.Post.findById(req.params.id);
    if (!post)
        return res.status(404).json({ error: 'Not found' });
    if (post.createdBy.toString() !== req.auth.userId)
        return res.status(403).json({ error: 'Forbidden' });
    if (post.status !== 'pending')
        return res.status(400).json({ error: 'Cannot edit after matched' });
    const { notes, quantity, expiryTime, anonymous } = req.body;
    if (notes !== undefined)
        post.notes = notes;
    if (quantity !== undefined)
        post.quantity = quantity;
    if (expiryTime !== undefined)
        post.expiryTime = new Date(expiryTime);
    if (anonymous !== undefined)
        post.anonymous = !!anonymous;
    await post.save();
    res.json(post);
});
router.delete('/:id', auth_1.authRequired, async (req, res) => {
    const post = await Post_1.Post.findById(req.params.id);
    if (!post)
        return res.status(404).json({ error: 'Not found' });
    if (post.createdBy.toString() !== req.auth.userId)
        return res.status(403).json({ error: 'Forbidden' });
    if (post.status !== 'pending')
        return res.status(400).json({ error: 'Cannot delete after matched' });
    await post.deleteOne();
    res.json({ ok: true });
});
exports.default = router;
