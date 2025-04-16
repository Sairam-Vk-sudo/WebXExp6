const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // To serve frontend if needed

// Sample colleges data (you can replace with database results)
const colleges = [
  'VESIT', 'IIT Bombay', 'NIT Trichy', 'BITS Pilani', 'VJTI', 'DJ Sanghvi', 'SPIT', 'RAIT', 'Fr CRCE', 'KJ Somaiya'
];

// Sample usernames already taken
const existingUsernames = ['john123', 'sairamK', 'admin', 'testuser'];

// GET /colleges → Return college name suggestions
app.get('/colleges', (req, res) => {
  res.json(colleges);
});

// POST /check-username → Check if username exists
app.post('/check-username', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username not provided' });
  }

  const exists = existingUsernames.includes(username.toLowerCase());
  res.json({ exists });
});

app.post('/register', (req, res) => {
  const { name, college, username, password } = req.body;
  if (!name || !college || !username || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  console.log('✅ New Registration:', req.body);
  res.json({ message: 'Registered Successfully' });
});


// Run server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
