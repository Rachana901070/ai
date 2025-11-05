import React, { useRef, useState } from 'react';
import { uploadImages } from '../services/uploads';
import s from './ImageUploader.module.css';

export default function ImageUploader({ onUploaded }) {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const onUpload = async () => {
    const files = Array.from(inputRef.current?.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const paths = await uploadImages(files);
      onUploaded?.(paths);
    } catch (e) {
      alert(e.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={onSelect} />
      <div className={s.controls}>
        <button onClick={onUpload} disabled={uploading}>Upload</button>
        {uploading && <div className="spinner" />}
      </div>
      <div className={s.grid}>
        {previews.map((src, i) => (
          <img key={i} src={src} alt={`preview-${i}`} className={s.thumb} />
        ))}
      </div>
    </div>
  );
}
