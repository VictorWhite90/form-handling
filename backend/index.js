const express = require('express');
const app = express();
const PORT = 3000;


// Middleware to read JSON in requests
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

// Registration route
app.post('/register', (req, res) => {
  const { email, password, fullName} = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).send('Missing email or password');
  }
  // For now, just log and pretend to save to database
  console.log(`New user registered: ${email} | Password: ${password}`);

  res.send('Registration successful');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
