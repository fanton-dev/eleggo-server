const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const getData = require('./utils/getData')

const app = express();
const http = require('http').createServer(app)
const PORT = process.env.PORT || 5000;

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
})

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  setInterval(() => {
    getData(socket)
  }, 1000);
});

let startedProcess;

app.post('/enable-detection', (req, res) => {
  let { mode, code: {left, none, right, prerequisite} } = req.body;
  mode = mode.toLowerCase().replace(/\s/g, '-');
  console.log(mode)

  startedProcess = execFile(
    'python',
    [`scripts/${mode}.py`, left, none, right, prerequisite],
  );

  startedProcess.stderr.on('data', function(data) {
    console.log(data.toString()); 
  });

  startedProcess.stdout.on('data', function(data) {
    console.log(data.toString()); 
  });
})

app.delete('/disable-detection', (req, res) => {
    if (startedProcess) {
        console.log('kill process')
        startedProcess.kill();
        startedProcess = null;
    }
})

http.listen(PORT, () => console.log(`Server is live on ${PORT}`));
