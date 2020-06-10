const { Test } = require('./models/test');
const bcrypt = require('bcryptjs');
const { Student } = require('./models/student');
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.EDU_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

const dataCreate = async () => {
  const test = new Test({
    taskNumber: 1,
    question: 'Wyjaśnij zasadę stałej objętości',
  });
  try {
    let response = await test.save();
    console.log('saved');
  } catch (err) {
    console.log('err');
  }
  const test1 = new Test({
    taskNumber: 1,
    question: 'Wyjaśnij czym jest kąt chwytu',
  });
  try {
    let response = await test1.save();
    console.log('saved');
  } catch (err) {
    console.log('err');
  }

  let student = new Student({
    firstname: 'Adrianna',
    lastname: 'Nowak',
    password: 'ada123',
    index: '179080',
  });
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);
  await student.save();
};

dataCreate();
