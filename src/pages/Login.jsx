import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/'); // بعد تسجيل الدخول يروح للهوم
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">البريد الإلكتروني</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">كلمة المرور</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">دخول</button>
      </form>

      <div className="mt-3">
        <span>ليس لديك حساب؟ </span>
        <Link to="/register" className="btn btn-link p-0">
          إنشاء حساب جديد
        </Link>
      </div>
    </div>
  );
};

export default Login;
