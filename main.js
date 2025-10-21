let startBtn = document.querySelector(".start-btn"),
instructionCard = document.querySelector(".instruction"),
instructionExit = document.querySelectorAll(".instruction button")[0],
startQuizBtn = document.querySelectorAll(".instruction button")[1],
wrapper = document.querySelector(".wrapper"),
nxtBtn = document.querySelector(".btn button"),
resultCard = document.querySelector(".result-card"),
time = document.querySelectorAll(".Timer p")[1],
progressBar = document.querySelector(".inner"),
questionEl = document.querySelector(".question-container"),
answerContainer = document.querySelector(".option-container"),
currentQuestionNum = document.querySelector(".current-question"),
totalQuestion = document.querySelector(".total-question"),
totalScore = document.querySelector(".total-score .value"),
yourScore = document.querySelector(".user-score .value"),
unattempted = document.querySelector(".unattempted .value"),
attempted = document.querySelector(".attempted .value"),
wrong = document.querySelector(".wrong .value"),
replayQuiz = document.querySelectorAll(".score-btn button")[0]
exitQuiz = document.querySelectorAll(".score-btn button")[1];
let currentQuestion = 0;
let userAnswers = [];
let timer,
  progressInterval,
  width = 1,
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;





replayQuiz.addEventListener("click",()=>{
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  wrapper.style.transform = "scale(1)"
  wrapper.style.width = "100%"
  currentQuestion = 0
  score = 0,
    attemptQuestion = 0,
    unattemptedQuestion = 0,
    wrongQuestion = 0;
  startQuiz();
})
exitQuiz.addEventListener("click",()=>{
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  currentQuestion = 0
  score = 0,
    attemptQuestion = 0,
    unattemptedQuestion = 0,
    wrongQuestion = 0;
    startBtn.style.transform = "scale(1)"
    startBtn.style.width = "100%"
})





startBtn.addEventListener("click",()=>{
  instructionCard.style.transform="scale(1)"
  instructionCard.style.width="100%"
  instructionCard.style.opacity="1"
  startBtn.style.transform="scale(0)"
  startBtn.style.width="0"
})


instructionExit.addEventListener("click",()=>{
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0%"
  startBtn.style.transform = "scale(1)"
  startBtn.style.width = "100%"
})


startQuizBtn.addEventListener("click",()=>{
  
  wrapper.style.transform="scale(1)"
  wrapper.style.width="100%"
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0%"
  startQuiz()
})






const questions = [  
  {    question: "What is the capital city of Australia?",    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "2"
  },
  {
    question: "Who wrote the Harry Potter book series?",
    options: ["J.K. Rowling", "George R.R. Martin", "Stephen King", "Dan Brown"],
    answer: "0"
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Mars", "Venus", "Mercury", "Jupiter"],
    answer: "2"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue whale", "Giraffe", "Hippopotamus"],
    answer: "1"
  },
  {
    question: "Who painted the famous artwork 'The Starry Night'?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
    answer: "1"
  },
 
];

// if you want hindi questions then just comment out the English questions and remove hindi questions from comment 
/*
const questions = [
  {
    question: "भारत का राष्ट्रीय खेल कौन सा है?",
    options: ["हॉकी", "क्रिकेट", "फुटबॉल", "टेनिस"],
    answer: "0"
        },
  {
    question: "साप्ताहिक हफ़्ते में कुल कितने दिन होते हैं?",
    options: ["5", "6", "7", "8"],
    answer: "2"
        },
  {
    question: "ब्रह्मांड में सबसे बड़ा तारा कौन सा है?",
    options: ["सूर्य", "बृहस्पति", "सिरियस", "वेगा"],
    answer: "2"
        },
       {
  question: "भारत का राष्ट्रीय पक्षी कौन सा है?",
  options: ["मोर", "गिलहरी", "चिड़िया", "वेस्टर्न टेगोपन"],
  answer: "0"
},
{
  question: "भारत में कुल कितने राज्य हैं?",
  options: ["26", "27", "28", "29"],
  answer: "2"
},
{
  question: "सबसे ऊँचा ज्वालामुखी कौन सा है?",
  options: ["मौना लोआ", "एटा", "किलाविया", "फुजीयामा"],
  answer: "0"
},
{
  question: "विश्व का सबसे लम्बा नदी सिस्टम कौन सा है?",
  options: ["नील नदी", "अमेज़न नदी", "यांग्त्से नदी", "मिसूरी नदी"],
  answer: "नील नदी"
},
{
  question: "सबसे छोटा महासागर कौन सा है?",
  options: ["हिंद महासागर", "अरक्टिक महासागर", "भूमध्य सागर", "दक्षिण महासागर"],
  answer: "1"
},
{
  question: "पृथ्वी से सूर्य की दूरी कितनी है?",
  options: ["148 मिलियन किलोमीटर", "149 मिलियन किलोमीटर", "150 मिलियन किलोमीटर", "151 मिलियन किलोमीटर"],
  answer: "0"
},
{
  question: "विश्व का सबसे ऊँचा पर्वत शिखर कौन सा है?",
  options: [ "किलिमंजारो","एवरेस्ट", "माउंट फुज़ि", "माउंट किनाबालु"],
  answer: "1"
},
{
  question: "भारत का राष्ट्रीय मंगल अभियान का नाम क्या है?",
  options: ["चंद्रयान-1", "चंद्रयान-2", "मंगलयान-1", "मंगलयान-2"],
  answer: "2"
},
{
  question: "भारत का सबसे ऊँचा पदार्थिक स्थल कौन सा है?",
  options: ["चोगोरी", "कंचेंजंगा", "नंदादेवी", "कमेटीशिवाँ"],
  answer: "0"
},
{
  question: "विश्व का सबसे बड़ा महाद्वीप कौन सा है?",
  options: ["आफ्रिका", "एशिया", "उत्तर अमेरिका", "ओस्ट्रेलिया"],
  answer: "1"
},
{
  question: "भारत की राजधानी नई दिल्ली किसने बनवाई थी?",
  options: ["लाल किले के राजा शाहजहाँ", "अकबर", "बबर", "हुमायूँ"],
  answer: "2"
},
{
  question: "महाभारत के अनुसार, भगवान श्रीकृष्ण के कितने अवतार थे?",
  options: ["7", "8", "9", "10"],
  answer: "3"
},
{
  question: "भारत की सबसे बड़ी तहसील कौन सी है?",
  options: ["लखनऊ", "जयपुर", "हल्द्वानी", "दिल्ली"],
  answer: "2"
},
{
  question: "अन्तरिक्ष में वायुमंडल की सबसे बाहरी परत किसे कहते हैं?",
  options: ["एक्सोस्फीयर", "थर्मोस्फीयर", "मेसोस्फीयर", "आयोनोस्फीयर"],
  answer: "0"
},
{
  question: "भारत का सबसे बड़ा पुल कौन सा है?",
  options: ["वायु सेतु", "लक्ष्मण झूला", "पटेल नदी का पुल", "बांगाल सेतु"],
  answer: "2"
},
{
  question: "भारत में सबसे ऊँची मीनार कौन सी है?",
  options: ["कुतुब मीनार", "फतेहपुर सीकरी की मीनार", "गुजरात की सीधी मीनार", "ख्वाजा उबैदुल्ला की मीनार"],
  answer: "3"
  },
  {
    question: "जहाज़ का एक जहाज़ी मीटर में कितने फ़ीट होते हैं?",
    options: ["3", "6", "9", "12"],
    answer: "0"
  },
  {
    question: "दुनिया का सबसे बड़ा महासागर कौन सा है?",
    options: ["भूमध्य सागर", "भारतीय महासागर", "अटलांटिक महासागर", "टीपी महासागर"],
    answer: "0"
  },
  {
    question: "पहली बार ऑल इंडिया मुस्लिम लीग का गठन कब हुआ था?",
    options: ["1916", "1926", "1906","1936"],
    answer: "2"
  },
  {
    question: "श्रीलंका का पूर्वी नाम क्या था?",
    options: ["सीलांका", "तमिलीलम", "सिंहलद्वप", "चंगु"],
    answer: "2"
  },
  {
    question: "किस वृक्ष को 'वनदेवता' कहा जाता है?",
    options: ["पीपल", "बरगद", "नीम", "शीशम"],
    answer: "1"
  },
  {
    question: "भारत का सबसे बड़ा राज्य कौन सा है?",
    options: ["राजस्थान", "मध्य प्रदेश", "उत्तर प्रदेश", "महाराष्ट्र"],
    answer: "0"
  },
  {
    question: "भारत में निम्नलिखित में से कौन सा नदी का स्रोत तिब्बत में स्थित है?",
    options: ["गंगा", "यमुना", "ब्रह्मपुत्र", "कृष्णा"],
    answer: "2"
  },
  {
    question: "विश्व का सबसे ऊँचा माउंटेन कहाँ पर स्थित है?",
  options: ["हिमालय", "अल्पसंचार", "अंडेस", "रॉकी माउंटेन"],
  answer: "0"
},
{
  question: "अंग्रेजी के विषय में निम्नलिखित में से कौन सा वक्तव्य सही है?",
  options: ["'इंग्लिश इज अ वेरी इंटरेस्टिंग लैंग्वेज ।'", "'एंग्लिश इज अ वेरी इंटरेस्टिंग लैंग्वेज है।'", "'इंग्लिश इज अ वेरी इंट्रेस्टिंग लैंग्वेज है।'", "'इंग्लिश इज ए वेरी इंटरेस्टिंग लैंग्वेज है।'"],
  answer: "0"
},
{
  question: "मोहंजोदड़ो सभ्यता किस नदी के किनारे स्थित थी?",
  options: ["यमुना", "गंगा", "सिंधु", "नर्मदा"],
  answer: "2"
},
{
  question: "पहली बार भारत को 'सोने की चिड़िया' कहा गया था जब यह अधिकांशत: सोने की अवस्था में था। भारत के कौनसे राज्य में सोने की अधिक मात्रा में पाया जाता है?",
  options: ["उत्तर प्रदेश", "केरल", "महाराष्ट्र", "जार्खंड"],
  answer: "3"
},
{
  question: "सबसे दक्षिण नगर निम्नलिखित में से कौन सा है?",
  options: ["कप टाउन", "कपटाउन", "पुणे", "बंगलूरु"],
  answer: "0"
},
{
 question: "पहली बार विश्व क्रिकेट कप किस वर्ष में खेला गया था?",
   options: ["1975", "1983", "1987", "1991"],
   answer: "0"
 },
 {
   question: "महात्मा गांधी द्वारा नेहरू को किस वर्ष में कांग्रेस के अध्यक्ष नियुक्त किया गया था?",
   options: [ "1931", "1941", "1951","1921"],
   answer: "3"
 },
 {
   question: "निम्नलिखित में से कौन सा फल विटामिन सी का उत्तम स्त्रोत है?",
   options: ["आंवला", "अमरूद", "सेब", "केला"],
   answer: "0"
 },
 {
   question: "इंडियन स्टैच ऑफ लाइबर्टी कहाँ स्थित है?",
   options: [ "वाशिंगटन डीसी","न्यूयॉर्क सिटी" ,"टोक्यो", "लंदन"],
   answer: "1"
 },
 {
   question: "अखिल भारतीय आम आदमी पार्टी का अध्यक्ष कौन है?",
   options: ["राहुल गांधी", "सोनिया गांधी", "ममता बनर्जी", "अरविंद केजरीवाल"],
   answer: "3"
 },
 {
   question: "इंडियन हॉकी टीम के नेशनल कोच कौन है?",
   options: ["संजीव कुमार", "ग्राहम रीड", "राहुल द्रविड़", "रवि शास्त्री"],
   answer: "1"
 },
 {
   question: "नोबेल पुरस्कार के वर्ष 2022 में किस विषय के लिए पुरस्कार नहीं दिया जाएगा?",
   options: ["शांति", "साहसा", "इश्तिहार", "साहित्य"],
  answer: "3"
},
{
  question: "बीएसई सेंसेक्स का मुख्य आधार भारतीय शेयर बाजार में कितनी शेयरों का अंश है?",
  options: ["20", "30", "50", "100"],
  answer: "1"
},
{
  question: "सौरमंडल का सबसे छोटा ग्रह कौन सा है?",
  options: ["मंगल", "बुध", "शुक्र", "उर्वरक"],
  answer: "1"
},
{
  question: "विश्व का सबसे ऊँचा पर्वत शिखर कौनसा है?",
  options: ["एवरेस्ट", "किलिमंजारो", "मॉन्ट ब्लांक", "माउंट मकालु"],
  answer: "0"
},
{
  question: "संयुक्त राज्य अमेरिका की राजधानी क्या है?",
  options: ["न्यूयॉर्क", "वाशिंगटन डीसी", "चिकागो", "लॉस एंजिल्स"],
  answer: "1"
},
{
  question: "विश्व में सबसे बड़ा महासागर कौन सा है?",
  options: ["हिन्द महासागर", "अटलांटिक महासागर", "भूमध्य सागर", "दक्षिणी महासागर"],
  answer: "2"
},
{
  question: "विश्व का सबसे बड़ा जैव ग्लोब है?",
  options: ["ग्रीनलैंड", "ऑस्ट्रेलिया", "अमेज़न जंगल", "अफ्रीका"],
  answer: "2"
},
{
  question: "विश्व का सबसे ऊँचा तथा सबसे लंबा रेलवे पुल कौनसा है?",
  options: ["ईंट और शिला पुल", "होव्र ब्रिज", "बंगबंदू सेतु", "जम्मू टवी हाईलेवल रेलवे"],
  answer: "2"
},
{
  question: "सोमनाथ मंदिर किस राज्य में स्थित है?",
  options: ["गुजरात", "महाराष्ट्र", "राजस्थान", "मध्य प्रदेश"],
  answer: "0"
},
{
  question: "भारत का सबसे लम्बा समुद्री तट कौनसा है?",
  options: ["गुजरात", "ओडिशा", "अंडमान और निकोबार", "तमिलनाडु"],
  answer: "2"
},
{
  question: "भारत में आधुनिक ज्योतिष शास्त्र के पितामह कहलाते हैं?",
  options: ["वराहमिहिर", "अर्यभट्ट", "बृहस्पति", "पाणिनि"],
  answer: "0"
},
{
  question: "भारत की राजधानी दिल्ली में स्थित है, किन्तु भारत की संविधानिक राजधानी कौन सी है?",
  options: ["मुंबई", "चेन्नई", "कोलकाता", "दिल्ली"],
  answer: "3"
},
{
  question: "विश्व का सबसे ऊँचा वाहन चलाने वाला पुरुष कौन है?",
  options: ["जेफ बेजोस", "अलेक्सा न्योट", "एलन मस्क", "रिचर्ड ब्रैंसन"],
  answer: "1"
},
{
  question: "संयुक्त राष्ट्र संघ की स्थापना कब हुई?",
  options: ["1945", "1946", "1947", "1948"],
  answer: "0"
},
{
  question: "इंडियन प्रीमियर लीग में नीचे दिए गए कौन सा खिलाड़ी नहीं खेलता है?",
  options: ["विराट कोहली", "एबी डिविलियर्स", "महेंद्र सिंह धोनी", "इशांत शर्मा"],
  answer: "3"
},
{
  question: "भारत में ग्रामीण विकास मंत्रालय की स्थापना किस वर्ष हुई?",
  options: ["1997", "1999", "2001", "2003"],
  answer: "1"
},
{
  question: "अंतरराष्ट्रीय महिला दिवस कब मनाया जाता है?",
  options: ["8 मार्च", "8 अप्रैल", "8 मई", "8 जून"],
  answer: "0"
},
{
  question: "अमेरिका की राष्ट्रपति जो दुनिया की सबसे ताकतवर महिला मानी जाती है, उनका नाम क्या है?",
  options: ["हिलेरी क्लिंटन", "जो बाइडेन", "बाराक ओबामा", "कामला हैरिस"],
  answer: "3"
},
{
  question: "स्पेन की राजधानी क्या है?",
  options: ["बर्लिन", "मैड्रिड", "पेरिस", "रोम"],
  answer: "1"
},
{
  question: "इंडियन स्पोर्ट्स के इतिहास में, पहली बार ओलंपिक में स्वर्ण पदक जीतने वाले खिलाड़ी कौन थे?",
  options: ["अभिनव बिंद्रा", "राहुल द्रविड़", "लीडा डाविस", "कर्णमलेश्वरी"],
  answer: "2"
},
  {
    question: "विश्व के सबसे ऊँचे पर्वत शिखर कौन सा है?",
    options: ["माउंट एवरेस्ट", "किलिमंजारो", "मॉन्ट ब्लैंक", "मॉन्ट फुजी"],
    answer: "0"
  },
  {
    question: "भारत का सबसे लंबा रेल मार्ग कौन सा है?",
    options: ["दिल्ली-कोलकाता रेल मार्ग", "कोनकान रेल मार्ग", "दिल्ली-चेन्नई रेल मार्ग", "जम्मू-तवी रेल मार्ग"],
    answer: "0"
  },
  {
    question: "हवाई जहाज के आविष्कारक विल्बर राइट का जन्म किस देश में हुआ था?",
    options: ["इंग्लैंड", "फ्रांस", "अमेरिका","जर्मनी"],
    answer: "2"
  },
  {
    question: "भारत का सबसे लंबा समुद्री समंदर कौन सा है?",
    options: ["हिंद महासागर", "उत्तरी ध्रुव सागर", "दक्षिणी महासागर", "अरब सागर"],
    answer: "0"
  },
  {
    question: "साप्ताहिक धर्मग्रंथ गीता किस युद्ध से सम्बन्धित है?",
    options: ["कुरुक्षेत्र युद्ध", "राम-रावण युद्ध", "कर्ण-दुर्योधन युद्ध","महाभारत युद्ध"],
    answer: "3"
  },
  {
    question: "वर्ष 2020 में ओलंपिक खेल कहाँ होने वाले थे?",
    options: ["टोक्यो", "रियो डी जेनेरो", "लंदन", "पेरिस"],
    answer: "0"
  },
  {
    question: "विश्व का सबसे बड़ा द्वीप कौन सा है?",
    options: ["ऑस्ट्रेलिया", "अमेरिका", "ग्रीनलैंड", "अंटार्कटिका"],
    answer: "0"
  },
  {
    question: "विश्व का सबसे लंबा नदी सिस्टम कौन सा है?",
    options: ["नील नदी सिस्टम", "यांग्त्से नदी सिस्टम", "मिसिसिपी नदी सिस्टम", "अमेजन नदी सिस्टम"],
    answer: "3"
  },
  {
    question: "विश्व का सबसे बड़ा महासागर कौन सा है?",
    options: ["हिंद महासागर", "उत्तरी ध्रुव सागर", "दक्षिणी महासागर", "अरब सागर"],
    answer: "2"
  },
  {
    question: "भारत की राष्ट्रीय खेल कौन सा है?",
    options: ["क्रिकेट", "फुटबॉल","हॉकी", "बास्केटबॉल"],
    answer: "2"
  },
  {
    question: "विश्व की सबसे लंबी एकल सांसदीय सड़क कौन सी है?",
    options: ["पैन अमेरिकन हाईवे", "ट्रांस साइबेरियन हाईवे", "नीलगिरी हाईवे", "ग्रेट ओशन रोड"],
    answer: "0"
  },
  {
    question: "भारत का सबसे बड़ाफल और सब्जी मंडी कहाँ है ? ",
    options: ["मुंबई", "दिल्ली", "कोलकाता", "चेन्नई"],
      answer: "1"
    },
    {
      question: "विश्व की सबसे ऊँची पर्वत शिखर कौन सा है?",
      options: ["माउंट एवरेस्ट", "किलिमंजारो", "माउंट किनाबालु", "देनाली"],
      answer: "0"
    },
    {
      question: "अशोक चक्र किस अंग्रेजी शब्द के समान होता है?",
      options: ["साइकल व्हील", "वाइल व्हील", "गेयर व्हील", "व्हील बेयरिंग"],
      answer: "1"
    },
    {
      question: "जहाजों को अंग्रेजी में क्या कहा जाता है?",
      options: ["शिप्स", "बोट्स", "याच्ट", "क्रूज"],
      answer: "0"
    },
  
    {
      question: "भारत का सबसे बड़ा अन्न बाजार कहाँ है?",
      options: ["आदर्श नगर", "इंदौर", "आजादपुर", "कोलकाता"],
      answer: "2"
    },
    {
      question: "भारत के राष्ट्रीय सैनिक वाहन का नाम क्या है?",
      options: ["आर्जन", "विक्रम", "शक्ति", "शक्तिमान "],
      answer: "1"
      },
      {
        question: "भारत का राष्ट्रीय खेल कौन सा है?",
        options: ["हॉकी", "क्रिकेट", "फुटबॉल", "कबड्डी"],
        answer: "0"
      },
      {
        question: "भारत की राजधानी दिल्ली की स्थापना कब हुई थी?",
        options: ["1911", "1912", "1913", "1914"],
        answer: "0"
      },
      {
        question: "पृथ्वी पर उपलब्ध सबसे ऊँची ज्वालामुखी कौन सी है?",
        options: ["किलाविश्वनाथ", "माउंट सेन्ट हेलेना", "माउंट एटना", "माउंट किनाबालु"],
        answer: "2"
      },
      {
        question: "सौरमंडल में सबसे बड़ी ग्रह जुपिटर है। यह कौन सी सूर्यमुखी में होता है?",
        options: ["पाँचवीं", "छठवीं", "सातवीं", "आठवीं"],
        answer: "0"
      },
      {
        question: "दुनिया का सबसे बड़ा बांध कौन सा है?",
        options: ["तमिरा बांध", "हुवाई बांध", "थ्री गोर्ज डैम", "नीलेश्वर बांध"],
        answer: "2"
      },
      {
        question: "पृथ्वी से सबसे नजदीकी सितारा कौन सा है?",
        options: ["आल्फा सेंटौरी", "प्रोक्सिमा सटौरी", "बेटलगूस", "वेगा"],
        answer: "1"
      },
      {
        question: "दुनिया की सबसे ऊँची इमारत कौन सी है?",
        options: ["बुर्ज खलीफा", "शंघाई टावर", "टाइवन 101", "विलिस टावर"],
  answer: "0"
},
{
  question: "वर्तमान में भारत का प्रधानमंत्री कौन है?",
  options: ["नरेंद्र मोदी", "राहुल गांधी", "ममता बनर्जी", "अमित शाह"],
  answer: "0"
},
{
  question: "भारत का राष्ट्रीय पक्षी कौन सा है?",
  options: ["पीला सारस", "नीलकंठ", "मोर", "चिल"],
  answer: "2"
},
{
  question: "भारत का राष्ट्रीय पुष्प कौन सा है?",
  options: ["लोटस", "गुलाब", "मरीगोल्ड", "जयपुर राजकमल"],
  answer: "0"
},
{
  question: "भारत की राजधानी दिल्ली की कुल जनसँख्या कितनी है?",
  options: ["1 करोड़", "1.5 करोड़", "2 करोड़", "2.5 करोड़"],
  answer: "2"
},
{
  question: "महाभारत के युद्ध में भगवान श्रीकृष्ण किस पक्ष के थे?",
  options: ["कौरव", "पाण्डव", "कुरु", "यादव"],
  answer: "1"
},
{
  question: "सबसे अधिक जनसँख्या वाला देश कौन सा है?",
  options: ["भारत", "चीन", "अमेरिका", "रूस"],
  answer: "1"
},
{
  question: "भारत का सबसे लम्बा समुद्री तट कौन सा है?",
  options: ["गुजरात का", "महाराष्ट्र का", "तमिलनाडु का", "ओडिशा का"],
  answer: "0"
},
{
  question: "भारत में कौन सा खेल राष्ट्रीय खेल है?",
    options: ["क्रिकेट", "हॉकी", "फुटबॉल", "बैडमिंटन"],
    answer: "1"
  },
  {
    question: "भारत की राष्ट्रिय खाद्य सुरक्षा अधिनियम कब लागू हुआ था?",
    options: ["2000", "2001", "2002", "2003"],
    answer: "3"
  },
  {
    question: "भारत की पहली महिला राज्यपाल कौन थी?",
    options: ["प्रतिभा पाटिल","सरोजिनी नायडू", "सीमा जैन", "वसुंधरा राजे"],
    answer: "1"
  },
  {
    question: "भारत की पहली महिला उपराष्ट्रपति कौन थी?",
    options: ["प्रतिभा पाटिल", "मीरा कुमार", "चंद्रा कोच्छर", "सुषमा स्वराज"],
    answer: "0"
  },
  {
    question: "साल 2021 में टोक्यो ओलंपिक का कौन सा संस्करण था?",
    options: ["28वां", "29वां", "30वां", "31वां"],
    answer: "3"
  },
  {
    question: "विश्व का सबसे बड़ा धर्म कौन सा है?",
    options: ["हिंदू धर्म", "इस्लाम", "बौद्ध धर्म", "ईसाई धर्म"],
    answer: "0"
  },
  {
    question: "भारत में पहली मुस्लिम नायिका कौन थी?",
    options: ["नुसरत जहाँ", "मदहुबाला", "ख़ुर्शीद जहाँ", "मुमताज़ शहबाज़"],
    answer: "1"
  },
  {
    question: "भारत के पहले प्रधानमंत्री जवाहरलाल नेहरू के पिता का क्या नाम था?",
    options: ["मोतीलाल नेहरू", "स्वरूप राणा", "गोपाल कृष्ण गोखले", "कमलापति त्रिपाठी"],
    answer: "0"
  },
  {
    question: "अंतर्राष्ट्रीय महिला दिवस कब मनाया जाता है?",
    options: ["12 मई", "8 मार्च","10 अक्टूबर", "20 नवंबर"],
    answer: "1"
  },
  {
    question: "भारत का राष्ट्रीय पक्षी कौन है?",
    options: ["पीला मैना", "मोर", "गरुड़", "नीलकंठ"],
    answer: "0"
  },
  {
    question: "सबसे ऊंची मनुष्य निर्मित इमारत कौन सी है?",
    options: ["बुर्ज खलीफा", "शंघाई टावर", "आइफल टावर", "विलिस टावर"],
    answer: "0"
  },
  {
    question: "भारत का राष्ट्रीय मंगल ग्रह अभियान का नाम क्या है?",
    options: ["चंद्रयान-1", "चंद्रयान-2", "अग्निपरीक्ष","मंगलयान"],
    answer: "3"
  },
  {
    question: "पृथ्वी का व्यास कितना है?",
    options: ["6,371 किमी", "6,471 किमी", "6,551 किमी", "6,651 किमी"],
    answer: "0"
  },
  
];*/






function startQuiz() {
    // Display the first question and its options
    displayQuestion(currentQuestion);

    // Start the timer
    timer = setInterval(updateTimer, 1000);

    // Update the progress bar
    updateProgress();
}


function displayQuestion(questionIndex) {
  updateProgress()
    // Get the question and options from the questions array
    let question = questions[questionIndex].question;
    let options = questions[questionIndex].options;

    // Display the question and options in their respective containers
    questionEl.innerHTML = question;

    for (let i = 0; i < options.length; i++) {
        let option = `<option onclick = checkAnswer(${i})>${options[i]} </option>`
        
        answerContainer.insertAdjacentHTML("beforeend",option)
    }
}


function checkAnswer(selectedIndex) {
    // Get the selected answer from the user
    attemptQuestion++;
    answerContainer.style.pointerEvents="none"
    clearInterval(timer);
    let selectedAnswer = questions[currentQuestion].options[selectedIndex];

    // Get the correct answer from the questions array
    let correctAnswer = questions[currentQuestion].options[questions[currentQuestion].answer];

    // Compare the selected answer to the correct answer
    if (selectedAnswer === correctAnswer) {
      score++;
     setTimeout(()=>{
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#37BB1169"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "green"
     },100)
      

        userAnswers[currentQuestion] = selectedIndex;

        // Display the correct answer and highlight it in green
        
    } else {
      wrongQuestion++;
       setTimeout(()=>{
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#B6141469"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "red"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor="#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color="#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor="green"
     },100)
    }
}


function nextQuestion() {
    // Check if the user has answered all questions
    
    answerContainer.style.pointerEvents="initial"
    time.innerHTML="15"
    updateProgress()
    timer = setInterval(updateTimer, 1000);
    answerContainer.innerHTML=""
    if (currentQuestion === questions.length - 1) {
      resultCard.style.width="300px"
      resultCard.style.transform="scale(1)"
      totalScore.innerHTML = questions.length
      yourScore.innerHTML = score
      attempted.innerHTML = attemptQuestion
      unattempted.innerHTML = unattemptedQuestion
      wrong.innerHTML = wrongQuestion
      wrapper.style.width="0"
      wrapper.style.transform="scale(0)"
        endQuiz();
    } else {
        // If there are more questions, update the currentQuestion variable and display the next question and its options
        currentQuestion++;
        currentQuestionNum.innerHTML=currentQuestion + 1
        displayQuestion(currentQuestion);
    }
}

function updateTimer() {
    // Decrement the timer by 1 second
    let remainingTime = parseInt(time.innerHTML) - 1;

    // Update the timer display
    time.innerHTML = remainingTime > 9 ? remainingTime : "0" + remainingTime;

    // Update the progress bar
    

    // If the timer reaches 0, end the quiz
    if (remainingTime === 0) {
      unattemptedQuestion++;
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor = "#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color = "#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor = "green"
      answerContainer.style.pointerEvents="none"
        endQuiz();
    }
}

function updateProgress() {
 progressBar.style.width = (currentQuestion + 1)/questions.length * 100 + "%";
 
 ;
}

function endQuiz() {
    // Stop the timer
    clearInterval(timer);
    
    // Hide the question and option containers
    
}

nxtBtn.addEventListener("click",nextQuestion);



totalQuestion.innerHTML = questions.length
currentQuestionNum.innerHTML=currentQuestion + 1

// More questions that you can add 
/* {
    question: "Which country is known for inventing pizza?",
    options: ["France", "Italy", "Spain", "Greece"],
    answer: "1"
  },
  {
    question: "What is the currency of Mexico?",
    options: ["Euro", "Yen", "Dollar", "Peso"],
    answer: "3"
  },
  {
    question: "Who wrote the novel '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.D. Salinger"],
    answer: "0"
  },
  {
    question: "What is the most spoken language in the world?",
    options: ["Mandarin", "English", "Spanish", "French"],
    answer: "1"
  },
  {
  question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: 2
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Lungs"],
    answer: 2
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pt", "Cu"],
    answer: 0
  },
  {
    question: "What is the most populated country in the world?",
    options: ["India", "China", "United States", "Russia"],
    answer: 1
  },
  {
    question: "Which planet is closest to the sun?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    answer: 1
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: 3
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "Mount McKinley"],
    answer: 1
  },
  {
    question: "What is the largest country in South America?",
    options: ["Brazil", "Argentina", "Colombia", "Peru"],
    answer: 0
  },
  {
    question: "What is the smallest country in the world by land area?",
    options: ["Monaco", "Vatican City", "San Marino", "Nauru"],
    answer: 1
  },
  {
    question: "What is the chemical formula for water?",
    options: ["H2O2", "H2SO4", "NaCl", "H2O"],
    answer: "3"
  },
  {
    question: "Which planet in our solar system is known as the Red Planet?",
    options: ["Jupiter", "Saturn", "Mars", "Venus"],
    answer: "2"
  },
  {
    question: "Which country is known for producing the most coffee in the world?",
    options: ["Brazil", "Colombia", "Ethiopia", "Vietnam"],
    answer: "0"
  },
  {
    question: "What is the only continent that lies in all four hemispheres?",
    options: ["North America", "Europe", "Africa", "South America"],
    answer: "2"
  },
  {
    question: "What is the largest animal on land?",
    options: ["Elephant", "Giraffe", "Hippopotamus", "Rhino"],
    answer: "0"
  },
  {
    question: "Who is the current Prime Minister of Canada?",
    options: ["Justin Trudeau", "Stephen Harper", "Jean Chrétien", "Brian Mulroney"],
    answer: "0"
  },
  {
    question: "Who directed the movie 'Pulp Fiction'?",
    options: ["Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "Christopher Nolan"],
    answer: "0"
  },
  {
    question: "What is the capital city of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"],
    answer: "0"
  },
  {
    question: "What is the largest continent in the world?",
    options: ["Europe", "South America", "Asia", "Africa"],
    answer: "2"
  },
  {
    question: "Who is the author of the 'Game of Thrones' book series?",
    options: [ "J.K. Rowling", "Stephen King", "Dan Brown","George R.R. Martin"],
    answer: "3"
  },
  {
    question: "What is the highest waterfall in the world?",
    options: ["Angel Falls", "Niagara Falls", "Victoria Falls", "Iguazu Falls"],
    answer: "0"
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Sahara Desert", "Gobi Desert", "Arabian Desert", "Antarctic Desert"],
    answer: "3"
  },
  {
    question: "Who wrote the novel 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "F. Scott Fitzgerald", "Ernest Hemingway", "Mark Twain"],
    answer: "0"
  },
  {
    question: "What is the chemical symbol for nitrogen?",
    options: ["Na", "N", "Ni", "Ne"],
    answer: "1"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Lion", "Tiger", "Leopard", "Jaguar"],
    answer: "0"
  },
  {
    question: "Who is the current President of the United States?",
    options: ["Barack Obama", "Donald Trump", "Joe Biden", "George W. Bush"],
    answer: "2"
  },
  {
    question: "What is the smallest continent in the world?",
    options: ["Europe", "Antarctica", "Australia", "Africa"],
    answer: "2"
  },
  {
    question: "What is the currency of China?",
    options: ["Yen", "Won", "Rupiah", "Yuan"],
    answer: "0"
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Larry Page"],
    answer: "0"
  },
  {
    question: "Who directed the movie 'Jurassic Park'?",
    options: ["Steven Spielberg", "James Cameron", "Martin Scorsese", "Quentin Tarantino"],
    answer: "0"
  },
  {
    question: "What is the national animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Leopard"],
    answer: "1"
  },
  {
    question: "What is the capital city of Italy?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: "3"
  },
  {   
    question: "What is the tallest mammal in the world?",    
    options: ["Elephant", "Giraffe", "Hippopotamus", "Rhinoceros"],
    answer: "1"
  },
  {
    question: "What is the name of the device used to measure blood pressure?",
    options: ["Oximeter", "Thermometer", "Sphygmomanometer", "Stethoscope"],
    answer: "2"
  },
  {
    question: "Who invented the telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Michael Faraday"],
    answer: "0"
  },
  {
    question: "What is the chemical symbol for iron?",
    options: ["Fe", "Ag", "Au", "Pb"],
    answer: "0"
  },
  {
    question: "Who wrote the novel 'To Kill a Mockingbird'?",
    options: [ "J.K. Rowling","Harper Lee", "Stephen King", "John Steinbeck"],
    answer: "1"
  },
  {
    question: "What is the national flower of Japan?",
    options: ["Cherry blossom", "Lily", "Rose", "Sunflower"],
    answer: "0"
  },
  {
    question: "What is the capital city of Canada?",
    options: ["Toronto", "Montreal","Ottawa",  "Vancouver"],
    answer: "2"
  },
  {
    question: "Who wrote the famous novel 'The Great Gatsby'?",
    options: ["F. Scott Fitzgerald", "Ernest Hemingway", "William Faulkner", "Virginia Woolf"],
    answer: "0"
  },
  {
    question: "What is the only continent that is also a country?",
    options: ["North America", "Australia","Europe", "South America"],
    answer: "1"
  },
  {
    question: "What is the name of the scientist who first proposed the theory of relativity?",
    options: [ "Isaac Newton", "Galileo Galilei", "Charles Darwin","Albert Einstein"],
    answer: "3"
  },
  {
    question: "What is the largest country in the world by land area?",
    options: ["Russia", "China", "USA", "Canada"],
    answer: "0"
  },
  {
    question: "What is the capital city of Brazil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    answer: "2"
  },
  {
    question: "What is the name of the first man to walk on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
    answer: "0"
  }*/