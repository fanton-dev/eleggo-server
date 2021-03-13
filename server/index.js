const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/enable-detection', (req, res) => {
    console.log(req.body)
    const { mode, code: {left, none, right, prerequisite} } = req.body;

    spawn('python', [`${mode}.py\', ${left}, ${none}, ${right}, ${prerequisite}`]);
})

app.delete('/disable-detection', (req, res) => {
    // kill process here
    console.log('kill process')
})

app.listen(PORT, () => console.log(`Server is live on ${PORT}`));
