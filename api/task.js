import { supabase } from './config';

export async function getTasks() {
  let { data, error } = await supabase.from('tasks').select('*');

  if (error) {
    throw Error(error?.message || 'Что то случилось при получении задач');
  }

  return data;
}

export async function getTask(taskId) {
  const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('id', taskId)
    .single();

  if (error) {
    throw Error(error?.message || 'Что то случилось при получении задачи');
  }

  return data;
}

export async function createTask(taskData) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(taskData)
    .select()
    .single();

  if (error) {
    throw Error(error?.message || 'Что то случилось при создании задач');
  }

  return data;
}

export async function updateTask(taskData) {
  const { data, error } = await supabase
    .from('tasks')
    .update(taskData)
    .eq('id', taskData.id)
    .select();

  if (error) {
    throw Error(error?.message || 'Что то случилось при обновлении задач');
  }

  return data;
}

export async function deleteTask(taskId) {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) {
    throw Error(error?.message || 'Что то случилось при удалении задач');
  }
}
