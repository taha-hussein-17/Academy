// src/pages/CourseDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [user, loadingAuth] = useAuthState(auth);
  const [enrolled, setEnrolled] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRef = doc(db, 'courses', id);
        const courseSnap = await getDoc(courseRef);
        if (courseSnap.exists()) {
          setCourse({ id: courseSnap.id, ...courseSnap.data() });
        } else {
          Swal.fire('خطأ', 'الكورس غير موجود', 'error');
          navigate('/courses');
        }
      } catch (error) {
        Swal.fire('خطأ', error.message, 'error');
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user) return;
      const enrollmentRef = doc(db, 'users', user.uid, 'enrollments', id);
      const enrollmentSnap = await getDoc(enrollmentRef);
      setEnrolled(enrollmentSnap.exists());
    };

    if (user) checkEnrollment();
  }, [user, id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid, 'enrollments', id), {
        courseId: id,
        enrolledAt: new Date(),
      });
      Swal.fire('تم الاشتراك!', 'تم تسجيلك في الكورس بنجاح.', 'success');
      setEnrolled(true);
    } catch (error) {
      Swal.fire('خطأ', error.message, 'error');
    }
  };

  if (loadingCourse) return <div className="container mt-5">جاري التحميل...</div>;

  if (!course) return null;

  return (
    <div className="container mt-5" style={{ direction: 'rtl' }}>
      <h2>{course.title}</h2>
      {course.imageUrl && (
        <img src={course.imageUrl} alt={course.title} className="img-fluid mb-3" />
      )}
      <p>{course.description}</p>

      {enrolled ? (
        <Link to={`/courses/${id}/play`} className="btn btn-success">
          مشاهدة الكورس
        </Link>
      ) : (
        <button onClick={handleEnroll} className="btn btn-primary">
          اشترك في الكورس
        </button>
      )}
    </div>
  );
};

export default CourseDetails;
