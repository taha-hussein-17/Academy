import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';

function JoinCourse() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    education: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'courseSubscribers'), formData);
      Swal.fire('تم الاشتراك بنجاح', 'سنتواصل معك قريبًا!', 'success');
      setFormData({ name: '', email: '', phone: '', age: '', education: '' });
    } catch (error) {
      Swal.fire('خطأ', error.message, 'error');
    }
  };

  return (
    <div className="container py-5" style={{ direction: 'rtl' }}>
      <h2 className="mb-4 text-center">اشترك في الدبلومة الآن</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="form-group mb-3">
          <label>الاسم الكامل</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>البريد الإلكتروني</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>رقم الموبايل</label>
          <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>العمر</label>
          <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>المؤهل الدراسي</label>
          <input type="text" className="form-control" name="education" value={formData.education} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">اشترك الآن</button>
      </form>
    </div>
  );
}

export default JoinCourse;
