import { supabase } from './config';

export async function register(email, password) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        emailRedirectTo: 'http://localhost:5173/auth/login.html'
      }
  });
  if (error) {
    throw Error(error?.message || 'Что то случилось при регистрации');
  }
  return data.user;
}

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw Error(error?.message || 'Что то случилось при входе');
  }
  return data.user;
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
