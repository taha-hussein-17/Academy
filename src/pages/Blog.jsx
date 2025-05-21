import React, { useState } from "react";

// بيانات المقالات (تقدر تجددها أو تضيف من هنا)
const articles = [
  {
    id: 1,
    title: "مقدمة في HTML و CSS",
    summary: "تعلم أساسيات بناء صفحات الويب باستخدام HTML و CSS.",
    content: `
HTML وCSS هما اللبنة الأساسية لأي صفحة ويب.
🔹 HTML مسؤولة عن هيكلة الصفحة: العناوين، الفقرات، الصور، القوائم، النماذج، وغيرها.
🔹 CSS مسؤولة عن التنسيقات: الألوان، الخطوط، توزيع العناصر، الرسوم المتحركة، والمظهر العام.

مثال بسيط:
<html>
  <head>
    <style> h1 { color: red; } </style>
  </head>
  <body>
    <h1>مرحبا بك!</h1>
  </body>
</html>

ابدأ بكتابة صفحات بسيطة وجرّب تنسيقات مختلفة بنفسك.
    `,
    author: "طه حسين",
    date: "2025-05-20",
  },
  {
    id: 2,
    title: "أساسيات JavaScript",
    summary: "تعرف على أهم المفاهيم في جافاسكريبت وكيف تبدأ.",
    content: `
JavaScript هي لغة البرمجة التي تضيف التفاعل للمواقع.

☑️ أهم المفاهيم:
- المتغيرات: var, let, const
- الشروط: if, else, switch
- الحلقات: for, while
- الدوال: function declaration & arrow functions
- التعامل مع الأحداث: onclick, onsubmit

مثال:
document.querySelector("button").addEventListener("click", () => {
  alert("تم الضغط!");
});

ابدأ بتجارب بسيطة وتعلم من الأخطاء.
    `,
    author: "طه حسين",
    date: "2025-05-18",
  },
  {
    id: 3,
    title: "تصميم متجاوب باستخدام Media Queries",
    summary: "كيف تجعل موقعك يبدو رائعًا على الموبايل والتابلت واللابتوب.",
    content: `
التصميم المتجاوب ضروري لضمان تجربة مستخدم ممتازة على كل الأجهزة.

📱 Media Queries تسمح بتغيير التنسيق حسب حجم الشاشة:
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

🧠 الفكرة: صمم موبايل أولاً (Mobile First) وعدّل عند الأحجام الأكبر.
    `,
    author: "طه حسين",
    date: "2025-05-21",
  },
  {
    id: 4,
    title: "استخدام Git و GitHub في مشاريعك",
    summary: "تعلم كيف تدير إصدارات مشروعك وتشارك كودك مع الفريق.",
    content: `
Git أداة إدارة إصدارات، وGitHub منصة مشاركة.

🌀 الأوامر الأساسية:
- git init
- git add .
- git commit -m "رسالة"
- git push origin main

🧠 Git يحفظ سجل بكل التعديلات. GitHub يسمح لك ترفع مشروعك أونلاين وتشتغل مع تيم.

نصيحة: استخدم Git من أول مشروع.
    `,
    author: "طه حسين",
    date: "2025-05-20",
  },
  {
    id: 5,
    title: "البدء مع React – مكتبة بناء الواجهات",
    summary: "دليلك لفهم مبدأ المكونات (Components) واستخدام React.",
    content: `
React بتخليك تبني واجهات تفاعلية بسهولة.

🧩 المفاهيم الأساسية:
- المكونات (Components)
- Props وState
- الأحداث (Events)
- التكرار والتعامل مع المصفوفات
- useEffect/useState

مثال:
function Welcome(props) {
  return <h1>أهلاً، {props.name}</h1>;
}

ابدأ ببناء مكونات صغيرة وفهم العلاقة بينها.
    `,
    author: "طه حسين",
    date: "2025-05-21",
  }
];


export default function Blog() {
  const [selectedId, setSelectedId] = useState(null);

  const selectedArticle = articles.find((a) => a.id === selectedId);

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {!selectedId ? (
        <>
          <h2 style={{ textAlign: "center" }}>📝 مقالات تعليمية</h2>
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedId(article.id)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <small style={{ color: "#666" }}>
                بواسطة {article.author} - {article.date}
              </small>
            </div>
          ))}
          <div
            style={{
              backgroundColor: "#eef5f3",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "40px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>📌 من نحن</h3>
            <p style={{ lineHeight: "1.6", color: "#333" }}>
              نحن <strong>T.H Academy</strong>، أكاديمية متخصصة في تعليم تطوير واجهات المستخدم (Front-End Development).
              هدفنا هو تمكين المتعلمين من بناء مواقع وتطبيقات احترافية باستخدام HTML, CSS, JavaScript، ومكتبات حديثة مثل React وNext.js.
              🧑‍💻 نقدم محتوى عملي، واضح، وموجه للمبتدئين وحتى المحترفين.
            </p>
            <p style={{ marginTop: "10px", fontStyle: "italic", color: "#555" }}>
              ✨ تعلم، طبّق، وابدأ رحلتك في البرمجة معنا!
            </p>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedId(null)}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            ← رجوع
          </button>
          <h2>{selectedArticle.title}</h2>
          <small style={{ color: "#888" }}>
            بواسطة {selectedArticle.author} - {selectedArticle.date}
          </small>
          <p style={{ marginTop: "20px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            {selectedArticle.content}
          </p>
        </>
      )}
    </div>
  );
}