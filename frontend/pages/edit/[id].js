import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ title: '', status: 'todo' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/tasks`).then(res => {
        const task = res.data.find(t => t.id === id);
        if (task) setForm(task);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/tasks/${id}`, form);
    router.push('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border" />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full p-2 border">
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2">Update Task</button>
      </form>
    </div>
  );
}
