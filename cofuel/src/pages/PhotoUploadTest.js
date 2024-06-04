import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const PhotoUploadTest = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `test_${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      setMessage(`Error uploading image: ${uploadError.message}`);
      setLoading(false);
      return;
    }

    const { publicURL, error: urlError } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlError) {
      setMessage(`Error getting public URL: ${urlError.message}`);
      setLoading(false);
      return;
    }

    setImageUrl(publicURL);
    setMessage('Image uploaded successfully!');
    setLoading(false);
  };

  return (
    <div>
      <h1>Photo Upload Test</h1>
      <form>
        <input type="file" onChange={handleUpload} />
      </form>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="300" />}
    </div>
  );
};

export default PhotoUploadTest;
