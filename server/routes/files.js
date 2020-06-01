const express = require('express');
const router = express.Router();
const { Student } = require('../models/student');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  let student = await Student.findById(req.user._id);
  if (!req.files) return res.status(400).json({ msg: 'No file' });
  const file = req.files.file;
  file.mv(`../client/public/raports/${student.index}.pdf`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/raports/${file.name}` });
  });
  student = await Student.findByIdAndUpdate(req.user._id, {
    raport: true,
  });
  if (!student) return res.status(404).send('The student was not found');
});

module.exports = router;
