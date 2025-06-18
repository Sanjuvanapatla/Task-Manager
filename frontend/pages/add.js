import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Add() {
  const [form, setForm] = useState({ title: '', status: 'todo' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/tasks', form);
    router.push('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border" />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full p-2 border">
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Add Task</button>
      </form>
    </div>
  );
}