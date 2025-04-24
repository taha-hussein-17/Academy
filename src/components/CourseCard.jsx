// src/components/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CourseCard.css'; // Create and link your custom CSS
const CourseCard = ({ course }) => {
  return (
    <div className="card mb-4 flex-1" style={{ flex: "1", textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "10px", }}>
      <img
        src={course.imageUrl || 'https://via.placeholder.com/150'}
        className="card-img-top"
        alt={course.title}
        style={{
          objectFit: 'cover', height: '200px', width: '90%', margin:' 0 auto', borderRadius: '10px', marginTop: '20px', marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.2s',
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text">{course.description}</p>
        {course.subscribersCount !== undefined && (
          <p className="text-muted">👥 عدد المشتركين: {course.subscribersCount}</p>
        )}
        <Link to={`/courses/${course.id}`} className="btn btn-primary mt-auto">
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
