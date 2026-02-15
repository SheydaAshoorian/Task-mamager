'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('در حال ارسال...');

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`✅ ${result.message}`);
        // اینجا می‌تونی کاربر رو به صفحه لاگین هدایت کنی
      } else {
        setMessage(`❌ خطا: ${result.message}`);
      }
    } catch (error) {
      setMessage('❌ خطا در اتصال به سرور');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">ثبت‌نام در ERP</h1>
        
        <input
          type="text"
          placeholder="نام"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        
        <input
          type="text"
          placeholder="نام خانوادگی"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, family: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="ایمیل"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="رمز عبور"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          ثبت‌نام
        </button>

        {message && <p className="mt-4 text-center text-sm font-medium">{message}</p>}
      </form>
    </div>
  );
}