import api from '../lib/api';

export async function uploadImages(files) {
  const form = new FormData();
  for (const f of files) form.append('images', f);
  const { data } = await api.post('/uploads/images', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data; // [paths]
}
