"use client";
import { useEffect, useState } from 'react';

export default function TasksListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // گرفتن دیتا از بک‌اِند
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div dir="rtl">
      <h1 className="text-2xl font-bold mb-6">لیست کل تسک‌ها</h1>
      
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">عنوان تسک</th>
              <th className="p-4">ارجاع به</th>
              <th className="p-4">اولویت</th>
              <th className="p-4">وضعیت</th>
              <th className="p-4">ددلاین</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any) => (
              <tr key={task.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium">{task.title}</td>
                <td className="p-4 text-gray-600">{task.assignedTo?.name || 'نامشخص'}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">{task.status}</span>
                </td>
                <td className="p-4 text-sm text-gray-500">
                   {new Date(task.deadline).toLocaleDateString('fa-IR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}