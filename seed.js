// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Module } = require('./models/Schemas');

dotenv.config();

// 🟢 फिक्स: पहले वीडियो के अंदर Quiz Schema डेटा को शामिल कर दिया गया है
const modulesData = [
  {
    moduleId: 1,
    title: "Module 1 — WELCOME & MINDSET BUILDING",
    subModules: [
      {
        subModuleId: "m1-s1",
        title: "SubModule 1A: Welcome to Exowa Women Partner Program",
        videos: [
          { 
            videoId: "m1s1-v1", 
            title: "Exowa क्या है?", 
            url: "https://all-exowa-training-video.netlify.app/exowa_kya_hai.mp4", 
            sequenceOrder: 1,
            // 🎯 जोड़ा गया क्विज़ डेटा
            quiz: [
{
question: "Exowa का मुख्य उद्देश्य क्या है?",
options: [
"बच्चों की पढ़ाई को आसान, प्रैक्टिस आधारित और Personalized बनाना",
"केवल ऑनलाइन गेम उपलब्ध कराना",
"केवल स्कूलों को मैनेज करना",
"केवल ट्यूशन क्लास चलाना"
],
correctAnswer: 0
},
{
question: "हर बच्चे की Learning Capacity के बारे में Script में क्या बताया गया है?",
options: [
"सभी बच्चे एक समान सीखते हैं",
"हर बच्चे की सीखने की क्षमता अलग होती है",
"केवल तेज बच्चे ही सफल होते हैं",
"बच्चों को Practice की आवश्यकता नहीं होती"
],
correctAnswer: 1
},
{
question: "Exowa को किस रूप में प्रस्तुत किया गया है?",
options: [
"एक सोशल मीडिया प्लेटफॉर्म",
"एक Smart Education Platform",
"एक बैंकिंग ऐप",
"एक गेमिंग ऐप"
],
correctAnswer: 1
},
{
question: "Exowa की मदद से बच्चे क्या कर सकते हैं?",
options: [
"केवल वीडियो देख सकते हैं",
"Regular Practice कर सकते हैं",
"केवल चैट कर सकते हैं",
"केवल गेम खेल सकते हैं"
],
correctAnswer: 1
},
{
question: "Exowa की मदद से Parents क्या कर सकते हैं?",
options: [
"बच्चे की Progress Track कर सकते हैं",
"केवल फीस जमा कर सकते हैं",
"केवल Attendance देख सकते हैं",
"कुछ भी नहीं"
],
correctAnswer: 0
},
{
question: "Exowa Students के किस पहलू को पहचानने में मदद करता है?",
options: [
"Favourite Colour",
"Weak Subjects / Weak Points",
"दोस्तों की संख्या",
"स्कूल की दूरी"
],
correctAnswer: 1
},
{
question: "निम्न में से कौन-सी सुविधा Exowa में उपलब्ध है?",
options: [
"Personalized Question Papers",
"Online Tests",
"Performance Analysis",
"उपरोक्त सभी"
],
correctAnswer: 3
},
{
question: "Instant Feedback का मुख्य लाभ क्या है?",
options: [
"बच्चा अपनी तैयारी और गलतियों को जल्दी समझ सकता है",
"मोबाइल की स्पीड बढ़ती है",
"इंटरनेट फ्री मिलता है",
"होमवर्क अपने आप पूरा हो जाता है"
],
correctAnswer: 0
},
{
question: "Exowa Women Partner Program के माध्यम से महिलाएं क्या कर सकती हैं?",
options: [
"Parents को Platform के बारे में जानकारी दे सकती हैं",
"बच्चों की शिक्षा में योगदान दे सकती हैं",
"घर बैठे Income बना सकती हैं",
"उपरोक्त सभी"
],
correctAnswer: 3
},
{
question: "Exowa केवल बच्चों की मदद करता है। यह कथन है:",
options: [
"सही",
"गलत"
],
correctAnswer: 1
},
{
question: "Exowa का मिशन किन दो क्षेत्रों को साथ लेकर चलता है?",
options: [
"Education और Women Empowerment",
"Agriculture और Banking",
"Sports और Tourism",
"Politics और Business"
],
correctAnswer: 0
},
{
question: "Exowa का विश्वास क्या है?",
options: [
"हर बच्चे को उसकी जरूरत के अनुसार सीखने का अधिकार मिलना चाहिए",
"केवल टॉपर बच्चों को अवसर मिलना चाहिए",
"केवल बड़े शहरों के बच्चे सफल हो सकते हैं",
"Practice की आवश्यकता नहीं होती"
],
correctAnswer: 0
},
{
question: "Personalized Learning का क्या अर्थ है?",
options: [
"हर बच्चे को उसकी जरूरत के अनुसार सीखने का अवसर देना",
"सभी बच्चों को एक जैसा पढ़ाना",
"केवल परीक्षा पर ध्यान देना",
"केवल Homework देना"
],
correctAnswer: 0
},
{
question: "Exowa बच्चों को बेहतर Revision का अवसर क्यों देता है?",
options: [
"ताकि सीखना मजबूत हो और परिणाम बेहतर हों",
"ताकि बच्चे कम पढ़ें",
"ताकि स्कूल बंद हो जाएं",
"ताकि परीक्षा न देनी पड़े"
],
correctAnswer: 0
},
{
question: "Training का अगला वीडियो कब अनलॉक होगा?",
options: [
"वीडियो पूरा देखने और Assessment Pass करने पर",
"वीडियो Skip करने पर",
"7 दिन बाद",
"अपने आप"
],
correctAnswer: 0
}
]

          },
          { videoId: "m1s1-v2",
           title: "Program का उद्देश्य", 
           url: "https://all-exowa-training-video.netlify.app/program_purpose.mp4", 
           sequenceOrder: 2, 
           quiz: [
{
question: “Exowa Women Partner Program शुरू करने के पीछे मुख्य सोच क्या है?”,
options: [
“महिलाओं को नौकरी दिलाना”,
“महिलाओं को सही अवसर, मार्गदर्शन और आत्मविश्वास देना”,
“केवल बच्चों को पढ़ाना”,
“केवल ऑनलाइन कोर्स बेचना”
],
correctAnswer: 1
},
{
question: “Program का मुख्य उद्देश्य क्या है?”,
options: [
“महिलाओं को आत्मनिर्भर, आत्मविश्वासी और आर्थिक रूप से सशक्त बनाना”,
“महिलाओं को सरकारी नौकरी दिलाना”,
“महिलाओं को विदेश भेजना”,
“केवल शिक्षा देना”
],
correctAnswer: 0
},
{
question: “Exowa Women Partner Program महिलाओं को किस प्रकार काम करने का अवसर देता है?”,
options: [
“ऑफिस जाकर”,
“फैक्ट्री में”,
“घर बैठे सम्मान के साथ”,
“केवल पार्ट-टाइम स्कूल में”
],
correctAnswer: 2
},
{
question: “Program के माध्यम से महिलाएं क्या बना सकती हैं?”,
options: [
“अपनी अलग पहचान”,
“केवल नया मोबाइल”,
“नई डिग्री”,
“केवल बैंक खाता”
],
correctAnswer: 0
},
{
question: “Exowa का एक महत्वपूर्ण उद्देश्य क्या है?”,
options: [
“हर घर तक बेहतर शिक्षा पहुंचाना”,
“हर घर में इंटरनेट लगवाना”,
“हर घर में कंप्यूटर देना”,
“हर घर में ट्यूशन खोलना”
],
correctAnswer: 0
},
{
question: “आज कई बच्चे किस कमी के कारण पीछे रह जाते हैं?”,
options: [
“मोबाइल की कमी”,
“Practice और Guidance की कमी”,
“स्कूल की कमी”,
“दोस्तों की कमी”
],
correctAnswer: 1
},
{
question: “Exowa के माध्यम से महिलाएं किसका हिस्सा बन सकती हैं?”,
options: [
“बच्चों के बेहतर भविष्य का”,
“केवल स्कूल प्रबंधन का”,
“सरकारी योजनाओं का”,
“खेल प्रतियोगिता का”
],
correctAnswer: 0
},
{
question: “Program के जरिए महिलाओं को क्या अवसर मिलता है?”,
options: [
“Income Opportunity”,
“Leadership Skills Development”,
“Communication Confidence”,
“उपरोक्त सभी”
],
correctAnswer: 3
},
{
question: “Program में कौन-सी Skill विकसित होती है?”,
options: [
“Leadership Skills”,
“Driving Skills”,
“Coding Skills”,
“Cooking Skills”
],
correctAnswer: 0
},
{
question: “Program महिलाओं में क्या बढ़ाने में मदद करता है?”,
options: [
“Communication Confidence”,
“Exam Marks”,
“Sports Performance”,
“Travel Experience”
],
correctAnswer: 0
},
{
question: “Exowa Women Partner Program के माध्यम से क्या बनता है?”,
options: [
“Women Support Community”,
“Political Group”,
“Sports Club”,
“Entertainment Club”
],
correctAnswer: 0
},
{
question: “Exowa का लक्ष्य केवल क्या नहीं है?”,
options: [
“Learning”,
“Community Building”,
“Earning”,
“Confidence Development”
],
correctAnswer: 2
},
{
question: “Exowa महिलाओं को किस प्रकार का मंच देना चाहता है?”,
options: [
“सम्मान, आत्मविश्वास और सफलता का मंच”,
“केवल नौकरी का मंच”,
“केवल शिक्षा का मंच”,
“केवल मनोरंजन का मंच”
],
correctAnswer: 0
},
{
question: “जब एक महिला सशक्त होती है, तो क्या मजबूत बनता है?”,
options: [
“केवल परिवार”,
“केवल समाज”,
“परिवार और समाज दोनों”,
“केवल व्यवसाय”
],
correctAnswer: 2
},
{
question: “Exowa Women Partner Program का संदेश क्या है?”,
options: [
“सशक्त महिला, सशक्त परिवार, सशक्त समाज”,
“पढ़ो और आगे बढ़ो”,
“हर घर में शिक्षा”,
“कमाओ और बचाओ”
],
correctAnswer: 0
}
]},
          { videoId: "m1s1-v3", title: "Women empowerment vision", url: "https://all-exowa-training-video.netlify.app/women_empowerment_vision.mp4", sequenceOrder: 3, quiz: [] },
          { videoId: "m1s1-v4", title: "आपको क्या करना है ?", url: "https://all-exowa-training-video.netlify.app/aapko_kya_karna_hai.mp4", sequenceOrder: 4, quiz: [] }
        ]
      },
      {
        subModuleId: "m1-s2",
        title: "SubModule 1B: Why This Opportunity is Special for Women",
        videos: [
          { videoId: "m1s2-v1", title: "Work from home", url: "https://all-exowa-training-video.netlify.app/work_from_home.mp4", sequenceOrder: 5, quiz: [] },
          { videoId: "m1s2-v2",
           title: "सम्मान + income",
           url: "https://all-exowa-training-video.netlify.app/samman_aur_income.mp4", sequenceOrder: 6,
           quiz: [
{
question: "महिलाएं काम करने के बारे में सोचते समय केवल किस चीज़ के बारे में नहीं सोचतीं?",
options: ["Income", "सम्मान और पहचान", "आत्मविश्वास", "उपरोक्त सभी"],
correctAnswer: 0
},
{
question: "हर महिला क्या चाहती है?",
options: [
"लोग उसकी बात को महत्व दें",
"परिवार उस पर गर्व करे",
"समाज उसे सम्मान की नजर से देखे",
"उपरोक्त सभी"
],
correctAnswer: 3
},
{
question: "Exowa Women Partner Program महिलाओं को क्या प्रदान करता है?",
options: [
"सिर्फ Income",
"सिर्फ सम्मान",
"सिर्फ Training",
"सम्मान, आत्मविश्वास और Income का अवसर"
],
correctAnswer: 3
},
{
question: "जब आप बच्चों की शिक्षा में योगदान देती हैं और Parents की मदद करती हैं, तो लोग आपको किस रूप में देखने लगते हैं?",
options: [
"केवल काम करने वाली महिला",
"Responsible और Inspiring Personality",
"Teacher",
"Student"
],
correctAnswer: 1
},
{
question: "Script के अनुसार असली सम्मान क्या है?",
options: [
"अधिक पैसा कमाना",
"लोगों का विश्वास और सम्मान प्राप्त करना",
"बड़ी नौकरी करना",
"विदेश जाना"
],
correctAnswer: 1
},
{
question: "अपनी मेहनत से Income कमाने पर महिला में क्या बढ़ता है?",
options: [
"Self Confidence",
"Decision लेने की क्षमता",
"सक्षमता का एहसास",
"उपरोक्त सभी"
],
correctAnswer: 3
},
{
question: "Income केवल क्या नहीं देती?",
options: [
"पैसे",
"सपनों को पूरा करने की ताकत",
"परिवार की मदद का अवसर",
"आत्मनिर्भर बनने का रास्ता"
],
correctAnswer: 0
},
{
question: "Income महिलाओं को किस दिशा में आगे बढ़ने में मदद करती है?",
options: [
"आत्मनिर्भर बनने में",
"खेलकूद में",
"विदेश यात्रा में",
"सरकारी नौकरी में"
],
correctAnswer: 0
},
{
question: "Exowa Women Partner Program में महिलाएं क्या कमाती हैं?",
options: [
"केवल Income",
"केवल सम्मान",
"सम्मान, Income और अपनी पहचान",
"केवल अनुभव"
],
correctAnswer: 2
},
{
question: "जब महिला सम्मान और आत्मनिर्भरता दोनों हासिल कर लेती है, तो क्या होता है?",
options: [
"उसकी जिंदगी बदलने लगती है",
"वह नौकरी छोड़ देती है",
"उसे Training की जरूरत नहीं रहती",
"कुछ नहीं बदलता"
],
correctAnswer: 0
},
{
question: "Exowa का उद्देश्य केवल क्या नहीं है?",
options: [
"Learning",
"Earning",
"Training",
"Marketing"
],
correctAnswer: 1
},
{
question: "Exowa महिलाओं को क्या देना चाहता है?",
options: [
"आत्मविश्वास",
"सम्मान",
"सफलता",
"उपरोक्त सभी"
],
correctAnswer: 3
},
{
question: "Income से महिलाओं में कौन-सी शक्ति बढ़ती है?",
options: [
"Decision लेने की ताकत",
"खेल क्षमता",
"यात्रा क्षमता",
"तकनीकी ज्ञान"
],
correctAnswer: 0
},
{
question: "निम्न में से कौन-सा Income का लाभ नहीं है?",
options: [
"सपनों को पूरा करना",
"परिवार की मदद करना",
"आत्मनिर्भर बनना",
"बिना मेहनत सफलता पाना"
],
correctAnswer: 3
},
{
question: "Script के अनुसार एक महिला को वास्तव में सशक्त क्या बनाता है?",
options: [
"केवल Income",
"केवल सम्मान",
"सम्मान और Income का संयोजन",
"केवल शिक्षा"
],
correctAnswer: 2
}
]
 },
          { videoId: "m1s2-v3", title: "बिना investment business mindset", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 7, quiz: [] },
          { videoId: "m1s2-v4", title: "Housewives भी क्यों सफल हो सकती हैं", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 8, quiz: [] }
        ]
      },
      {
        subModuleId: "m1-s3",
        title: "SubModule 1C: Success Mindset for Women Partners",
        videos: [
          { videoId: "m1s3-v1", title: "डर कैसे हटाएं", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 9, quiz: [] },
          { videoId: "m1s3-v2", title: "Communication confidence", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 10, quiz: [] },
          { videoId: "m1s3-v3", title: "“मैं नहीं कर पाऊंगी” mindset खत्म करना", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 11, quiz: [] },
          { videoId: "m1s3-v4", title: "Daily discipline", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 12, quiz: [] }
        ]
      }
    ]
  },
  {
    moduleId: 2,
    title: "Module 2 → Product Knowledge",
    subModules: [
      {
        subModuleId: "m2-s1",
        title: "SubModule 2A: Exowa Product Core Concepts",
        videos: [
          { videoId: "m2s1-v1", title: "Exowa Product Introduction", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 13, quiz: [] },
          { videoId: "m2s1-v2", title: "Exowa Parents के लिए क्यों जरूरी है?", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 14, quiz: [] },
          { videoId: "m2s1-v3", title: "Exowa Students की कैसे मदद करता है?", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 15, quiz: [] }
        ]
      },
      {
        subModuleId: "m2-s2",
        title: "SubModule 2B: Features & Plan Pricing",
        videos: [
          { videoId: "m2s2-v1", title: "Exowa के Features Explained", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 16, quiz: [] },
          { videoId: "m2s2-v2", title: "Exowa Subscription Plans Explained", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 17, quiz: [] },
          { videoId: "m2s2-v3", title: "Common Questions Parents Ask (FAQ)", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 18, quiz: [] }
        ]
      }
    ]
  },
  {
    moduleId: 3,
    title: "Module 3 → Communication Skills & Workflow",
    subModules: [
      {
        subModuleId: "m3-s1",
        title: "SubModule 3A: Partner Working Systems",
        videos: [
          { videoId: "m3s1-v1", title: "How Exowa Women Partner Program Works", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 19, quiz: [] },
          { videoId: "m3s1-v2", title: "Daily Work Process of a Partner", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 20, quiz: [] },
          { videoId: "m3s1-v3", title: "How to Use WhatsApp for Business", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 21, quiz: [] },
          { videoId: "m3s1-v4", title: "Lead Management Basics", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 22, quiz: [] },
          { videoId: "m3s1-v5", title: "Using Google Forms & CRM Basics", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 23, quiz: [] }
        ]
      },
      {
        subModuleId: "m3-s2",
        title: "SubModule 3B: Professional Call Practices",
        videos: [
          { videoId: "m3s2-v1", title: "Basic Communication Skills", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 24, quiz: [] },
          { videoId: "m3s2-v2", title: "Phone Call Confidence Training", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 25, quiz: [] },
          { videoId: "m3s2-v3", title: "How to Talk to Parents Professionally", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 26, quiz: [] },
          { videoId: "m3s2-v4", title: "Hindi Script Practice Session", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 27, quiz: [] },
          { videoId: "m3s2-v5", title: "Body Language & Video Call Etiquette", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 28, quiz: [] }
        ]
      }
    ]
  },
  {
    moduleId: 4,
    title: "Module 4 → Lead Generation",
    subModules: [
      {
        subModuleId: "m4-s1",
        title: "SubModule 4A: Finding Your Audience",
        videos: [
          { videoId: "m4s1-v1", title: "Where to Find Parents Leads", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 29, quiz: [] },
          { videoId: "m4s1-v2", title: "Social Media Lead Generation", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 30, quiz: [] },
          { videoId: "m4s1-v3", title: "WhatsApp Status Marketing Strategy", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 31, quiz: [] },
          { videoId: "m4s1-v4", title: "Referral System Training", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 32, quiz: [] }
        ]
      }
    ]
  },
  {
    moduleId: 5,
    title: "Module 5 → Sales Training",
    subModules: [
      {
        subModuleId: "m5-s1",
        title: "SubModule 5A: Pitching & Objection Handling",
        videos: [
          { videoId: "m5s1-v1", title: "Complete Sales Funnel Explained", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 33, quiz: [] },
          { videoId: "m5s1-v2", title: "First Parent Call Script", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 34, quiz: [] },
          { videoId: "m5s1-v3", title: "Demo Booking Training", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 35, quiz: [] },
          { videoId: "m5s1-v4", title: "How to Give Product Demo", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 36, quiz: [] }
        ]
      },
      {
        subModuleId: "m5-s2",
        title: "SubModule 5B: Closing Techniques",
        videos: [
          { videoId: "m5s2-v1", title: "Emotional Selling Technique", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 37, quiz: [] },
          { videoId: "m5s2-v2", title: "Objection Handling Masterclass", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 38, quiz: [] },
          { videoId: "m5s2-v3", title: "Closing the Sale Professionally", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 39, quiz: [] },
          { videoId: "m5s2-v4", title: "Payment Collection Process", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 40, quiz: [] }
        ]
      }
    ]
  },
  {
    moduleId: 6,
    title: "Module 6 → Advanced Growth",
    subModules: [
      {
        subModuleId: "m6-s1",
        title: "SubModule 6A: Branding & Scaling",
        videos: [
          { videoId: "m6s1-v1", title: "Follow-Up Mastery", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 41, quiz: [] },
          { videoId: "m6s1-v2", title: "How Top Partners Earn More", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 42, quiz: [] },
          { videoId: "m6s1-v3", title: "Building Personal Brand as Exowa Partner", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 43, quiz: [] },
          { videoId: "m6s1-v4", title: "Team Building Basics", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 44, quiz: [] },
          { videoId: "m6s1-v5", title: "Time Management for Housewives", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 45, quiz: [] },
          { videoId: "m6s1-v6", title: "Motivation & Consistency Training", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 46, quiz: [] }
        ]
      }
    ]
  },
  {
    moduleId: 7,
    title: "Module 7 → Certification & Bonuses",
    subModules: [
      {
        subModuleId: "m7-s1",
        title: "SubModule 7A: Final Roadmap & Real Examples",
        videos: [
          { videoId: "m7s1-v1", title: "Complete Sales Roleplay Practice", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 47, quiz: [] },
          { videoId: "m7s1-v2", title: "Final Assessment & Certification Guide", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 48, quiz: [] },
          { videoId: "m7s1-v3", title: "Bonus 1: Top Mistakes New Partners Make", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 49, quiz: [] },
          { videoId: "m7s1-v4", title: "Bonus 2: Real Success Stories of Women Partners", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 50, quiz: [] },
          { videoId: "m7s1-v5", title: "Bonus 3: Daily Routine of Successful Partner", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 51, quiz: [] },
          { videoId: "m7s1-v6", title: "Bonus 4: Advanced WhatsApp Closing Tricks", url: "https://www.w3schools.com/html/movie.mp4", sequenceOrder: 52, quiz: [] },
          { videoId: "m7s1-v7", title: "Bonus 5: How to Earn Consistent Monthly Income", url: "https://www.w3schools.com/html/mov_bbb.mp4", sequenceOrder: 53, quiz: [] }
        ]
      }
    ]
  }
];

// Database operations function
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding 3-tier structure...");

    // स्टेप 1: पुराना डेटा डिलीट करें
    await Module.deleteMany();
    console.log("Old modules deleted.");

    // स्टेप 2: पुराना यूनिक इंडेक्स ड्रॉप करें
    try {
      await Module.collection.dropIndexes();
      console.log("Old indexes dropped successfully.");
    } catch (indexError) {
      console.log("No old indexes to drop or already cleared.");
    }

    // स्टेप 3: नया कनवर्टेड डेटा इंसर्ट करें
    await Module.insertMany(modulesData);
    console.log("🎉 All Modules, Sub-Modules, and Videos seeded successfully!");

    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '--run') {
    seedDatabase();
}
