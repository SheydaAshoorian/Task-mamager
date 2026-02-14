'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('ورود موفقیت‌آمیز! توکن شما دریافت شد.');
        console.log('JWT Token:', data.access_token);
        localStorage.setItem('token', data.access_token); // ذخیره توکن برای استفاده‌های بعدی
      } else {
        alert('خطا در ورود: ' + data.message);
      }
    } catch (error) {
      alert('ارتباط با بک‌اِند برقرار نشد. مطمئن شو NestJS روشنه!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-xl shadow-2xl w-96 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">ورود به سیستم ERP</h2>
        <input 
          type="email" placeholder="Email" 
          className="w-full p-3 mb-4 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-3 mb-6 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition">
          Login
        </button>
        <p className="mt-6 text-center text-sm text-slate-400">
  هنوز حساب کاربری نداری؟{' '}
  <button 
    onClick={() => router.push('/register')} 
    className="text-blue-400 hover:text-blue-300 font-semibold transition underline-offset-4 hover:underline"
  >
    ایجاد حساب جدید
  </button>
</p>
      </form>
    </div>
  );
}