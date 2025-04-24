import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Profile() {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  if (!user) {
    return <div className="container mt-5">الرجاء تسجيل الدخول لعرض الملف الشخصي.</div>;
  }

  return (
    <div className="container mt-5" style={{ direction: 'rtl' }}>
      <h2 className="mb-4">👤 الملف الشخصي</h2>
      {userInfo ? (
        <div className="card p-4 shadow">
          <p><strong>الاسم:</strong> {userInfo.name || 'غير متوفر'}</p>
          <p><strong>البريد الإلكتروني:</strong> {userInfo.email}</p>
          <p><strong>رقم واتساب:</strong> {userInfo.phone || 'غير متوفر'}</p>
          <p><strong>UID:</strong> {userInfo.uid}</p>
        </div>
      ) : (
        <p>جاري تحميل بياناتك...</p>
      )}
    </div>
  );
}

export default Profile;
