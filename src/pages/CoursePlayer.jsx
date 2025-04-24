// src/pages/Courses.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        const usersSnapshot = await getDocs(collection(db, 'users'));

        const coursesList = await Promise.all(
          coursesSnapshot.docs.map(async (doc) => {
            const course = { id: doc.id, ...doc.data() };

            let subscribersCount = 0;

            for (const userDoc of usersSnapshot.docs) {
              const subscriptionsSnapshot = await getDocs(
                collection(db, 'users', userDoc.id, 'subscriptions')
              );

              const isSubscribed = subscriptionsSnapshot.docs.some(
                (sub) => sub.id === course.id
              );

              if (isSubscribed) {
                subscribersCount++;
              }
            }

            return { ...course, subscribersCount };
          })
        );

        setCourses(coursesList);

        if (user) {
          const subscriptionsSnapshot = await getDocs(
            collection(db, 'users', user.uid, 'subscriptions')
          );
          const subscribedCourseIds = subscriptionsSnapshot.docs.map((doc) => doc.id);
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

  if (loading) {
    return <div>جاري تحميل الكورسات...</div>;
  }

  const subscribedCoursesList = courses.filter(course =>
    subscribedCourses.includes(course.id)
  );

  return (
    <section className="container py-5">
      <h2 className="mb-4">الكورسات المشترك بها</h2>
      <div className="row">
        {subscribedCoursesList.length > 0 ? (
          subscribedCoursesList.map(course => (
            <div className="col-md-4 mb-4" key={course.id}>
              <div className="card h-100">
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
                  <p className="card-text text-muted">👥 عدد المشتركين: {course.subscribersCount || 0}</p>
                  <Link to={`/courses/${course.id}`} className="btn btn-primary">عرض الكورس</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>لا توجد كورسات مشترك فيها حالياً.</p>
        )}
      </div>
    </section>
  );
}

export default Courses;
