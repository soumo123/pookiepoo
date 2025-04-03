// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/chunks/' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure directories exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirectoryExists('uploads/chunks');
ensureDirectoryExists('uploads/complete');

// Upload chunk endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const { name, chunkNumber, totalChunks, identifier } = req.body;
  
  // Rename the chunk with more identifiable name
  const chunkFilename = `${identifier}-${chunkNumber}.part`;
  const chunkPath = path.join('uploads/chunks', chunkFilename);
  
  fs.renameSync(req.file.path, chunkPath);
  
  res.json({
    success: true,
    chunkNumber,
    message: `Chunk ${chunkNumber}/${totalChunks} uploaded successfully`
  });
});

// Combine chunks endpoint
app.post('/combine', async (req, res) => {
  const { identifier, fileName, totalChunks } = req.body;
  
  try {
    const chunkDir = 'uploads/chunks';
    const outputPath = path.join('uploads/complete', fileName);
    const writeStream = fs.createWriteStream(outputPath);
    
    // Combine chunks in order
    for (let i = 1; i <= totalChunks; i++) {
      const chunkPath = path.join(chunkDir, `${identifier}-${i}.part`);
      const chunkBuffer = fs.readFileSync(chunkPath);
      writeStream.write(chunkBuffer);
      fs.unlinkSync(chunkPath); // Delete chunk after combining
    }
    
    writeStream.end();
    
    writeStream.on('finish', () => {
      res.json({
        success: true,
        message: 'File combined successfully',
        filePath: outputPath
      });
    });
    
    writeStream.on('error', (err) => {
      throw err;
    });
    
  } catch (error) {
    console.error('Error combining chunks:', error);
    res.status(500).json({
      success: false,
      message: 'Error combining chunks'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});