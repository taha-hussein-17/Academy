// src/pages/EditCourse.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const ref = doc(db, 'courses', id);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        Swal.fire('خطأ', 'الكورس غير موجود.', 'error').then(() => navigate('/dashboard'));
        return;
      }
      setForm(snap.data());
    };
    fetchCourse();
  }, [id, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const ref = doc(db, 'courses', id);
      await updateDoc(ref, {
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl,
        videoUrl: form.videoUrl  // Add video URL to update
      });
      Swal.fire('نجاح', 'تم تحديث الكورس.', 'success');
      navigate('/dashboard');
    } catch (error) {
      Swal.fire('خطأ', error.message, 'error');
    }
  };

  if (!form) return <div className="container mt-5">جاري التحميل...</div>;

  return (
    <div className="container mt-5" style={{ direction: 'rtl' }}>
      <h2 className="mb-4">تعديل كورس</h2>
      <form onSubmit={handleUpdate}>
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
        <button className="btn btn-warning">تحديث</button>
      </form>
    </div>
  );
};

export default EditCourse;
