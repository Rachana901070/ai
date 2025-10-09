"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const Post_1 = require("../models/Post");
const Pickup_1 = require("../models/Pickup");
const router = (0, express_1.Router)();
const acceptSchema = zod_1.z.object({ postId: zod_1.z.string() });
router.post('/accept', auth_1.authRequired, (0, auth_1.roleRequired)('collector'), async (req, res) => {
    const parsed = acceptSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    const post = await Post_1.Post.findById(parsed.data.postId);
    if (!post)
        return res.status(404).json({ error: 'Post not found' });
    if (post.status !== 'pending')
        return res.status(400).json({ error: 'Post not available' });
    post.status = 'matched';
    post.assignedCollector = req.auth.userId;
    await post.save();
    const pickup = await Pickup_1.Pickup.create({ postId: post._id, collectorId: req.auth.userId, status: 'accepted' });
    res.json(pickup);
});
router.get('/', auth_1.authRequired, (0, auth_1.roleRequired)('collector', 'admin'), async (req, res) => {
    const list = await Pickup_1.Pickup.find({ collectorId: req.auth.userId }).sort({ createdAt: -1 });
    res.json(list);
});
router.patch('/:id/status', auth_1.authRequired, (0, auth_1.roleRequired)('collector', 'admin'), async (req, res) => {
    const { status } = req.body;
    if (!status)
        return res.status(400).json({ error: 'status required' });
    const pickup = await Pickup_1.Pickup.findById(req.params.id);
    if (!pickup)
        return res.status(404).json({ error: 'Not found' });
    if (pickup.collectorId.toString() !== req.auth.userId && req.auth.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    const allowed = ['accepted', 'en_route', 'picked_up', 'delivered', 'cancelled'];
    if (!allowed.includes(status))
        return res.status(400).json({ error: 'Invalid status' });
    pickup.status = status;
    await pickup.save();
    if (status === 'picked_up' || status === 'delivered') {
        const post = await Post_1.Post.findById(pickup.postId);
        if (post) {
            post.status = status === 'picked_up' ? 'picked_up' : 'delivered';
            await post.save();
        }
    }
    res.json(pickup);
});
exports.default = router;
