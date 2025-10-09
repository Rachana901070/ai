"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const Pickup_1 = require("../models/Pickup");
const Proof_1 = require("../models/Proof");
const router = (0, express_1.Router)();
router.use(auth_1.authRequired, (0, auth_1.roleRequired)('admin'));
router.get('/posts', async (_req, res) => {
    const posts = await Post_1.Post.find().sort({ createdAt: -1 }).limit(200);
    res.json(posts);
});
router.get('/users', async (_req, res) => {
    const users = await User_1.User.find().sort({ createdAt: -1 }).limit(200);
    res.json(users);
});
router.get('/pickups', async (_req, res) => {
    const pickups = await Pickup_1.Pickup.find().sort({ createdAt: -1 }).limit(200);
    res.json(pickups);
});
router.get('/proofs', async (_req, res) => {
    const proofs = await Proof_1.Proof.find().sort({ createdAt: -1 }).limit(200);
    res.json(proofs);
});
router.get('/stats/live', async (_req, res) => {
    const [meals, donors, collectors] = await Promise.all([
        // naive counts for demo
        Proof_1.Proof.countDocuments(),
        User_1.User.countDocuments({ role: 'donor' }),
        User_1.User.countDocuments({ role: 'collector' }),
    ]);
    res.json({ mealsMatched: meals, donors, collectors });
});
exports.default = router;
