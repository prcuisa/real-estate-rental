const express = require('express');
const notesRouter = require('./src/routes/notes'); // Import router Notes dari folder src

const app = express();
const PORT = 5000; // API biasanya berjalan di port yang berbeda dari Frontend (misal 5000)

// Middleware: Mengizinkan JSON Body
app.use(express.json());

// Middleware: Mengizinkan CORS (Penting agar frontend bisa mengakses backend)
// Ini adalah konfigurasi minimal untuk pengujian lokal.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// ROUTE API NOTES: Integrasikan router notes
app.use('/notes', notesRouter); 

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Backend API running on http://localhost:${PORT}`);
});