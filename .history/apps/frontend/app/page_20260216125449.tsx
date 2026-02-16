'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.access_token);
      alert('خوش آمدید!');
      router.push('/dashboard'); // یا هر مسیری که بعد لاگین باید برود
    } catch (error: any) {
      console.error(error.response?.data);
      alert('ایمیل یا رمز عبور اشتباه است');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">ورود به سیستم</h2>
          <p className="text-gray-500 mt-2">خوشحالیم که دوباره شما را می‌بینیم</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</ts-label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
              placeholder="name@company.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'
            }`}
          >
            {loading ? 'در حال بررسی...' : 'ورود'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          حساب کاربری ندارید؟{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            ثبت‌نام کنید
          </a>
        </div>
      </div>
    </div>
  );
}