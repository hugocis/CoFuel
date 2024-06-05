import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rtkdzocthwbrgxbgiwjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0a2R6b2N0aHdicmd4Ymdpd2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDEwODgsImV4cCI6MjAyOTQ3NzA4OH0.vQnReElTTLXnexvepKnvxdGHEKygH81Tw1MLNj2oUP0';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Funciones para manejar amigos
export const addFriend = async (userId, friendId) => {
  const { data, error } = await supabase
    .from('friends')
    .insert([{ user_id: userId, friend_id: friendId, status: 'pending' }]);

  if (error) {
    console.error('Error adding friend:', error);
    return null;
  }
  return data;
};

export const acceptFriend = async (userId, friendId) => {
  const { data, error } = await supabase
    .from('friends')
    .update({ status: 'accepted' })
    .eq('user_id', friendId)
    .eq('friend_id', userId);

  if (error) {
    console.error('Error accepting friend:', error);
    return null;
  }
  return data;
};

export const removeFriend = async (userId, friendId) => {
  const { data, error } = await supabase
    .from('friends')
    .delete()
    .eq('user_id', userId)
    .eq('friend_id', friendId)
    .or(`user_id.eq.${friendId},friend_id.eq.${userId}`);

  if (error) {
    console.error('Error removing friend:', error);
    return null;
  }
  return data;
};

export const fetchFriends = async (userId) => {
  const { data, error } = await supabase
    .from('friends')
    .select('*')
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`);

  if (error) {
    console.error('Error fetching friends:', error);
    return [];
  }
  return data;
};
