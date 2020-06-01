const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  index: {
    type: String,
    required: true,
    unique: true,
  },
  tasks: {
    type: [Number],
    default: [0, 0, 0, 0], // 0 - don't watch video // 1 - can do test  // 2 - test done
  },
  tests: {
    type: [],
    default: [
      { test: '1', tasks: [] },
      { test: '2', tasks: [] },
      { test: '3', tasks: [] },
      { test: '4', tasks: [] },
    ],
  },
  raport: {
    type: Boolean,
    default: false,
  },
});

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
  return token;
};

const Student = mongoose.model('Student', studentSchema);

exports.Student = Student;
