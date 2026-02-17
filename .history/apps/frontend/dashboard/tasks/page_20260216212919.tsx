'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminTasksPage() {
  const [users, setUsers] = useState([]); // برای لیست دراپ‌داون پرسنل
  const [task, setTask] = useState({ title: '', assignedToId: '', priority: 'Medium' });

  // ۱. گرفتن لیست یوزرها برای اساین کردن
  useEffect(() => {
    axios.get('http://localhost:3001/users').then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/tasks', task);
      alert('تسک با موفقیت اساین شد!');
    } catch (err) {
      alert('خطا در ثبت تسک');
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">تعریف تسک جدید</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">عنوان تسک</label>
          <input 
            className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTask({...task, title: e.target.value})}
            placeholder="مثلاً: رفع باگ بخش لاگین"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ارجاع به پرسنل</label>
          <select 
            className="w-full p-3 bg-gray-50 border rounded-xl outline-none"
            onChange={(e) => setTask({...task, assignedToId: e.target.value})}
          >
            <option value="">انتخاب کنید...</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name} {u.family}</option>)}
          </select>
        </div>

        <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
          ثبت و ارسال تسک
        </button>
      </form>
    </div>
  );
}