import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import Swal from 'sweetalert2';
import { useAuthState } from 'react-firebase-hooks/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Home.css'; // Create and link your custom CSS

function Home() {
  const [latestCourses, setLatestCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const q = query(
          collection(db, 'courses'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const snap = await getDocs(q);
        const courses = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLatestCourses(courses);
      } catch (error) {
        Swal.fire('خطأ', error.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="home-page" dir="rtl">
      <section className="hero-section">
        <div className="hero-text" data-aos="fade-up">
          <h1>أهلاً بك في T.H Academy</h1>
          <p>
            انطلق الآن في رحلة تعلم تطوير الواجهات الأمامية ( Frontend) مع أفضل الخبراء.
          </p>
          {!user && (
            <Link to="/register" className="btn-primary">
              أنشئ حسابك الآن
            </Link>
          )}
        </div>
      </section>

      <section className="course-intro" data-aos="zoom-in">
        <div className="course-text">
          <h2>دورة FrontEnd</h2>
          <p>
            تعلم البرمجة من الصفر وابدأ أولى خطواتك في تخصص تطوير الويب.
          </p>
          <Link to="/courses" className="btn-success">اكتشف الكورس الآن</Link>
        </div>
        <img src="https://c7.alamy.com/comp/MP6D15/job-opening-front-end-developer-3d-MP6D15.jpg" alt="Frontend Development" />
      </section>

      <section className="who-section" data-aos="fade-right">
        <h2>لمن هذه الدبلومة؟</h2>
        <p>
          للمبتدئين، وأي شخص يريد تعلم البرمجة سواء طالب أو خريج أو محوّل مسار.
        </p>
        <Link to="/joinCourse" className="btn-light">اشترك الآن</Link>
      </section>

      <section className="outcomes" data-aos="fade-left">
        <h3>بعد الدبلومة هتقدر:</h3>
        <ul>
          <li>تصمم مواقع كاملة باستخدام HTML, CSS, JavaScript, وReact.</li>
          <li>تشتغل كمطور واجهات أمامية (Frontend Developer).</li>
          <li>تبني بورتفوليو احترافي.</li>
          <li>تفهم أدوات السوق زي Git و Firebase.</li>
          <li>تبدأ في التخصص أو تتوسع في Full Stack لاحقاً.</li>
        </ul>
      </section>

      <section className="project-section" data-aos="zoom-in-up">
        <h2>🎯 مشروع التخرج</h2>
        <p className="project-intro">
          في ختام رحلتك داخل الدبلومة وبعد تنفيذ أكثر من 25 مشروع عملي، ستقوم ببناء تطبيق تجارة إلكترونية حقيقي باستخدام أحدث تقنيات الفرونت إند.
          هذا المشروع سيكون بمثابة <strong>Portfolio احترافي</strong> يعكس تطورك ومهاراتك ويُهيئك لدخول سوق العمل بثقة.
        </p>

        <h3>🎯 الهدف من المشروع</h3>
        <p>
          إنتاج تطبيق E-Commerce متكامل يُعد إضافة قوية لمسيرتك سواءً للتقديم على وظائف أو للانطلاق في العمل الحر، مع التركيز على تجربة المستخدم، التصميم الجذاب، والوظائف الديناميكية.
        </p>

        <h3>🛠️ المتطلبات الأساسية:</h3>
        <ul className="project-requirements">
          <li><strong>تصميم متجاوب:</strong> التطبيق يتكيف تلقائيًا مع مختلف الشاشات (PC, Tablet, Mobile).</li>
          <li><strong>نظام التوثيق:</strong> تسجيل دخول وتسجيل حساب جديد باستخدام Firebase أو أي نظام Auth آخر.</li>
          <li><strong>المفضلة:</strong> إمكانية إضافة المنتجات لقائمة المفضلة وحفظها.</li>
          <li><strong>السلة والدفع:</strong> نظام متكامل لإدارة سلة المشتريات وتنفيذ عملية الدفع.</li>
          <li><strong>محرك بحث داخلي:</strong> تسهيل الوصول للمنتجات من خلال كلمات مفتاحية.</li>
          <li><strong>التقييمات والمراجعات:</strong> تمكين المستخدمين من تقييم المنتجات وكتابة مراجعات.</li>
          <li><strong>تنفيذ جميع الصفحات:</strong> التصميم الكامل لتجربة مستخدم مميزة وسهلة.</li>
        </ul>

        <h3>⚙️ التقنيات المستخدمة:</h3>
        <ul className="project-tech">
          <li>✅ React.js</li>
          <li>✅ React Router</li>
          <li>✅ مكتبة تصميم (TailwindCSS أو Material UI)</li>
          <li>✅ إدارة الحالة (Context API - Zustand - Redux)</li>
          <li>✅ React Hook Form أو Formik</li>
          <li>✅ ESLint و Prettier</li>
          <li>✅ Vite لتجربة تطوير سريعة</li>
        </ul>

        <h3>🌟 ميزات إضافية (اختيارية):</h3>
        <ul className="project-optional">
          <li>☁️ استخدام Firebase أو Supabase</li>
          <li>🌐 دعم تعدد اللغات باستخدام react-i18next</li>
        </ul>
      </section>


      <section className="latest-courses" data-aos="fade-up">
        <h2>📚 أحدث الكورسات</h2>
        {loading ? (
          <p className="loading-text">جاري التحميل...</p>
        ) : latestCourses.length === 0 ? (
          <p className="no-courses">لا توجد كورسات حالياً.</p>
        ) : (
          <div className="courses-grid">
            {latestCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
      <section className="testimonials-section" data-aos="fade-up">
        <h2>🗣️ ماذا قال طلابنا؟</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>“الدبلومة كانت تجربة رائعة! قدرت أفهم الأساسيات واشتغلت على مشاريع حقيقية.”</p>
            <h4>أحمد محمد</h4>
            <span>خريج دفعة 2024</span>
          </div>
          <div className="testimonial-card">
            <p>“المحتوى مرتب وعملي جدًا، والمدرب دائمًا متابع معانا خطوة بخطوة.”</p>
            <h4>سارة خالد</h4>
            <span>طالبة في المسار المهني</span>
          </div>
          <div className="testimonial-card">
            <p>“بعد الدبلومة عملت بورتفوليو وقدرت أقدم على شغل في شركة ناشئة!”</p>
            <h4>محمد علي</h4>
            <span>مطوّر Frontend مبتدئ</span>
          </div>
        </div>
      </section>
      <section className="faq-section" data-aos="fade-up">
        <h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="30"
            height="30"
            className="faq-icon ms-2"
          >
            <path
              fill="currentColor"
              d="M256 8C119 6 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-119.1 0-216-96.91-216-216S136.9 40 256 40s216 96.91 216 216-96.9 216-216 216zm-16-272c0-39.7-32.3-72-72-72s-72 32.3-72 72 32.3 72 72 72 72-32.3 72-72zm0 128c-39.7 0-72 32.3-72 72v16h144v-16c0-39.7-32.3-72-72-72z"
            />
          </svg>
          الأسئلة الشائعة
        </h2>
        <div className="faq-container ">
          <details>
            <summary>ما هي الوظائف التي أستطيع التقديم عليها بعد التخرج من هذه الدبلومة؟</summary>
            <p>بعد التخرج من الدبلومة، يمكنك التقديم على وظائف Front-End Developer، Junior Web Developer، UI Developer، وغيرها من الوظائف المرتبطة بتطوير واجهات المستخدم في الشركات التقنية أو شركات البرمجيات أو العمل الحر.</p>
          </details>

          <details >
            <summary>ما هو نظام الدراسة في الدبلومة؟ وهل هي أونلاين أم أوفلاين؟</summary>
            <p>
              نظام الدراسة في الدبلومة ومنصة المدرسة يكون أونلاين وفقًا للوقت الذي يناسبك من خلال دورات مقسمة لدروس تفاعلية وفيديوهات مسجلة باستخدام رسوم توضيحية وأنيميشن وجرافيكس احترافية، بالإضافة إلى الأمثلة العملية وخبرات العمل التي يقدمها لك المهندسون بطريقة بسيطة وسلسة خلال تلك الفيديوهات. وتحتوي جميع الدورات على ملخصات وتحديات/مشاريع وامتحانات. ويُمكنك أيضًا طرح أي سؤال أو الاستفسار عن أي معلومة لا تفهمها في أي درس عن طريق وضع تعليق على الدرس وسيجيبك المهندسون، أو يمكنك إرسال السؤال من خلال الدردشة والمجموعات الدراسية، أو الاجتماعات الأسبوعية التي تكون على تطبيق Zoom مباشرةً مع المهندسين.
            </p>
          </details>

          <details>
            <summary>ما الذي ستحصل عليه عند اشتراكك في دبلومة تعلم الفرونت إند؟</summary>
            <p>ستحصل على محتوى تعليمي شامل، مشاريع تطبيقية، دعم فني وتعليمي مباشر، شهادة إتمام، ومجتمع تعليمي متفاعل لمساعدتك في رحلتك.</p>
          </details>

          <details>
            <summary>من هم معلمين الدبلومة وما هي خبراتهم؟</summary>
            <p>معلمو الدبلومة هم مهندسون متخصصون في مجال تطوير الويب، لديهم سنوات من الخبرة العملية والتعليمية، وشاركوا في بناء منصات ومواقع حقيقية، ولديهم خبرة قوية في تدريب الطلاب بمستويات مختلفة.</p>
          </details>

          <details>
            <summary>ما السن المناسب للتقديم للدبلومة؟ وهل هي مناسبة للأطفال؟</summary>
            <p>الدبلومة مناسبة لأي شخص عمره فوق 14 سنة، ويُفضل أن يكون لديه شغف بالتعلم ومهارات استخدام الحاسب. غير مخصصة للأطفال الصغار جدًا.</p>
          </details>

          <details>
            <summary>ما هو منهج الدبلومة؟</summary>
            <p>يشمل المنهج HTML, CSS, JavaScript, Git, Responsive Design, Bootstrap, React، وأساسيات في REST APIs وFirebase، بالإضافة إلى مشاريع تطبيقية.</p>
          </details>

          <details>
            <summary>هل دبلومة الفرونت إند لطلاب الكليات المتخصصة في علوم الحاسب فقط؟</summary>
            <p>لا، الدبلومة متاحة لأي شخص يرغب في دخول مجال تطوير الويب، سواء كان من خلفية تقنية أو لا.</p>
          </details>

          <details>
            <summary>هل اللغة الانجليزية مهمة وشرط لتعلم واتقان البرمجة أو للتسجيل في هذه الدبلومة؟</summary>
            <p>اللغة الإنجليزية تساعد في فهم التوثيق (Documentation) وأدوات البرمجة، ولكن الشرح في الدبلومة يتم باللغة العربية، ولا تشترط إجادة الإنجليزية للتسجيل.</p>
          </details>

          <details>
            <summary>هل يوجد تواصل مباشر مع مشرفي الدورات ومعلمي المسار؟</summary>
            <p>نعم، يوجد تواصل من خلال التعليقات داخل الدروس، مجموعات الدراسة، واجتماعات أسبوعية مباشرة على Zoom.</p>
          </details>

          <details>
            <summary>هل ممكن أن أدرس Angular في الدبلومة بدل React؟ ولماذا تتم الدراسة في الدبلومة بـ React تحديدًا وما هو مميزاته؟</summary>
            <p>لا، الدبلومة تعتمد React لأنها الأكثر طلبًا في سوق العمل، وأسهل في التعلم للمبتدئين، ومجتمعها الكبير يوفر مصادر دعم قوية.</p>
          </details>

          <details>
            <summary>من هو الـ Front End Developer؟</summary>
            <p>هو المطور المسؤول عن تصميم وتنفيذ واجهة المستخدم في المواقع والتطبيقات باستخدام تقنيات HTML, CSS, JavaScript، وأطر العمل مثل React.</p>
          </details>

          <details>
            <summary>ما هي دبلومة فرونت اند الشاملة؟</summary>
            <p>هي مسار تدريبي مكثف لتأهيلك لسوق العمل كمطور واجهات أمامية، يحتوي على كل ما تحتاجه من مهارات وأدوات ومشاريع عملية.</p>
          </details>

          <details>
            <summary>ما هي لغات الفرونت اند والباك اند؟</summary>
            <p>لغات الفرونت اند: HTML, CSS, JavaScript. <br /> لغات الباك اند: PHP, Python, Node.js, Ruby, وغيرها.</p>
          </details>

          <details>
            <summary>كيف تصبح مطور فرونت اند (Frontend developer)؟</summary>
            <p>ابدأ بتعلم HTML, CSS, JavaScript، ثم تعلم إطار عمل مثل React، واشتغل على مشاريع تطبيقية، وشارك في المجتمعات، وطور مهاراتك باستمرار.</p>
          </details>

          <details>
            <summary> كيف يتم الدفع</summary>
            <p> بتم الدفع بعد حضور أول محاضرتين من خلال برنامج زووم ويمكن دفع المبلغ على مرحلتين <br/> المرحلة الاولى : بعد المحاضرتين المجانيتين <br /> المرحلة الثانية : بعد شهر من الدراسة</p>
          </details>
        </div>
      </section>


      <section className="why-us" data-aos="fade-up">
        <h2>لماذا T.H Academy؟</h2>
        <div className="reasons">
          <div>🎓 مدربون محترفون</div>
          <div>🔄 محتوى محدث</div>
          <div>🤝 مجتمع داعم</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
