"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const upload_1 = require("../utils/upload");
const auth_1 = require("../middleware/auth");
const Proof_1 = require("../models/Proof");
const Pickup_1 = require("../models/Pickup");
const Post_1 = require("../models/Post");
const router = (0, express_1.Router)();
const metaSchema = zod_1.z.object({
    geo: zod_1.z.object({ lat: zod_1.z.number(), lng: zod_1.z.number() }),
    signature: zod_1.z.string().optional(),
    otp: zod_1.z.string().optional(),
    beneficiaryCount: zod_1.z.number().int().nonnegative().optional(),
    notes: zod_1.z.string().optional(),
});
router.post('/:pickupId', auth_1.authRequired, (0, auth_1.roleRequired)('collector', 'admin'), upload_1.upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'video', maxCount: 1 },
]), async (req, res) => {
    const metaRaw = req.body.data;
    const parsed = metaSchema.safeParse(JSON.parse(metaRaw || '{}'));
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    const pickup = await Pickup_1.Pickup.findById(req.params.pickupId);
    if (!pickup)
        return res.status(404).json({ error: 'Pickup not found' });
    if (pickup.collectorId.toString() !== req.auth.userId && req.auth.role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });
    const photoFiles = req.files?.photos;
    const videoFile = req.files?.video?.[0];
    if (!photoFiles || photoFiles.length === 0)
        return res.status(400).json({ error: 'Photo required' });
    const photos = photoFiles.map((f) => `/uploads/${f.filename}`);
    const video = videoFile ? `/uploads/${videoFile.filename}` : undefined;
    const proof = await Proof_1.Proof.create({
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
    const post = await Post_1.Post.findById(pickup.postId);
    if (post) {
        post.status = 'delivered';
        await post.save();
    }
    res.json(proof);
});
exports.default = router;
