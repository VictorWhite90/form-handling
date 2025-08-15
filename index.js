
require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js'); // Import Supabase

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your own Supabase URL and anon key
 // <-- use the anon key from your project
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const allowedOrigins = [
  'http://127.0.0.1:5501',                
  'https://form-handling-two.vercel.app' 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// ====== MIDDLEWARE ======
app.use(express.json());

// ====== TEST ROUTE ======
app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

// ====== REGISTRATION ROUTE ======
app.post('/register', async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).send('Missing email, password, or full name');
  }

  try {
    // 1️⃣ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2️⃣ Save to Supabase database
    const { data, error } = await supabase
      .from('users') // <-- your table name in Supabase
      .insert([{ email, password: hashedPassword, fullName }]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: "User registered successfully", user: data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
