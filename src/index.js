import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Helmet } from "react-helmet"
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Helmet>
      <title>T.H Academy </title>
      <meta name="description" content="تعلم تطوير الواجهات الأمامية باحتراف مع أكاديمية T.H. كورسات React وHTML وCSS وغيرها." />
    </Helmet>
    <App />
  </BrowserRouter>
);
