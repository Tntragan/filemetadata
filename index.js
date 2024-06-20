var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res, next) => {
  const info = req.body;
  const file = req.file;
  console.log("info:", info, "file:", file)
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
  next();
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
