"use client";
import { useEffect, useState } from 'react';

export default function TasksListPage() {
  // ۱. حتماً مقدار اولیه رو یک آرایه خالی بذار
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => {
        // ۲. چک کن که اگر دیتا آرایه بود ست بشه، وگرنه آرایه خالی بمونه
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Data is not an array:", data);
          setTasks([]);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div dir="rtl" className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">لیست کل تسک‌ها</h1>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-right border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-sm font-semibold">عنوان تسک</th>
              <th className="p-4 text-sm font-semibold">اولویت</th>
              <th className="p-4 text-sm font-semibold">وضعیت</th>
              <th className="p-4 text-sm font-semibold">تاریخ ایجاد</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* ۳. استفاده از علامت سوال برای جلوگیری از کرش */}
            {tasks?.map((task: any) => (
              <tr key={task.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 text-gray-700 font-medium">{task.title}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {task.priority === 'High' ? 'بالا' : 'معمولی'}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{task.status}</td>
                <td className="p-4 text-sm text-gray-400 font-mono">
                  {task.createdAt ? new Date(task.createdAt).toLocaleDateString('fa-IR') : '---'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <div className="p-10 text-center text-gray-400">در حال بارگذاری یا هیچ تسکی یافت نشد...</div>
        )}
      </div>
    </div>
  );
}