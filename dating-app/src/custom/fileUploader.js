// utils/fileUploader.js
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

export const splitFileIntoChunks = (file) => {
  const chunks = [];
  let offset = 0;
  
  while (offset < file.size) {
    const chunk = file.slice(offset, offset + CHUNK_SIZE);
    chunks.push({
      file: chunk,
      name: file.name,
      totalChunks: Math.ceil(file.size / CHUNK_SIZE),
      chunkNumber: chunks.length + 1,
      originalSize: file.size,
      type: file.type,
      identifier: `${file.name}-${file.lastModified}-${file.size}`
    });
    offset += CHUNK_SIZE;
  }
  
  return chunks;
};