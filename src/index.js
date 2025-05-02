import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Helmet>
      <title>أكاديمية T.H - لتعلم الفرونت إند</title>
      <meta name="description" content="تعلم تطوير الواجهات الأمامية باحتراف مع أكاديمية T.H. كورسات React وHTML وCSS وغيرها." />
    </Helmet>
    <App />
  </BrowserRouter>
);
