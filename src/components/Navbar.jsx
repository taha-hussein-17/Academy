import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import brand from '../logo/logo512.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import '../styles/CourseCard.css'; // تأكد من إضافة هذا السطر لاستيراد الأنماط الخاصة بك
const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState('');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);  // حالة فتح/إغلاق القائمة المنسدلة

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name || '');
        }
      }
    };

    fetchUserName();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(prevState => !prevState);  // التبديل بين فتح/إغلاق القائمة
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ direction: 'rtl', display: 'flex', justifyContent: 'space-between' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={brand}
            alt="T.H Academy"
            style={{ maxWidth: '180px', height: 'auto' }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}  // استخدام الوظيفة لتبديل الحالة
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav"> {/* استخدام الحالة لتحديد إذا كانت القائمة مفتوحة */}
          <ul className="navbar-nav ms-auto align-items-center gap-5" style={{ textAlign: 'right', gap: "40px", marginRight: 'auto' }}>
            <li className="nav-item">
              <Link className="nav-link" to="/">الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses"> الكورسات</Link>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">دخول</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">تسجيل</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blog">نبذة</Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    👤 {userName || 'حسابي'}
                  </Link>
                </li>

                {user.email === 'capootaha17@gmail.com' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">لوحة التحكم</Link>
                  </li>
                )}

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-3"
                    onClick={handleLogout}
                  >
                    تسجيل الخروج
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
