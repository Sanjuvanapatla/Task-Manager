import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ title: '', status: 'todo' });

  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/tasks`)
        .then(res => {
          const task = res.data.find(t => t.id.toString() === id);
          if (task) setForm(task);
        })
        .catch(err => console.error('Error fetching task:', err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/tasks/${id}`, form);
      router.push('/');
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full p-2 border"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2">Update Task</button>
      </form>
    </div>
  );
}
