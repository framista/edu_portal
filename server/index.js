const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const students = require('./routes/students');
const tests = require('./routes/tests');
const files = require('./routes/files');
const fileUpload = require('express-fileupload');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose
  .connect(process.env.EDU_DB_21, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, '../clientf/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/students', students);
app.use('/api/tests', tests);
app.use('/api/files', files);
app.use('/api/auth', auth);

const PORT = process.env.EDU_PORT_21 || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
