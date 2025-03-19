const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware untuk menghidangkan file statis dari folder proyek
app.use(express.static(path.join(__dirname)));

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
