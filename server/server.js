const express = require('express');
const multer = require('multer');
const cors = require('cors');
const db = require('./database');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); // Serve uploaded images

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


// API route for user submission
app.post('/api/users', upload.array('images'), (req, res) => {
  const images = req.files.map(file => `/uploads/${file.filename}`).join(',');
  const { name, socialMediaHandle } = req.body;

  db.run(`INSERT INTO users (name, socialMediaHandle, images) VALUES (?, ?, ?)`, 
    [name, socialMediaHandle, images], 
    function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).send({ id: this.lastID, name, socialMediaHandle, images });
    });
});

// API route to fetch all users
app.get('/api/users', (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
