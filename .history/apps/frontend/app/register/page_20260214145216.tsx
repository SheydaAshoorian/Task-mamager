'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [family, ser]
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', { // آدرس بک‌اِند نست
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        alert('ثبت‌نام با موفقیت انجام شد! حالا لاگین کنید.');
        router.push('/'); // هدایت به صفحه لاگین
      } else {
        const data = await response.json();
        alert('خطا در ثبت‌نام: ' + data.message);
      }
    } catch (error) {
      alert('ارتباط با سرور برقرار نشد.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <form onSubmit={handleRegister} className="bg-slate-800 p-8 rounded-xl shadow-2xl w-96 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-400">ثبت‌نام کاربر جدید</h2>
        <input 
          type="text" placeholder="Full Name" 
          className="w-full p-3 mb-4 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-green-500"
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" placeholder="Email" 
          className="w-full p-3 mb-4 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-green-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-3 mb-6 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg font-bold transition">
          Register
        </button>
        <p className="mt-4 text-center text-sm text-slate-400">
          قبلاً ثبت‌نام کردی؟ <a href="/" className="text-blue-400 hover:underline">لاگین کن</a>
        </p>
        
      </form>
    </div>
  );
}