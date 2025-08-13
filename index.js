const express = require('express');
const cors = require('cors'); // <-- import cors
const app = express();
const PORT = process.env.PORT || 3000;




const allowedOrigins = [
  'http://127.0.0.1:5501',                // Local frontend
  'https://form-handling-two.vercel.app'       // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman) or from allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));


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

 res.json({ message: "successful" });

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
