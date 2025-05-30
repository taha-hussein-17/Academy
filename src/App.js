import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import NewCourse from './pages/NewCourse';
import EditCourse from './pages/EditCourse';
import CoursePlayer from './pages/CoursePlayer';
import JoinCourse from './pages/JoinCourse';
import { Helmet } from "react-helmet"
import Blog from './pages/Blog';

function App() {
  return (
    <div className="app">
      <Helmet>
        <title>T.H Academy </title>
        <meta name="description" content="تعلم تطوير الواجهات الأمامية باحتراف مع أكاديمية T.H. كورسات React وHTML وCSS وغيرها." />
      </Helmet>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/joinCourse" element={<JoinCourse />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route
            path="/courses/new"
            element={
              <PrivateRoute>
                <NewCourse/>
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/:id/edit"
            element={
              <PrivateRoute>
                <EditCourse />
              </PrivateRoute>
            }
          />
          <Route path="/courses/:id/play" element={<CoursePlayer />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
