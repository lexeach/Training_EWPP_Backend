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
question: "Exowa Women Partner Program शुरू करने के पीछे मुख्य सोच क्या है?",
options: [
"महिलाओं को नौकरी दिलाना",
"महिलाओं को सही अवसर, मार्गदर्शन और आत्मविश्वास देना",
"केवल बच्चों को पढ़ाना",
"केवल ऑनलाइन कोर्स बेचना"
],
correctAnswer: 1
},
{
question: "Program का मुख्य उद्देश्य क्या है?",
options: [
"महिलाओं को आत्मनिर्भर, आत्मविश्वासी और आर्थिक रूप से सशक्त बनाना",
"महिलाओं को सरकारी नौकरी दिलाना",
"महिलाओं को विदेश भेजना",
"केवल शिक्षा देना"
],
correctAnswer: 0
},
{
question: "Exowa Women Partner Program महिलाओं को किस प्रकार काम करने का अवसर देता है?",
options: [
"ऑफिस जाकर",
"फैक्ट्री में",
"घर बैठे सम्मान के साथ",
"केवल पार्ट-टाइम स्कूल में"
],
correctAnswer: 2
},
{
question: "Program के माध्यम से महिलाएं क्या बना सकती हैं?",
options: [
"अपनी अलग पहचान",
"केवल नया मोबाइल",
"नई डिग्री",
"केवल बैंक खाता"
],
correctAnswer: 0
},
{
question: "Exowa का एक महत्वपूर्ण उद्देश्य क्या है?",
options: [
"हर घर तक बेहतर शिक्षा पहुंचाना",
"हर घर में इंटरनेट लगवाना",
"हर घर में कंप्यूटर देना",
"हर घर में ट्यूशन खोलना"
],
correctAnswer: 0
},
{
question: "आज कई बच्चे किस कमी के कारण पीछे रह जाते हैं?",
options: [
"मोबाइल की कमी",
"Practice और Guidance की कमी",
"स्कूल की कमी",
"दोस्तों की कमी"
],
correctAnswer: 1
},
{
question: "Exowa के माध्यम से महिलाएं किसका हिस्सा बन सकती हैं?",
options: [
"बच्चों के बेहतर भविष्य का",
"केवल स्कूल प्रबंधन का",
"सरकारी योजनाओं का",
"खेल प्रतियोगिता का"
],
correctAnswer: 0
},
{
question: "Program के जरिए महिलाओं को क्या अवसर मिलता है?",
options: [
"Income Opportunity",
"Leadership Skills Development",
"Communication Confidence",
"उपरोक्त सभी"
],
correctAnswer: 3
},
{
question: "Program में कौन-सी Skill विकसित होती है?",
options: [
"Leadership Skills",
"Driving Skills",
"Coding Skills",
"Cooking Skills"
],
correctAnswer: 0
},
{
question: "Program महिलाओं में क्या बढ़ाने में मदद करता है?",
options: [
"Communication Confidence",
"Exam Marks",
"Sports Performance",
"Travel Experience"
],
correctAnswer: 0
},
{
question: "Exowa Women Partner Program के माध्यम से क्या बनता है?",
options: [
"Women Support Community",
"Political Group",
"Sports Club",
"Entertainment Club"
],
correctAnswer: 0
},
{
question: "Exowa का लक्ष्य केवल क्या नहीं है?",
options: [
"Learning",
"Community Building",
"Earning",
"Confidence Development"
],
correctAnswer: 2
},
{
question: "Exowa महिलाओं को किस प्रकार का मंच देना चाहता है?",
options: [
"सम्मान, आत्मविश्वास और सफलता का मंच",
"केवल नौकरी का मंच",
"केवल शिक्षा का मंच",
"केवल मनोरंजन का मंच"
],
correctAnswer: 0
},
{
question: "जब एक महिला सशक्त होती है, तो क्या मजबूत बनता है?",
options: [
"केवल परिवार",
"केवल समाज",
"परिवार और समाज दोनों",
"केवल व्यवसाय"
],
correctAnswer: 2
},
{
question: "Exowa Women Partner Program का संदेश क्या है?",
options: [
"सशक्त महिला, सशक्त परिवार, सशक्त समाज",
"पढ़ो और आगे बढ़ो",
"हर घर में शिक्षा",
"कमाओ और बचाओ"
],
correctAnswer: 0
}
]},
          { videoId: "m1s1-v3", title: "Women empowerment vision", url: "https://all-exowa-training-video.netlify.app/women_empowerment_vision.mp4", sequenceOrder: 3, 
           quiz: [
  {
    question: "हर महिला के अंदर क्या क्षमता होती है?",
    options: [
      "कुछ बड़ा करने की क्षमता",
      "केवल नौकरी करने की क्षमता",
      "केवल घर संभालने की क्षमता",
      "केवल पढ़ाई करने की क्षमता"
    ],
    correctAnswer: 0
  },
  {
    question: "महिलाओं को आगे बढ़ने के लिए किन चीजों की आवश्यकता होती है?",
    options: [
      "सही अवसर",
      "सही मार्गदर्शन",
      "आत्मविश्वास",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Exowa Women Partner Program का Vision केवल क्या नहीं है?",
    options: [
      "Income देना",
      "Training देना",
      "Education देना",
      "Marketing करना"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa महिलाओं को Income के अलावा क्या देना चाहता है?",
    options: [
      "नई पहचान",
      "सम्मान",
      "आत्मनिर्भरता",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Exowa का सपना है कि हर महिला क्या करे?",
    options: [
      "अपने पैरों पर खड़ी हो",
      "अपने सपनों को पूरा करे",
      "समाज में सकारात्मक बदलाव लाए",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "बहुत सी महिलाएं अपने सपनों को क्यों पीछे छोड़ देती हैं?",
    options: [
      "घर की जिम्मेदारियों के कारण",
      "शिक्षा की कमी के कारण",
      "समय की अधिकता के कारण",
      "तकनीक की कमी के कारण"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa का मानना है कि:",
    options: [
      "घर संभालने वाली महिला, दुनिया भी बदल सकती है",
      "महिलाएं केवल घर संभाल सकती हैं",
      "महिलाएं केवल नौकरी कर सकती हैं",
      "महिलाएं केवल पढ़ाई कर सकती हैं"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa द्वारा बनाए गए Platform पर महिलाएं क्या कर सकती हैं?",
    options: [
      "सीख सकती हैं",
      "काम कर सकती हैं",
      "Income Generate कर सकती हैं",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Platform पर महिलाएं कौन-सी Leadership Related Skill विकसित कर सकती हैं?",
    options: [
      "Leadership",
      "Programming",
      "Accounting",
      "Designing"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa चाहता है कि महिलाएं केवल किस तक सीमित न रहें?",
    options: [
      "Earning",
      "Learning",
      "Training",
      "Networking"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa महिलाओं में किन गुणों को बढ़ावा देना चाहता है?",
    options: [
      "Confidence",
      "Communication",
      "Leadership",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "जब एक महिला सशक्त होती है तो क्या होता है?",
    options: [
      "परिवार मजबूत होता है",
      "बच्चों का भविष्य बेहतर होता है",
      "समाज प्रगति करता है",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Exowa Vision का पहला भाग क्या है?",
    options: [
      "सशक्त महिला",
      "सशक्त शिक्षा",
      "सशक्त व्यवसाय",
      "सशक्त तकनीक"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa का Vision क्या है?",
    options: [
      "सशक्त महिला, सशक्त परिवार, सशक्त समाज, सशक्त भारत",
      "हर घर में नौकरी",
      "हर महिला को डिग्री",
      "हर बच्चे को मोबाइल"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa को विश्वास है कि इस बदलाव का सबसे मजबूत हिस्सा कौन बनेगा?",
    options: [
      "आप जैसी महिलाएं",
      "केवल शिक्षक",
      "केवल विद्यार्थी",
      "केवल Parents"
    ],
    correctAnswer: 0
  }
] 
          },
          { videoId: "m1s1-v4",
           title: "आपको क्या करना है ?", 
           url: "https://all-exowa-training-video.netlify.app/aapko_kya_karna_hai.mp4",
           sequenceOrder: 4,
           quiz: [
  {
    question: "इस Program में आपका मुख्य काम कितनी गतिविधियों के आसपास रहता है?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 1
  },
  {
    question: "जिन लोगों के Contact Number आपके पास पहले से हैं, उन्हें क्या बताना है?",
    options: [
      "Work From Home Opportunity",
      "Exowa Product",
      "Job Vacancy",
      "Business Loan"
    ],
    correctAnswer: 1
  },
  {
    question: "किन Parents को Exowa Product के बारे में बताना है?",
    options: [
      "जिनके बच्चे Nursery में पढ़ते हैं",
      "जिनके बच्चे College में पढ़ते हैं",
      "जिनके बच्चे 6वीं से 12वीं कक्षा में पढ़ते हैं",
      "सभी Parents को"
    ],
    correctAnswer: 2
  },
  {
    question: "निम्न में से कौन Existing Contacts का उदाहरण है?",
    options: [
      "रिश्तेदार",
      "पड़ोसी",
      "दोस्त",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Existing Contacts को Exowa के बारे में क्या समझाना है?",
    options: [
      "यह बच्चों की पढ़ाई में कैसे मदद करता है",
      "यह नौकरी कैसे दिलाता है",
      "यह बैंक खाता कैसे खोलता है",
      "यह मोबाइल कैसे बेचता है"
    ],
    correctAnswer: 0
  },
  {
    question: "Company द्वारा दिए गए Leads को क्या बताना है?",
    options: [
      "Exowa Product",
      "School Admission",
      "Work From Home Opportunity",
      "Scholarship Program"
    ],
    correctAnswer: 2
  },
  {
    question: "Company Provided Leads किस बारे में जानकारी प्राप्त करते हैं?",
    options: [
      "Work From Home Opportunity",
      "Exowa Product Features",
      "School Fees",
      "Exam Schedule"
    ],
    correctAnswer: 0
  },
  {
    question: "Work From Home Opportunity में महिलाओं को क्या बताया जाता है?",
    options: [
      "वे घर बैठे काम कर सकती हैं",
      "वे सम्मानजनक Income कमा सकती हैं",
      "वे Exowa Women Partner Program से जुड़ सकती हैं",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Golden Rule के अनुसार Existing Contacts का संबंध किससे है?",
    options: [
      "Work From Home Opportunity",
      "Exowa Product",
      "Training Program",
      "Leadership Program"
    ],
    correctAnswer: 1
  },
  {
    question: "Golden Rule के अनुसार Company Provided Leads का संबंध किससे है?",
    options: [
      "Exowa Product",
      "Online Test",
      "Work From Home Opportunity",
      "School Program"
    ],
    correctAnswer: 2
  },
  {
    question: "Program में Training, Calling Script और Demo कौन उपलब्ध कराता है?",
    options: [
      "Parents",
      "Students",
      "Company / Team",
      "Friends"
    ],
    correctAnswer: 2
  },
  {
    question: "Program में Support Material और Team Guidance किसे दी जाती है?",
    options: [
      "Women Partners को",
      "Parents को",
      "Students को",
      "Teachers को"
    ],
    correctAnswer: 0
  },
  {
    question: "Women Partner का मुख्य कार्य क्या है?",
    options: [
      "लोगों से जुड़ना",
      "बात करना",
      "सीखते हुए आगे बढ़ना",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "यदि Contact Number आपके पास पहले से मौजूद है, तो आपको क्या करना चाहिए?",
    options: [
      "Work From Home Opportunity बतानी चाहिए",
      "Exowa Product के बारे में बताना चाहिए",
      "Lead Generate करनी चाहिए",
      "Training देनी चाहिए"
    ],
    correctAnswer: 1
  },
  {
    question: "इस Training Script का सबसे महत्वपूर्ण संदेश क्या है?",
    options: [
      "Existing Contacts = Exowa Product, Company Leads = Work From Home Opportunity",
      "सभी को केवल Exowa Product बताना है",
      "सभी को केवल Work From Home Opportunity बतानी है",
      "केवल Training पर ध्यान देना है"
    ],
    correctAnswer: 0
  }
] }
        ]
      },
      {
        subModuleId: "m1-s2",
        title: "SubModule 1B: Why This Opportunity is Special for Women",
        videos: [
          { videoId: "m1s2-v1",
           title: "Work from home",
           url: "https://all-exowa-training-video.netlify.app/work_from_home.mp4",
           sequenceOrder: 5,
          quiz: [
  {
    question: "Exowa Women Partner Program महिलाओं को क्या आज़ादी देता है?",
    options: [
      "विदेश में नौकरी",
      "Work from Home",
      "सरकारी नौकरी",
      "फुल टाइम ऑफिस जॉब"
    ],
    correctAnswer: 1
  },
  {
    question: "इस Program में काम करने के लिए आपको कहाँ जाने की जरूरत है?",
    options: [
      "ऑफिस",
      "कोचिंग सेंटर",
      "स्कूल",
      "कहीं बाहर जाने की जरूरत नहीं"
    ],
    correctAnswer: 3
  },
  {
    question: "महिलाएं इस Program में किसकी मदद से काम कर सकती हैं?",
    options: [
      "मोबाइल या लैपटॉप",
      "केवल कंप्यूटर लैब",
      "केवल ऑफिस सिस्टम",
      "केवल टैबलेट"
    ],
    correctAnswer: 0
  },
  {
    question: "इस Program की सबसे अच्छी बात क्या है?",
    options: [
      "Fixed Office Timing",
      "अपने समय के अनुसार काम करना",
      "रोज ऑफिस जाना",
      "Night Shift करना"
    ],
    correctAnswer: 1
  },
  {
    question: "Program में कौन-सी सुविधा उपलब्ध है?",
    options: [
      "Fixed Timing",
      "Daily Travelling",
      "काम की Flexibility",
      "Office Attendance"
    ],
    correctAnswer: 2
  },
  {
    question: "इस Program में महिलाओं को क्या नहीं करना पड़ता?",
    options: [
      "Parents से बात करना",
      "Demo Share करना",
      "Daily Travelling",
      "Online Connect करना"
    ],
    correctAnswer: 2
  },
  {
    question: "काम के दौरान आपको सबसे पहले क्या करना होगा?",
    options: [
      "Parents से Online Connect करना",
      "Admission देना",
      "Exam लेना",
      "Fees Collect करना"
    ],
    correctAnswer: 0
  },
  {
    question: "Parents को किसके बारे में जानकारी देनी होती है?",
    options: [
      "Exowa",
      "Bank Loan",
      "Government Scheme",
      "Scholarship Form"
    ],
    correctAnswer: 0
  },
  {
    question: "Parents को जानकारी देने के बाद क्या करना होता है?",
    options: [
      "Job देना",
      "Demo Share करना",
      "School बदलना",
      "Certificate देना"
    ],
    correctAnswer: 1
  },
  {
    question: "Admission Process में आपकी क्या भूमिका होती है?",
    options: [
      "मदद करना",
      "Exam Conduct करना",
      "Fees तय करना",
      "Teacher बनना"
    ],
    correctAnswer: 0
  },
  {
    question: "पूरा काम किन माध्यमों से किया जा सकता है?",
    options: [
      "WhatsApp",
      "Phone Call",
      "Online Tools",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Script के अनुसार आपका घर क्या बन सकता है?",
    options: [
      "Training Center",
      "Office",
      "School",
      "Shop"
    ],
    correctAnswer: 1
  },
  {
    question: "Work from Home Opportunity का सबसे बड़ा लाभ क्या है?",
    options: [
      "परिवार के साथ समय बिताना और Income बनाना",
      "रोज यात्रा करना",
      "Office में बैठना",
      "केवल Training लेना"
    ],
    correctAnswer: 0
  },
  {
    question: "Technology के इस दौर में महिलाएं क्या कर सकती हैं?",
    options: [
      "घर बैठे सफल Career बना सकती हैं",
      "केवल पढ़ाई कर सकती हैं",
      "केवल Shopping कर सकती हैं",
      "केवल Social Media चला सकती हैं"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa महिलाओं को क्या प्रदान करता है?",
    options: [
      "काम की Flexibility",
      "समय की आज़ादी",
      "सम्मानजनक Income और Self Confidence",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Script के अनुसार आपका घर क्या बन सकता है?",
    options: [
      "सिर्फ जिम्मेदारियों की जगह",
      "सफलता की शुरुआत",
      "केवल आराम की जगह",
      "केवल मनोरंजन की जगह"
    ],
    correctAnswer: 1
  },
  {
    question: "Exowa Women Partner Program का संदेश क्या है?",
    options: [
      "घर बैठे सीखें, कमाएं और अपनी पहचान बनाएं",
      "केवल कमाएं",
      "केवल सीखें",
      "केवल नौकरी करें"
    ],
    correctAnswer: 0
  }
]
 },
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
          { videoId: "m1s2-v3", title: "Strategic Mindset for EWPP Partners", 
           url: "https://all-exowa-training-video.netlify.app/success_Ka_mindset.mp4", 
           sequenceOrder: 7, 
           quiz: [
  {
    question: "किसी भी महिला की सफलता मुख्य रूप से किस पर निर्भर करती है?",
    options: [
      "उसकी Degree पर",
      "उसके काम पर",
      "उसकी सोच (Mindset) पर",
      "उसकी किस्मत पर"
    ],
    correctAnswer: 2
  },
  {
    question: "Script के अनुसार, 'जैसी सोच होती है, वैसी ही क्या बनती है?'",
    options: [
      "कमाई",
      "दिशा",
      "पहचान",
      "सफलता"
    ],
    correctAnswer: 1
  },
  {
    question: "Exowa Women Partner Program में सफलता के लिए सबसे पहले क्या आवश्यक है?",
    options: [
      "बड़ी Degree",
      "Corporate Experience",
      "Positive और Growth Mindset",
      "अधिक पैसे"
    ],
    correctAnswer: 2
  },
  {
    question: "Success Mindset का क्या अर्थ है?",
    options: [
      "दूसरों से आगे निकलना",
      "खुद पर विश्वास रखना, सीखने के लिए तैयार रहना और कठिनाइयों के बावजूद आगे बढ़ना",
      "केवल अधिक पैसा कमाना",
      "किसी की मदद न लेना"
    ],
    correctAnswer: 1
  },
  {
    question: "हर सफल महिला की पहली आदत क्या होती है?",
    options: [
      "ज्यादा काम करना",
      "अपना लक्ष्य साफ रखना",
      "केवल पैसा कमाना",
      "दूसरों से तुलना करना"
    ],
    correctAnswer: 1
  },
  {
    question: "सफल महिलाएं Problems आने पर क्या करती हैं?",
    options: [
      "हार मान लेती हैं",
      "रुक जाती हैं",
      "Solutions ढूंढती हैं",
      "दूसरों को दोष देती हैं"
    ],
    correctAnswer: 2
  },
  {
    question: "लगातार सीखना किसका हिस्सा है?",
    options: [
      "Growth",
      "Luck",
      "Experience",
      "Competition"
    ],
    correctAnswer: 0
  },
  {
    question: "नई Skills, नई जानकारी और नई Communication Techniques सीखना किसका हिस्सा है?",
    options: [
      "Competition",
      "Growth",
      "Marketing",
      "Promotion"
    ],
    correctAnswer: 1
  },
  {
    question: "Success के लिए महत्वपूर्ण आदत क्या है?",
    options: [
      "Networking",
      "Discipline और Consistency",
      "Marketing",
      "Investment"
    ],
    correctAnswer: 1
  },
  {
    question: "Script के अनुसार सबसे जरूरी क्या है?",
    options: [
      "Self Confidence",
      "Luck",
      "Corporate Experience",
      "Degree"
    ],
    correctAnswer: 0
  },
  {
    question: "महिलाओं को अपने आप से क्या कहना चाहिए?",
    options: [
      "मैं नहीं कर सकती",
      "शायद मैं कर पाऊँ",
      "हाँ, मैं कर सकती हूँ",
      "कोई और करेगा"
    ],
    correctAnswer: 2
  },
  {
    question: "शुरुआत में डर और गलतियाँ होना कैसा माना गया है?",
    options: [
      "गलत",
      "असफलता",
      "Normal",
      "कमजोरी"
    ],
    correctAnswer: 2
  },
  {
    question: "Script के अनुसार Success सिर्फ क्या नहीं है?",
    options: [
      "Income",
      "Knowledge",
      "Learning",
      "Experience"
    ],
    correctAnswer: 0
  },
  {
    question: "Script के अनुसार Success का वास्तविक अर्थ क्या है?",
    options: [
      "केवल Income",
      "आत्मविश्वास, सम्मान, परिवार का गर्व और सपनों की खुशी",
      "केवल सम्मान",
      "केवल प्रसिद्धि"
    ],
    correctAnswer: 1
  },
  {
    question: "Exowa Women Partner Program महिलाओं को क्या विकसित करने में मदद करता है?",
    options: [
      "सिर्फ Selling Skills",
      "सिर्फ Communication Skills",
      "एक सफल सोच (Success Mindset)",
      "सिर्फ Income"
    ],
    correctAnswer: 2
  },
  {
    question: "जब एक महिला अपनी सोच बदलती है, तब क्या बदलने लगता है?",
    options: [
      "केवल उसकी Income",
      "उसकी पूरी जिंदगी",
      "केवल उसका परिवार",
      "केवल उसकी नौकरी"
    ],
    correctAnswer: 1
  },
  {
    question: "Training के अंत में महिलाओं को क्या संदेश दिया गया है?",
    options: [
      "आप अकेली हैं",
      "हार मत मानिए",
      "मजबूती के साथ आगे बढ़िए, हमारी पूरी टीम आपके साथ है",
      "केवल Training पूरी कीजिए"
    ],
    correctAnswer: 2
  }
] },
          { videoId: "m1s2-v4", title: "Housewives भी क्यों सफल हो सकती हैं",
           url: "https://all-exowa-training-video.netlify.app/kya_homemaker_kaam_kar_sakti_hain.mp4", 
           sequenceOrder: 8, 
           quiz: [
  {
    question: "क्या केवल Highly Educated या Job करने वाली महिलाएं ही Exowa Women Partner Program में सफल हो सकती हैं?",
    options: [
      "हाँ",
      "नहीं",
      "केवल Graduate महिलाएं",
      "केवल Experienced महिलाएं"
    ],
    correctAnswer: 1
  },
  {
    question: "Script के अनुसार सफलता किससे आती है?",
    options: [
      "बड़ी Degree से",
      "Corporate Experience से",
      "सीखने की इच्छा, लोगों को समझने की क्षमता और मेहनत से",
      "केवल पैसे से"
    ],
    correctAnswer: 2
  },
  {
    question: "Housewives में कौन-सी विशेषता स्वाभाविक रूप से होती है?",
    options: [
      "परिवार को संभालना",
      "जिम्मेदारियों को Manage करना",
      "लोगों की भावनाओं को समझना",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "इस Program में सबसे अधिक कौन-सी Skills काम आती हैं?",
    options: [
      "Management और Communication Skills",
      "Coding Skills",
      "Typing Speed",
      "Accounting"
    ],
    correctAnswer: 0
  },
  {
    question: "Housewives Parents से बेहतर Connect क्यों कर पाती हैं?",
    options: [
      "वे परिवार और बच्चों की जरूरतों को समझती हैं",
      "वे Teacher होती हैं",
      "वे अधिक पढ़ी-लिखी होती हैं",
      "वे केवल Marketing जानती हैं"
    ],
    correctAnswer: 0
  },
  {
    question: "Housewives में निम्न में से कौन-सी Quality मजबूत होती है?",
    options: [
      "Trust Build करना",
      "Relationship Maintain करना",
      "Dedication",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Exowa Women Partner Program में आपको क्या दिया जाता है?",
    options: [
      "Step-by-Step Training",
      "Calling Script",
      "Parents से Connect करना",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Success के लिए सबसे जरूरी क्या है?",
    options: [
      "Positive Attitude",
      "Consistency",
      "सीखने की इच्छा",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Script के अनुसार सफलता के लिए Degree से ज्यादा क्या मायने रखता है?",
    options: [
      "Experience",
      "Dedication",
      "English Language",
      "Computer Knowledge"
    ],
    correctAnswer: 1
  },
  {
    question: "बहुत-सी सफल महिलाओं ने अपनी शुरुआत किस रूप में की थी?",
    options: [
      "Teacher",
      "Business Woman",
      "Housewife",
      "Corporate Employee"
    ],
    correctAnswer: 2
  },
  {
    question: "उनकी जिंदगी किस वजह से बदली?",
    options: [
      "सही अवसर और आत्मविश्वास",
      "Lottery",
      "सरकारी नौकरी",
      "विदेश जाने से"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa का विश्वास क्या है?",
    options: [
      "हर महिला में सफलता की क्षमता होती है",
      "केवल पढ़ी-लिखी महिलाएं सफल होती हैं",
      "केवल नौकरी करने वाली महिलाएं सफल होती हैं",
      "केवल अनुभवी महिलाएं सफल होती हैं"
    ],
    correctAnswer: 0
  },
  {
    question: "महिलाओं को सफलता के लिए किसकी आवश्यकता है?",
    options: [
      "सही Platform",
      "सही Guidance",
      "खुद पर विश्वास",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Script के अनुसार Housewife होना क्या है?",
    options: [
      "कमजोरी",
      "बहुत बड़ी ताकत",
      "रुकावट",
      "सीमित अवसर"
    ],
    correctAnswer: 1
  },
  {
    question: "Training के अंत में महिलाओं को क्या संदेश दिया गया है?",
    options: [
      "डरकर काम करें",
      "विश्वास के साथ आगे बढ़ें, हम आपकी सफलता के लिए प्रतिबद्ध हैं",
      "केवल Degree पूरी करें",
      "पहले नौकरी खोजें"
    ],
    correctAnswer: 1
  }
] }
        ]
      },
      {
        subModuleId: "m1-s3",
        title: "SubModule 1C: Success Mindset for Women Partners",
        videos: [
          { videoId: "m1s3-v1", title: "डर कैसे हटाएं", 
           url: "https://all-exowa-training-video.netlify.app/dar_Par_kabu_payen.mp4", 
           sequenceOrder: 9, 
           quiz: [
  {
    question: "जब हम कोई नया काम शुरू करते हैं, तो डर लगना कैसा माना गया है?",
    options: [
      "कमजोरी",
      "असफलता",
      "बिल्कुल सामान्य",
      "गलत"
    ],
    correctAnswer: 2
  },
  {
    question: "शुरुआत में महिलाओं के मन में कौन-सा सवाल आ सकता है?",
    options: [
      "क्या मैं कर पाऊंगी?",
      "अगर लोग मना कर दें तो?",
      "अगर मुझसे गलती हो गई तो?",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "स्क्रिप्ट के अनुसार डर क्या है?",
    options: [
      "एक कमजोरी",
      "एक नई शुरुआत का संकेत",
      "सफलता की निशानी",
      "हार का कारण"
    ],
    correctAnswer: 1
  },
  {
    question: "हर सफल महिला ने अपने जीवन में किसका सामना किया है?",
    options: [
      "केवल सफलता का",
      "डर का",
      "असफलता का",
      "प्रतियोगिता का"
    ],
    correctAnswer: 1
  },
  {
    question: "सफल लोगों और रुक जाने वाले लोगों में मुख्य अंतर क्या है?",
    options: [
      "सफल लोग कभी नहीं डरते",
      "सफल लोग डर के बावजूद आगे बढ़ते हैं",
      "सफल लोग ज्यादा पढ़े-लिखे होते हैं",
      "सफल लोग ज्यादा पैसे वाले होते हैं"
    ],
    correctAnswer: 1
  },
  {
    question: "डर अक्सर किस कारण से आता है?",
    options: [
      "किस्मत से",
      "जानकारी और अनुभव की कमी से",
      "उम्र से",
      "दूसरों की वजह से"
    ],
    correctAnswer: 1
  },
  {
    question: "जैसे-जैसे आप सीखती हैं, Practice करती हैं और लोगों से बात करती हैं, क्या बढ़ता है?",
    options: [
      "डर",
      "Confusion",
      "Confidence",
      "दूरी"
    ],
    correctAnswer: 2
  },
  {
    question: "डर हटाने का पहला तरीका क्या बताया गया है?",
    options: [
      "लोगों से बचना",
      "Positive Self Talk",
      "काम छोड़ देना",
      "इंतजार करना"
    ],
    correctAnswer: 1
  },
  {
    question: "Positive Self Talk में स्वयं से क्या कहना चाहिए?",
    options: [
      "मैं सीख सकती हूँ",
      "मैं कर सकती हूँ",
      "हर Expert कभी Beginner था",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "डर हटाने का दूसरा तरीका क्या है?",
    options: [
      "बड़ा कदम उठाना",
      "छोटे कदमों से शुरुआत करना",
      "दूसरों पर निर्भर रहना",
      "रुक जाना"
    ],
    correctAnswer: 1
  },
  {
    question: "शुरुआत में सबसे पहले किससे बात करने की सलाह दी गई है?",
    options: [
      "10 Parents से",
      "5 Parents से",
      "एक Parent से",
      "किसी से नहीं"
    ],
    correctAnswer: 2
  },
  {
    question: "बड़ी सफलता किससे शुरू होती है?",
    options: [
      "बड़े निवेश से",
      "छोटे-छोटे कदमों से",
      "किस्मत से",
      "अनुभव से"
    ],
    correctAnswer: 1
  },
  {
    question: "गलतियाँ क्या होती हैं?",
    options: [
      "Failure",
      "सीखने का हिस्सा",
      "कमजोरी",
      "समय की बर्बादी"
    ],
    correctAnswer: 1
  },
  {
    question: "जितनी अधिक Practice करेंगे, क्या होगा?",
    options: [
      "डर बढ़ेगा",
      "डर कम होगा",
      "काम कठिन होगा",
      "कुछ नहीं बदलेगा"
    ],
    correctAnswer: 1
  },
  {
    question: "सबसे जरूरी बात क्या बताई गई है?",
    options: [
      "खुद पर विश्वास रखें",
      "दूसरों की बात सुनें",
      "काम टालें",
      "जल्दी सफलता चाहें"
    ],
    correctAnswer: 0
  },
  {
    question: "Exowa Women Partner Program में आपको क्या मिलेगा?",
    options: [
      "Training",
      "Guidance",
      "Scripts और पूरा Support",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "स्क्रिप्ट के अनुसार 'डर के आगे' क्या होता है?",
    options: [
      "असफलता",
      "Growth और Success",
      "समस्या",
      "रुकावट"
    ],
    correctAnswer: 1
  },
  {
    question: "डर को किस चीज़ की दीवार नहीं बनने देना चाहिए?",
    options: [
      "परिवार",
      "सपनों के रास्ते",
      "दोस्ती",
      "नौकरी"
    ],
    correctAnswer: 1
  },
  {
    question: "Training के अंत में महिलाओं को क्या संदेश दिया गया है?",
    options: [
      "अकेले आगे बढ़ें",
      "डरकर काम करें",
      "मजबूती के साथ आगे बढ़ें और विश्वास रखें कि पूरी टीम आपके साथ है",
      "पहले अनुभव प्राप्त करें"
    ],
    correctAnswer: 2
  }
] },
          { videoId: "m1s3-v2", title: "Communication confidence", 
           url: "https://all-exowa-training-video.netlify.app/communication_skill.mp4", 
           sequenceOrder: 10, 
           quiz: [
  {
    question: "Communication Confidence का अर्थ क्या है?",
    options: [
      "अंग्रेज़ी में बोलना",
      "लोगों से आत्मविश्वास के साथ बात करना",
      "तेज़ आवाज़ में बोलना",
      "केवल Presentation देना"
    ],
    correctAnswer: 1
  },
  {
    question: "Communication को सबसे अधिक क्या कमजोर बनाता है?",
    options: [
      "कम पढ़ाई",
      "डर और घबराहट",
      "कम समय",
      "मोबाइल"
    ],
    correctAnswer: 1
  },
  {
    question: "स्क्रिप्ट के अनुसार Communication का सही अर्थ क्या है?",
    options: [
      "Perfect बोलना",
      "अंग्रेज़ी में बात करना",
      "अपनी बात को सरल, स्पष्ट और विश्वास के साथ रखना",
      "ज्यादा बोलना"
    ],
    correctAnswer: 2
  },
  {
    question: "Parents किस प्रकार के व्यक्ति की बात सुनना पसंद करते हैं?",
    options: [
      "Professional Speaker",
      "Celebrity",
      "ईमानदारी से बात करने वाला और उनकी जरूरत समझने वाला व्यक्ति",
      "Teacher"
    ],
    correctAnswer: 2
  },
  {
    question: "Parent से बात करते समय पहला Golden Rule क्या है?",
    options: [
      "तेज़ बोलना",
      "मुस्कुराकर बात करना",
      "लंबी बात करना",
      "केवल Product बताना"
    ],
    correctAnswer: 1
  },
  {
    question: "Communication का महत्वपूर्ण हिस्सा क्या है?",
    options: [
      "सिर्फ बोलना",
      "सिर्फ सुनना",
      "सुनना और समझना",
      "Presentation देना"
    ],
    correctAnswer: 2
  },
  {
    question: "Parent अपनी समस्या बताए तो क्या करना चाहिए?",
    options: [
      "बीच में रोक देना",
      "पहले ध्यान से सुनना, फिर जवाब देना",
      "तुरंत Product बताना",
      "Call समाप्त कर देना"
    ],
    correctAnswer: 1
  },
  {
    question: "बात करते समय किस प्रकार की भाषा का प्रयोग करना चाहिए?",
    options: [
      "कठिन भाषा",
      "तकनीकी भाषा",
      "सरल और स्पष्ट भाषा",
      "केवल अंग्रेज़ी"
    ],
    correctAnswer: 2
  },
  {
    question: "Confidence किससे आता है?",
    options: [
      "जन्म से",
      "Practice से",
      "Degree से",
      "किस्मत से"
    ],
    correctAnswer: 1
  },
  {
    question: "अगर पहली Call अच्छी नहीं जाए तो क्या करना चाहिए?",
    options: [
      "काम छोड़ देना",
      "घबराना",
      "अगली Call बेहतर करने की कोशिश करना",
      "फोन बंद कर देना"
    ],
    correctAnswer: 2
  },
  {
    question: "हर बातचीत हमें क्या देती है?",
    options: [
      "पैसे",
      "नई सीख",
      "सर्टिफिकेट",
      "Promotion"
    ],
    correctAnswer: 1
  },
  {
    question: "Communication Confidence बढ़ाने के लिए रोज़ क्या करना चाहिए?",
    options: [
      "Practice",
      "Script पढ़ना",
      "लोगों से बात करना",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "रोज़ कितनी देर जोर से बोलने की Practice करने की सलाह दी गई है?",
    options: [
      "2 मिनट",
      "5 मिनट",
      "15 मिनट",
      "30 मिनट"
    ],
    correctAnswer: 1
  },
  {
    question: "स्क्रिप्ट के अनुसार लोगों का भरोसा किस पर होता है?",
    options: [
      "Perfect लोगों पर",
      "अमीर लोगों पर",
      "Genuine और Confident लोगों पर",
      "Celebrity पर"
    ],
    correctAnswer: 2
  },
  {
    question: "Exowa Women Partner Program केवल क्या नहीं सिखाता?",
    options: [
      "Communication",
      "Product",
      "लोगों से प्रभावशाली तरीके से बात करना",
      "सिर्फ Product नहीं, बल्कि Communication भी सिखाता है"
    ],
    correctAnswer: 3
  },
  {
    question: "जब आपकी Communication मजबूत होती है तो क्या बढ़ता है?",
    options: [
      "Confidence",
      "Results",
      "Success",
      "उपरोक्त सभी"
    ],
    correctAnswer: 3
  },
  {
    question: "Final Message के अनुसार अधिक प्रभावशाली क्या होता है?",
    options: [
      "घबराहट के साथ बोले गए सौ शब्द",
      "आत्मविश्वास के साथ बोला गया एक साधारण वाक्य",
      "लंबा भाषण",
      "तेज़ आवाज़"
    ],
    correctAnswer: 1
  },
  {
    question: "Communication Confidence मजबूत करने का सबसे अच्छा तरीका क्या है?",
    options: [
      "Practice करना",
      "डरना",
      "कम लोगों से बात करना",
      "केवल Training देखना"
    ],
    correctAnswer: 0
  },
  {
    question: "इस Training का मुख्य संदेश क्या है?",
    options: [
      "Perfect बनने की कोशिश करें",
      "Practice करें, बोलें और हर दिन Communication Confidence बढ़ाएं",
      "सिर्फ Product याद करें",
      "कम Call करें"
    ],
    correctAnswer: 1
  }
] },
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
