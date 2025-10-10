export async function uploadToCloudinary(file) {
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) throw new Error('Cloudinary env missing');
  const url = `https://api.cloudinary.com/v1_1/${cloud}/upload`;
  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', preset);
  const res = await fetch(url, { method: 'POST', body });
  if (!res.ok) throw new Error('Upload failed');
  return await res.json();
}
