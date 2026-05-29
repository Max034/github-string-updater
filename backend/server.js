const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/update', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message required' });
    }

    fs.writeFileSync('./data/message.txt', message);

    const command = `
        git add . &&
        git commit -m "Updated message" &&
        git push
    `;

    exec(command, { cwd: '/app' }, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({
                error: stderr
            });
        }

        res.json({
            success: true,
            output: stdout
        });
    });
});

app.listen(5000, () => {
    console.log('Backend running on port 5000');
});