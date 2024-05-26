import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const TestConnection = () => {
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const insertUser = async () => {
    // Primero registramos al usuario con Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // Obtenemos el id del usuario registrado
    const userId = authData.user.id;

    // Insertamos los datos adicionales en la tabla `user`
    const { data, error } = await supabase
      .from('user')
      .insert([
        {
          id: userId, // Usamos el id del usuario autenticado
          username,
          dateOfBirth,
          email
        },
      ]);

    if (error) {
      setError(error.message);
    } else {
      setData(data);
    }
  };

  const selectUsers = async () => {
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
      <h1>Insert User</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={insertUser}>Insert User</button>
      <button onClick={selectUsers}>Select Users</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default TestConnection;
