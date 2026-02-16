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
      router.push('/dashboard');
    } catch (error: any) {
      alert('ایمیل یا رمز عبور اشتباه است');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-[sans-serif]">
      {/* Main Container */}
      <div className="flex w-full max-w-[850px] bg-white rounded-[25px] shadow-2xl overflow-hidden min-h-[500px]">
        
        {/* Left Side - Blue Branding (Exactly like your Register) */}
        <div className="hidden md:flex md:w-2/5 bg-[#1d63ff] p-10 flex-col justify-center items-center text-center text-white relative">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">ERP<br/>System</h1>
          <p className="text-blue-100 text-sm leading-relaxed mb-8">
            به سامانه مدیریت منابع سازمانی خوش آمدید
          </p>
          {/* Subtle line indicator under the text */}
          <div className="w-12 h-1 bg-blue-300 opacity-50 rounded-full"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-3/5 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#334155] mb-2 text-right">ورود به حساب کاربری</h2>
          <div className="w-full h-[1px] bg-gray-200 mb-8"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-right">
              <label className="text-xs font-semibold text-gray-500 mb-2 block mr-1">پست الکترونیک</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-[#f1f5f9] border-none rounded-xl focus:ring-2 focus:ring-[#1d63ff] outline-none text-right text-gray-700 transition-all"
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="text-right">
              <label className="text-xs font-semibold text-gray-500 mb-2 block mr-1">رمز عبور</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-[#f1f5f9] border-none rounded-xl focus:ring-2 focus:ring-[#1d63ff] outline-none text-right text-gray-700 transition-all"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 rounded-xl text-white font-bold transition-all shadow-lg ${
                loading ? 'bg-blue-300' : 'bg-[#1d63ff] hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              {loading ? 'در حال تایید...' : 'ورود به سامانه'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            حساب کاربری ندارید؟{' '}
            <button 
              onClick={() => router.push('/register')} 
              className="text-[#1d63ff] font-bold hover:underline"
            >
              ثبت‌نام در سامانه
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}