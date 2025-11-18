const express = require('express');
const router = express.Router();

// --- 1. Penyimpanan Data In-Memory ---
// Array untuk menyimpan catatan (notes)
let notes = [];
// Counter untuk memastikan setiap catatan memiliki ID unik
let nextId = 1;

// --- 2. Endpoint POST /notes (Create) ---
router.post('/', (req, res) => {
    const { title, content } = req.body;
    
    // Validasi input
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newNote = {
        id: nextId++, // Berikan ID unik, lalu naikkan counter
        title,
        content
    };
    
    notes.push(newNote);
    // Berikan status 201 (Created) dan kembalikan objek yang baru dibuat
    res.status(201).json(newNote); 
});

// --- 3. Endpoint GET /notes (Retrieve All) ---
router.get('/', (req, res) => {
    // Kembalikan seluruh array catatan
    res.json(notes);
});

// --- 4. Endpoint GET /notes/:id (Retrieve Specific) ---
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Cari catatan berdasarkan ID
    const note = notes.find(n => n.id === id);

    if (!note) {
        // Jika tidak ditemukan, kembalikan status 404 (Not Found)
        return res.status(404).json({ error: `Note with ID ${id} not found` });
    }
    res.json(note);
});

// --- 5. Endpoint PUT /notes/:id (Update) ---
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    
    // Cari indeks catatan
    const noteIndex = notes.findIndex(n => n.id === id);

    if (noteIndex === -1) {
        return res.status(404).json({ error: `Note with ID ${id} not found` });
    }

    // Perbarui data catatan (jika title atau content ada di body request)
    notes[noteIndex].title = title !== undefined ? title : notes[noteIndex].title;
    notes[noteIndex].content = content !== undefined ? content : notes[noteIndex].content;

    // Kembalikan objek catatan yang telah diperbarui
    res.json(notes[noteIndex]);
});

// --- 6. Endpoint DELETE /notes/:id (Delete) ---
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = notes.length;
    
    // Filter array, simpan hanya catatan yang ID-nya TIDAK sama dengan ID yang dihapus
    notes = notes.filter(n => n.id !== id);

    // Cek apakah ada catatan yang benar-benar dihapus
    if (notes.length === initialLength) {
        return res.status(404).json({ error: `Note with ID ${id} not found` });
    }

    // Berikan status 204 (No Content) untuk penghapusan yang berhasil
    res.status(204).send(); 
});

module.exports = router;