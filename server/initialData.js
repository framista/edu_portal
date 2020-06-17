const { Test } = require('./models/test');
const bcrypt = require('bcryptjs');
const { Student } = require('./models/student');
var fs = require('fs');
var d3 = require('d3');
var _ = require('lodash');

const mongoose = require('mongoose');

const studentData = [];

mongoose
  .connect(process.env.EDU_DB_21, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

const dataCreate = () => {
  const file = 'data/listaSluchaczy_N01-21b_.csv';

  fs.readFile(file, 'utf8', function (error, data) {
    const dataRows = data.split('\n');
    dataRows.shift();
    dataRows.forEach(async (row) => {
      const cells = row.split(';');
      if (cells[0].length > 0) {
        studentData.push({
          index: cells[1].slice(4),
          password: cells[2],
          firstname: cells[3],
          lastname: cells[4],
        });
        let student = new Student({
          index: cells[1].slice(4),
          password: cells[2],
          firstname: cells[3],
          lastname: cells[4],
        });
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(student.password, salt);
        await student.save();
      }
    });
    console.log(studentData);
  });
};

dataCreate();

const createMe = async () => {
  let student = new Student({
    firstname: 'Adrianna',
    lastname: 'Jabłońska',
    password: 'ada123',
    index: '229625',
  });
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);
  await student.save();
};
createMe();
