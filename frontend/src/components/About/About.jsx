import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative py-24 bg-[#727D73] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://img.freepik.com/premium-photo/couple-hands-holding-some-dirty-coins-blurry-white_539117-159.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid"
            alt="خلفية صفحة من نحن"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            من نحن
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-90">
            نسعى لمساعدة المسجونين بسبب الديون واستعادة حريتهم وكرامتهم
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://img.freepik.com/free-photo/people-showing-hand-gestures_23-2150493735.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid"
                alt="رسالتنا"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#3b5c3e] mb-4">
                رسالتنا
              </h2>
              <div className="w-20 h-1 bg-[#727D73] mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                في مؤسستنا، نكرس جهودنا لتحرير الأفراد المسجونين بسبب ديون
                تكبدوها لتلبية احتياجاتهم الأساسية. نؤمن بأنه لا ينبغي لأحد أن
                يفقد حريته لأنه سعى لتوفير الرعاية الصحية أو التعليم أو الدعم
                الأساسي لعائلته.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-16 bg-[#d0ddd061]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#3b5c3e] text-center mb-12">
            من نساعد
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "النفقات الطبية",
                image:
                  "https://img.freepik.com/premium-photo/close-up-unrecognizable-doctor-holding-hand-patient-while-supporting-him-before-surgical-operation_274679-10068.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                description:
                  "الأشخاص المسجونين بسبب ديون طبية لأنفسهم أو لأفراد عائلاتهم",
              },
              {
                title: "دعم العائلة",
                image:
                  "https://img.freepik.com/free-photo/photorealistic-kid-refugee-camp_23-2151494553.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                description:
                  "المعيلين الذين وقعوا في الديون لدعم عائلاتهم في أوقات المحن",
              },
              {
                title: "تكاليف التعليم",
                image:
                  "https://img.freepik.com/free-photo/education-growth-concept-arrangement_23-2148721290.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                description:
                  "الأشخاص الذين اقترضوا لتحسين حياتهم وفرصهم التعليمية المستقبلية",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:translate-y-1 hover:shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3b5c3e] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-[#727D73] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://img.freepik.com/free-photo/close-up-collected-coins-glass-jar-table_23-2147893642.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid"
            alt="رؤيتنا"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">رؤيتنا</h2>
            <p className="text-xl leading-relaxed">
              نتطلع إلى مجتمع لا تؤدي فيه الصعوبات المالية إلى السجن، حيث يتمكن
              المحتاجون من الوصول إلى أنظمة الدعم، وحيث لا تساوي الديون فقدان
              الحرية والكرامة.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#727D73] text-center mb-12">
            قيمنا
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "الكرامة",
                image:
                  "https://img.freepik.com/free-photo/person-holding-holy-bracelet-full-moon_23-2148288864.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                description: "نحترم إنسانية كل من نخدمهم",
              },
              {
                title: "الشفافية",
                image:
                  "https://img.freepik.com/premium-photo/young-man-carrying-heart-shaped-box_220507-10486.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                description: "نعمل بانفتاح كامل حول عملياتنا ومالياتنا",
              },
              {
                title: "التعاطف",
                image:
                  "https://img.freepik.com/free-photo/colorful-paper-chains-still-life_23-2149254025.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                description: "نتعامل مع كل حالة برعاية وتفهم حقيقيين",
              },
              {
                title: "العدالة",
                image:
                  "https://img.freepik.com/free-photo/still-life-illustrating-ethics-concept_23-2149412230.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                description:
                  "نعمل على معالجة القضايا النظامية التي تؤدي إلى سجن المديونين",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-[#3b5c3e] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-[#727D73] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://img.freepik.com/free-photo/high-angle-stack-coins_23-2148543199.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid"
            alt="انضم إلينا"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">انضم إلى قضيتنا</h2>
            <p className="text-lg mb-10">
              سواء كنت تستطيع المساهمة مالياً، أو التطوع بوقتك، أو المساعدة في
              نشر الوعي، هناك مكان لك في مهمتنا. معاً، يمكننا استعادة الحرية
              والأمل لأولئك الذين فقدوا كليهما بسبب الصعوبات المالية.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={"/announcements"}
                className="bg-white text-[#3b5c3e] px-8 py-3 rounded-lg font-semibold hover:bg-[#c5d3c6] transition duration-300"
              >
                تبرع الآن
              </Link>
              <Link
                to={"/contact"}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#3b5c3e] transition duration-300"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Section (New) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#727D73] text-center mb-12">
            قصص نجاح
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                image:
                  "https://img.freepik.com/free-photo/close-up-hand-wearing-cuffs-jail_23-2149098125.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                title: "أحمد - تحرر بعد سنتين من السجن",
                description:
                  "أحمد، أب لثلاثة أطفال، سُجن بسبب ديون طبية لعلاج ابنته. بفضل متبرعينا، تم سداد ديونه البالغة 15,000 دينار وعاد إلى أسرته.",
              },
              {
                image:
                  "https://img.freepik.com/free-photo/arrangement-with-book-plants_23-2148785042.jpg?uid=R189774248&ga=GA1.1.908539965.1736962294&semt=ais_hybrid",
                title: "سارة - استعادت مستقبلها التعليمي",
                description:
                  "سارة، طالبة جامعية متفوقة، واجهت السجن بسبب عدم قدرتها على سداد قروض تعليمية. تمكنّا من مساعدتها وهي الآن تكمل دراستها.",
              },
            ].map((story, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-[#3b5c3e] mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
