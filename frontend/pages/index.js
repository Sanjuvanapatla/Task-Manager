import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
      <Link href="/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</Link>
      <ul className="mt-6 space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="border p-4 rounded">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p>Status: {task.status}</p>
            <div className="space-x-4 mt-2">
              <Link href={`/edit/${task.id}`} className="text-blue-600">Edit</Link>
              <button onClick={() => deleteTask(task.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
