'use client'; // حتما این خط رو اول فایل بذار چون داریم از useState استفاده می‌کنیم

import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() { // این همان default export است که ارور می‌داد
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // استفاده از axios برای فرستادن اطلاعات به بک‌ند
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password
      });

      console.log('پاسخ بک‌ند:', response.data);
      alert('لاگین موفقیت‌آمیز بود (توکن دریافت شد)');
      
    } catch (error: any) {
      console.error('خطا در اتصال:', error.response?.data || error.message);
      alert('خطا! احتمالا همون مشکل پسورد بک‌نده، ولی ارتباط فرانت و بک‌ند الان وصله.');
    }
  };

  return (
    <div className="p-20">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm">
        <h1 className="text-2xl mb-4">ورود به سیستم</h1>
        <input 
          type="email" 
          placeholder="ایمیل" 
          className="border p-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="رمز عبور" 
          className="border p-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}