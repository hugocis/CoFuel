import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const TestConnection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    const { data, error } = await supabase
      .from('user')
      .select();

    if (error) {
      setError(error.message);
    } else {
      setData(data);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Connection</h1>
      <button onClick={testConnection}>Test Connection</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default TestConnection;
