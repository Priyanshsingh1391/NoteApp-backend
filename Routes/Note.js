const express = require('express');
const Note = require('../Models/Note.js');
const middleware = require('../middleware/middleware.js');

const router = express.Router();


router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();
    return res.status(200).json({ success: true, message: "Note created successfully" });

  } catch (error) {
    console.error('Error creating note:', error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, updatedNote });
  } catch (error) {
    console.error("Note update error:", error);
    return res.status(500).json({ success: false, message: "Can't update note" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({ success: true, deletedNote });
  } catch (error) {
    console.error("Note delete error:", error);
    return res.status(500).json({ success: false, message: "Can't delete note" });
  }
});


router.get('/',middleware, async (req, res) => {
  try {
    const notes = await Note.find({userId: req.user.id}); // You can also filter by user: { userId: req.user.id }
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Note retrieval error:", error);
    return res.status(500).json({ success: false, message: "Can't retrieve notes" });
  }
});

module.exports = router;
