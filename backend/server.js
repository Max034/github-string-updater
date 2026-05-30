const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/stringsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const MessageSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});
const MessageModel = mongoose.model('Message', MessageSchema);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'Backend is running!', database: 'Connected' });
});

app.post('/update', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message required' });
    }

    try {
        const newMessage = new MessageModel({ content: message });
        await newMessage.save();
    } catch (dbErr) {
        console.error('Database save error:', dbErr);
    }

    fs.writeFileSync('./data/message.txt', message);

    const command = `
        git config --global user.email "bot@example.com" &&
        git config --global user.name "Bot" &&
        git add backend/data/message.txt &&
        git commit -m "Updated message" &&
        git push
    `;

    exec(command, { cwd: '/repo' }, (error, stdout, stderr) => {
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