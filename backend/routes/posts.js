const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

// GET /api/posts  -> public feed (latest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name avatarUrl').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /api/posts  -> create post (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });

    const newPost = new Post({ author: req.user.id, text, imageUrl });
    await newPost.save();
    const populated = await Post.findById(newPost._id).populate('author', 'name avatarUrl');
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /api/posts/:id -> edit post (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    post.text = req.body.text ?? post.text;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /api/posts/:id -> delete (only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /api/posts/:id/like -> toggle like
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const idx = post.likes.findIndex((id) => id.toString() === req.user.id);
    if (idx === -1) post.likes.push(req.user.id);
    else post.likes.splice(idx, 1);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
