import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/Home.css'; // تأكد من إضافة هذا السطر لاستيراد الأنماط الخاصة بك
function Courses() {
  const [courses, setCourses] = useState([]);
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        const coursesList = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesList);

        if (user) {
          const subscriptionsSnapshot = await getDocs(
            collection(db, 'users', user.uid, 'subscriptions')
          );
          const subscribedCourseIds = subscriptionsSnapshot.docs.map(doc => doc.id);
          setSubscribedCourses(subscribedCourseIds);
        }
      } catch (error) {
        console.error("Error fetching courses or subscriptions: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  if (loading) return <div>جاري تحميل الكورسات...</div>;

  const subscribedCoursesList = courses.filter(course =>
    subscribedCourses.includes(course.id)
  );

  const notSubscribedCourses = courses.filter(
    course => !subscribedCourses.includes(course.id)
  );

  return (
    <section className="container py-4">
      <h2 className="mb-4">كل الكورسات</h2>
      <div className="row mb-5">
        {notSubscribedCourses.length > 0 ? (
          notSubscribedCourses.map(course => (
            <div className="col-md-4 mb-4" key={course.id}>
              <div className="card h-100"
                style={{ flex: '1', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
                <img
                  src={course.imageUrl || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={course.title}
                  style={{
                    objectFit: 'cover', height: '200px', width: '90%', margin: ' 0 auto', borderRadius: '10px', marginTop: '20px', marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.2s',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', height: '70px' }}>
                    {course.description}
                  </p>
                  <Link to={`/courses/${course.id}`} className="btn btn-primary">عرض الكورس</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>تم الاشتراك في جميع الكورسات.</p>
        )}
      </div>

      <h2 className="mb-4">الكورسات المشترك بها</h2>
      <div className="row">
        {subscribedCoursesList.length > 0 ? (
          subscribedCoursesList.map(course => (
            <div className="col-md-4 mb-4" key={course.id}>
              <div className="card h-100 border-success">
                <img
                  src={course.imageUrl || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={course.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', height: '70px' }}>
                    {course.description}
                  </p>
                  <p className="text-success fw-bold">✅ مشترك</p>
                  <Link to={`/courses/${course.id}`} className="btn btn-outline-success">عرض الكورس</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>لم تقم بالاشتراك في أي كورس حتى الآن.</p>
        )}
      </div>
    </section>
  );
}

export default Courses;
