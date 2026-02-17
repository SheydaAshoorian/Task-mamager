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

  // ۱. دریافت لیست یوزرهای واقعی از بک‌اِند (۳۰۰۰)
  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        // با توجه به خروجی که فرستادی، دیتا داخل res.data.data است
        setUsers(res.data.data || res.data);
      })
      .catch(err => toast.error('خطا در دریافت لیست پرسنل'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ارسال دیتا به بک‌اِند
      await axios.post('http://localhost:3000/tasks', {
        ...formData,
        assignedToId: Number(formData.assignedToId)
      });
      toast.success('تسک با موفقیت تعریف و ارجاع داده شد');
      setFormData({ title: '', description: '', priority: 'Medium', deadline: '', assignedToId: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'خطا در ثبت تسک');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <ToastContainer position="top-center" />
      
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <h1 className="text-3xl font-bold">تعریف تسک جدید</h1>
          <p className="mt-2 opacity-80 text-sm">مدیریت و ارجاع وظایف به پرسنل دپارتمان‌ها</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان تسک</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                placeholder="مثلاً: طراحی رابط کاربری بخش تیکتینگ"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* Assigned To (Dynamic Dropdown) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ارجاع به (کارشناس)</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                value={formData.assignedToId}
                onChange={e => setFormData({...formData, assignedToId: e.target.value})}
              >
                <option value="">انتخاب کنید...</option>
                {users.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.family} ({user.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">اولویت</label>
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

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">مهلت انجام (Deadline)</label>
              <input 
                type="datetime-local"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                value={formData.deadline}
                onChange={e => setFormData({...formData, deadline: e.target.value})}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">توضیحات تکمیلی</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                placeholder="جزئیات تسک را اینجا بنویسید..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 disabled:bg-gray-400"
          >
            {loading ? 'در حال ثبت...' : 'ثبت و ابلاغ تسک'}
          </button>
        </form>
      </div>
    </div>
  );
}