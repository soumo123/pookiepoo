// components/ParallelUpload.jsx
import { useState, useRef } from 'react';
import { splitFileIntoChunks } from '../custom/fileUploader.js';

const ParallelUpload = () => {
  const [progress, setProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);

  const uploadChunk = async (chunk, onProgress) => {
    const formData = new FormData();
    formData.append('file', chunk.file);
    formData.append('name', chunk.name);
    formData.append('chunkNumber', chunk.chunkNumber);
    formData.append('totalChunks', chunk.totalChunks);
    formData.append('originalSize', chunk.originalSize);
    formData.append('identifier', chunk.identifier);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error('Upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.open('POST', 'http://localhost:3000/upload', true);
      xhr.send(formData);
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadComplete(false);
    const chunks = splitFileIntoChunks(file);

    // Initialize progress
    const initialProgress = {};
    chunks.forEach(chunk => {
      initialProgress[chunk.chunkNumber] = 0;
    });
    setProgress(initialProgress);

    try {
      // Upload all chunks in parallel
      await Promise.all(chunks.map(chunk => 
        uploadChunk(chunk, (chunkProgress) => {
          setProgress(prev => ({
            ...prev,
            [chunk.chunkNumber]: chunkProgress
          }));
        })
      ));

      // Notify backend to combine chunks
      const response = await fetch('http://localhost:3000/combine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: chunks[0].identifier,
          fileName: file.name,
          totalChunks: chunks.length,
          originalSize: file.size
        })
      });

      if (response.ok) {
        setUploadComplete(true);
      } else {
        throw new Error('Failed to combine chunks');
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Parallel Chunk Upload</h2>
      <input
        type="file"
        className=''
        style={{display:"block"}}
        ref={fileInputRef}
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      
      {isUploading && (
        <div>
          <h4>Upload Progress:</h4>
          {Object.entries(progress).map(([chunkNumber, percent]) => (
            <div key={chunkNumber}>
              <span>Chunk {chunkNumber}: {percent}%</span>
              <progress value={percent} max="100" />
            </div>
          ))}
        </div>
      )}
      
      {uploadComplete && <p>Upload completed successfully!</p>}
    </div>
  );
};

export default ParallelUpload;