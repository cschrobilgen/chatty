const express = require('express');
const mongoose = require('mongoose');
const app = express(); 
app.use(express.static('public_html'));
app.use(express.json());
const port = 3000;


const mongoDBURL = 'mongodb://127.0.0.1/chatty_db'; 
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
mongoose.connection.on('error', () => { 
       console.log('Connection error') 
});

// Define your chat message schema and model (as described in your assignment)
const Schema = mongoose.Schema;
const ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

// API for posting chat messages
app.post('/chats/post', async (req, res) => {
    const { alias, message } = req.body;
    const time = Date.now();

    const newMessage = new ChatMessage({ time, alias, message });
    const newEntry = await newMessage.save();
    res.json(newEntry);
});
  
// API for fetching chat messages
app.get('/chats', (req, res) => {
    ChatMessage.find({}).exec()
    .then((results) => {
        console.log(results);
        res.json(results);
    })
    .catch((error) => {
        console.log('Could not retrieve messages');
        console.log(error);
    })
});

app.listen(port, () => {
    console.log(`Chatty app is running on port ${port}`);
});