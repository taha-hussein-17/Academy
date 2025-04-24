// src/pages/NewCourse.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Swal from 'sweetalert2';

const NewCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    videoUrl: ''  // Add videoUrl state
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'courses'), {
        ...form,
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      Swal.fire('نجاح', 'تم إنشاء الكورس بنجاح.', 'success');
      navigate('/dashboard');
    } catch (error) {
      Swal.fire('خطأ', error.message, 'error');
    }
  };

  return (
    <div className="container mt-5" style={{ direction: 'rtl' }}>
      <h2 className="mb-4">إنشاء كورس جديد</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">عنوان الكورس</label>
          <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">وصف الكورس</label>
          <textarea name="description" className="form-control" rows="4" value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">رابط صورة الكورس</label>
          <input type="url" name="imageUrl" className="form-control" value={form.imageUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">رابط الفيديو</label>
          <input type="url" name="videoUrl" className="form-control" value={form.videoUrl} onChange={handleChange} />
        </div>
        <button className="btn btn-success">إنشاء</button>
      </form>
    </div>
  );
};

export default NewCourse;
