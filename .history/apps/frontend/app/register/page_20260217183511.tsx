'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {

      await axios.post('http://localhost:3000/auth/register', { 
        name, 
        family, 
        email, 
        password 
      });
      alert('ثبت‌نام با موفقیت انجام شد!');
      router.push('/'); // هدایت به صفحه لاگین
    } catch (error: any) {
      alert('خطا در ثبت‌نام. دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-[sans-serif]">

      <div className="flex w-full max-w-[850px] bg-white rounded-[25px] shadow-2xl overflow-hidden min-h-[600px]">
        

        <div className="hidden md:flex md:w-2/5 bg-[#1d63ff] p-10 flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">ERP<br/>System</h1>
          <p className="text-blue-100 text-sm leading-relaxed mb-8">
            ایجاد حساب کاربری جدید در سامانه
          </p>
          <div className="w-12 h-1 bg-blue-300 opacity-50 rounded-full"></div>
        </div>

        {/* سمت راست: فرم ثبت‌نام (فیلدهای سطری) */}
        <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#334155] mb-2 text-right">ثبت‌نام در سامانه</h2>
          <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

          <form onSubmit={handleRegister} className="space-y-4 text-right">
            {/* فیلد نام - تمام عرض */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block mr-1">نام</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-[#f1f5f9] border-none rounded-xl focus:ring-2 focus:ring-[#1d63ff] outline-none text-right text-gray-700 transition-all"
                placeholder="مثلاً: علی"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* فیلد نام خانوادگی - تمام عرض */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block mr-1">نام خانوادگی</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-[#f1f5f9] border-none rounded-xl focus:ring-2 focus:ring-[#1d63ff] outline-none text-right text-gray-700 transition-all"
                placeholder="مثلاً: علوی"
                onChange={(e) => setFamily(e.target.value)}
              />
            </div>

            {/* فیلد ایمیل - تمام عرض */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block mr-1">پست الکترونیک</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-[#f1f5f9] border-none rounded-xl focus:ring-2 focus:ring-[#1d63ff] outline-none text-right text-gray-700 transition-all"
                placeholder="example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* فیلد رمز عبور - تمام عرض */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block mr-1">رمز عبور</label>
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
              className="w-full py-4 mt-4 rounded-xl bg-[#1d63ff] text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
            >
              {loading ? 'در حال ثبت...' : 'تایید و عضویت در سامانه'}
            </button>
          </form>

          {/* لینک بازگشت به لاگین */}
          <div className="mt-6 text-center text-sm text-gray-400">
            قبلاً عضو شده‌اید؟{' '}
            <button 
              type="button" 
              onClick={() => router.push('/')} 
              className="text-[#1d63ff] font-bold hover:underline"
            >
              وارد شوید
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}