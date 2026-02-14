'use client'; // چون فرم داریم باید کلاینت کامپوننت باشه
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('ایول! لاگین شدیم. توکن: ' + data.access_token);
      localStorage.setItem('token', data.access_token); // ذخیره موقت توکن
    } else {
      alert('خطا: ' + data.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">ورود به ERP</h1>
        <input 
          type="email" placeholder="ایمیل" 
          className="w-full p-2 mb-4 border rounded text-gray-900"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="رمز عبور" 
          className="w-full p-2 mb-6 border rounded text-gray-900"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          ورود
        </button>
      </form>
    </main>
  );
}