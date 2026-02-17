'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTaskPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    deadline: '',
    assignedToId: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        // اصلاح مسیر دیتا بر اساس عکس خروجی بک‌ند شما
        setUsers(res.data.data || res.data);
      })
      .catch(() => toast.error('خطا در دریافت لیست پرسنل'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/tasks', {
        ...formData,
        assignedToId: Number(formData.assignedToId)
      });
      toast.success('تسک با موفقیت ابلاغ شد');
      setFormData({ title: '', description: '', priority: 'Medium', deadline: '', assignedToId: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'خطا در ثبت');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <ToastContainer position="top-center" />
      
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* هدر جذاب */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
          <h1 className="text-3xl font-bold">مدیریت و ارجاع تسک</h1>
          <p className="mt-2 opacity-80">تعریف وظایف جدید برای کارشناسان سازمان</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* عنوان تسک - تمام عرض */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2 italic">عنوان تسک</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                placeholder="مثلاً: رفع باگ سیستم لاگین"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* انتخاب کارشناس */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ارجاع به پرسنل</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none cursor-pointer"
                value={formData.assignedToId}
                onChange={e => setFormData({...formData, assignedToId: e.target.value})}
              >
                <option value="">انتخاب کنید...</option>
                {users.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.family}
                  </option>
                ))}
              </select>
            </div>

            {/* اولویت */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">اولویت انجام</label>
              <select 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option value="Low">کم (Low)</option>
                <option value="Medium">متوسط (Medium)</option>
                <option value="High">بالا (High)</option>
              </select>
            </div>

            {/* ددلاین */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">مهلت اتمام (Deadline)</label>
              <input 
                type="datetime-local"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                value={formData.deadline}
                onChange={e => setFormData({...formData, deadline: e.target.value})}
              />
            </div>

            {/* توضیحات */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">توضیحات تکمیلی</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none resize-none"
                placeholder="جزئیات تسک را اینجا بنویسید..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          {/* دکمه ارسال */}
          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 disabled:bg-gray-400"
          >
            {loading ? 'در حال ثبت در سیستم...' : 'ثبت و ارجاع نهایی'}
          </button>
        </form>
      </div>
    </div>
  );
}