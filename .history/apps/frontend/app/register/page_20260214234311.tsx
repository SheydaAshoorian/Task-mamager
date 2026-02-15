'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ text: result.message, isError: false });
      } else {
        setMessage({ text: result.message || 'خطایی رخ داد', isError: true });
      }
    } catch (error) {
      setMessage({ text: 'ارتباط با سرور برقرار نشد', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">ثبت‌نام کاربر جدید</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="نام"
            required
            className="w-full rounded border p-3 outline-none focus:border-blue-500"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="نام خانوادگی"
            required
            className="w-full rounded border p-3 outline-none focus:border-blue-500"
            onChange={(e) => setFormData({ ...formData, family: e.target.value })}
          />
          <input
            type="email"
            placeholder="ایمیل"
            required
            className="w-full rounded border p-3 outline-none focus:border-blue-500"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            required
            className="w-full rounded border p-3 outline-none focus:border-blue-500"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'در حال ارسال...' : 'ثبت‌نام'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 text-center rounded ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}