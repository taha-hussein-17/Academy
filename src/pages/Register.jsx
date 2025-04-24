import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // حفظ بيانات المستخدم
      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      // 📨 إضافة رسالة ترحيب
      await addDoc(collection(db, "users", user.uid, "messages"), {
        title: "🎉 مرحبًا بك!",
        body: `أهلًا ${form.name}! سعيدين بانضمامك إلى الأكاديمية 🌟`,
        type: "welcome",
        read: false,
        createdAt: serverTimestamp(),
      });

      Swal.fire({
        icon: 'success',
        title: 'تم التسجيل بنجاح!',
        text: 'سيتم تحويلك إلى صفحة الدخول الآن.',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/login');
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ',
        text: error.message,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">تسجيل حساب جديد</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">الاسم الكامل</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">البريد الإلكتروني</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">كلمة المرور</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">رقم واتساب</label>
          <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">تسجيل</button>
      </form>

      <div className="mt-3">
        <span>لديك حساب بالفعل؟ </span>
        <Link to="/login" className="btn btn-link p-0">تسجيل الدخول</Link>
      </div>
    </div>
  );
};

export default Register;
