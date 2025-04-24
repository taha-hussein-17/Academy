import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    if (!loadingAuth && !user) {
      navigate('/login');
    }
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const q = query(
          collection(db, 'courses'),
          where('uid', '==', user.uid) // الدورات التي أنشأها المستخدم
        );
        const snap = await getDocs(q);
        setMyCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        Swal.fire('خطأ', error.message, 'error');
      } finally {
        setLoadingCourses(false);
      }
    };
    if (user) fetchMyCourses();
  }, [user]);

  if (loadingAuth || loadingCourses) {
    return <div className="container mt-5">جاري التحميل...</div>;
  }

  return (
    <div className="container mt-5" style={{ direction: 'rtl' }}>
      <h2 className="mb-4">لوحة التحكم</h2>
      <p>مرحبًا، <strong>{user.email}</strong></p>
      <div className="mb-4">
        <Link to="/courses/new" className="btn btn-success me-2">
          إنشاء كورس جديد
        </Link>
        <Link to="/courses" className="btn btn-primary mx-4">
          استعراض كل الكورسات
        </Link>
      </div>

      <h4 className="mb-3">الكورسات الخاصة بي</h4>
      {myCourses.length === 0 ? (
        <p>لم تقم بإنشاء أي كورس بعد.</p>
      ) : (
        <div className="row">
          {myCourses.map(course => (
            <div key={course.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm" style={{ flex: '1', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }} >
                {course.imageUrl && (
                  <img
                    src={course.imageUrl}
                    className="card-img-top"
                    alt={course.title}
                    style={{
                      objectFit: 'cover', height: '200px', width: '90%', margin: ' 0 auto', borderRadius: '10px', marginTop: '20px', marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.2s',
                    }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text flex-grow-1">{course.description}</p>
                  <Link to={`/courses/${course.id}/edit`} className="btn btn-warning mt-auto">
                    تعديل الكورس
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
