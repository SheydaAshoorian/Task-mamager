import axios from 'axios';
import Cookies from 'js-cookie';

// ۱. ایجاد یک نمونه سفارشی از اکسوس با آدرس پایه
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ۲. اینترسپتور: قبل از هر درخواست، توکن را به صورت خودکار اضافه می‌کند
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ۳. مدیریت خطاهای عمومی (مثلاً اگر توکن منقضی شده بود)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // مثلاً هدایت کاربر به صفحه لاگین اگر توکن معتبر نبود
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;