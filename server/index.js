const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
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

app.post('/enable-detection', (req, res) => {
    console.log(req.body)
    const { mode, code: {left, none, right, prerequisite} } = req.body;

    spawn('python', [`${mode}.py\', ${left}, ${none}, ${right}, ${prerequisite}`]);
})

// app.delete('/disable-detection', (req, res) => {
//     console.log('delete process')
// })

http.listen(PORT, () => console.log(`Server is live on ${PORT}`));
