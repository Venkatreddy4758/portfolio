// ─────────────────────────────────────────────────────────────────────────────
// All bilingual website copy. Components read by key + language — never hardcode
// strings in components. `en` and `te` MUST share the same keys so the language
// toggle never leaves half-translated UI.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = "en" | "te";

export const content = {
  meta: {
    en: {
      siteTitle: "Venkat Reddy Regulapally — A Life Rooted in Values",
      siteDescription:
        "A cinematic marriage portfolio: from the soil of Telangana to the world. Rooted in tradition, educated across borders, ready for a beautiful new chapter.",
    },
    te: {
      siteTitle: "వెంకట్ రెడ్డి రెగ్యులపల్లి — విలువలతో పెరిగిన జీవితం",
      siteDescription:
        "ఒక సినిమాటిక్ వివాహ పరిచయం: తెలంగాణ నేల నుండి ప్రపంచం వరకు. సంప్రదాయాల్లో వేర్లు, ప్రపంచాన్ని చూసిన దృష్టి, కొత్త అధ్యాయానికి సిద్ధం.",
    },
  },

  opening: {
    en: {
      titleLine1: "A Life Rooted in Values,",
      titleLine2: "Guided by Purpose,",
      titleLine3: "Ready for a Beautiful Beginning",
      cta: "Enter His Story",
      skip: "Skip",
    },
    te: {
      titleLine1: "విలువలతో పెరిగిన జీవితం",
      titleLine2: "లక్ష్యంతో సాగిన ప్రయాణం",
      titleLine3: "అందమైన ఆరంభానికి సిద్ధం",
      cta: "జీవిత ప్రయాణం",
      skip: "దాటవేయి",
    },
  },

  hero: {
    en: {
      eyebrow: "From the Soil of Telangana to the World",
      tagline1: "Rooted in tradition.",
      tagline2: "Educated across borders.",
      tagline3: "Building a purposeful life.",
      tagline4: "Ready to begin a beautiful new chapter.",
      scroll: "Scroll to begin",
      listen: "Listen to the Story",
    },
    te: {
      eyebrow: "తెలంగాణ నేల నుండి ప్రపంచం వరకు",
      tagline1: "సంప్రదాయాల్లో వేర్లు.",
      tagline2: "ప్రపంచాన్ని చూసిన దృష్టి.",
      tagline3: "బాధ్యతతో నిర్మించిన జీవితం.",
      tagline4: "కొత్త బంధానికి సిద్ధమైన హృదయం.",
      scroll: "ప్రారంభించడానికి క్రిందికి",
      listen: "కథ వినండి",
    },
  },

  // Sticky storytelling sequence (Section 12).
  story: {
    en: [
      { no: "01", kicker: "ROOTS", title: "Roots", body: "Born in Siddipet, his story began in a home shaped by simplicity, hard work and strong family values." },
      { no: "02", kicker: "EDUCATION", title: "Education", body: "His academic journey took him from Hyderabad to Cambridge, expanding both his knowledge and perspective." },
      { no: "03", kicker: "CAREER", title: "Career", body: "Today he works as a Software Tester at Genpact, building a stable and purposeful professional life." },
      { no: "04", kicker: "FAMILY", title: "Family", body: "At the centre of every achievement remains a deep respect for family, relationships and tradition." },
    ],
    te: [
      { no: "01", kicker: "మూలాలు", title: "మూలాలు", body: "సిద్దిపేటలో జన్మించిన ఆయన కథ, సరళత, కష్టం, బలమైన కుటుంబ విలువలతో నిండిన ఇంటిలో మొదలైంది." },
      { no: "02", kicker: "విద్య", title: "విద్య", body: "ఆయన విద్యా ప్రయాణం హైదరాబాద్ నుండి కేంబ్రిడ్జ్ వరకు సాగి, జ్ఞానాన్ని, దృష్టిని విస్తరించింది." },
      { no: "03", kicker: "వృత్తి", title: "వృత్తి", body: "నేడు ఆయన జెన్‌పాక్ట్‌లో సాఫ్ట్‌వేర్ టెస్టర్‌గా స్థిరమైన, లక్ష్యంతో కూడిన వృత్తి జీవితాన్ని నిర్మిస్తున్నారు." },
      { no: "04", kicker: "కుటుంబం", title: "కుటుంబం", body: "ప్రతి విజయం వెనుక కుటుంబం, బంధాలు, సంప్రదాయం పట్ల లోతైన గౌరవం నిలిచి ఉంటుంది." },
    ],
  },

  beyond: {
    en: {
      title: "Beyond the Biodata",
      lines: [
        "Venkat is grounded, respectful and quietly ambitious.",
        "His upbringing taught him the value of hard work, his education gave him a global outlook, and his professional journey developed independence and responsibility.",
        "He values meaningful relationships, honest communication, family connection and building a peaceful life together.",
      ],
    },
    te: {
      title: "బయోడేటా వెనుక ఉన్న వ్యక్తి",
      lines: [
        "వెంకట్ నేలతో అనుబంధం ఉన్న, గౌరవప్రదమైన, నిశ్శబ్దంగా లక్ష్యంతో సాగే వ్యక్తి.",
        "ఆయన పెంపకం కష్టపడటం విలువను నేర్పింది, విద్య ప్రపంచ దృష్టిని ఇచ్చింది, వృత్తి ప్రయాణం స్వాతంత్ర్యాన్ని, బాధ్యతను పెంచింది.",
        "ఆయన అర్థవంతమైన బంధాలను, నిజాయితీగా మాట్లాడటాన్ని, కుటుంబ అనుబంధాన్ని, కలిసి ప్రశాంత జీవితాన్ని నిర్మించడాన్ని విలువైనదిగా భావిస్తారు.",
      ],
    },
  },

  // Royal medallions (Section 14). `value` strings come from profile.ts at render.
  medallions: {
    en: [
      { key: "born", label: "Born" },
      { key: "height", label: "Height" },
      { key: "native", label: "Native" },
      { key: "tongue", label: "Mother Tongue" },
      { key: "profession", label: "Profession" },
      { key: "city", label: "City" },
    ],
    te: [
      { key: "born", label: "జననం" },
      { key: "height", label: "ఎత్తు" },
      { key: "native", label: "స్వస్థలం" },
      { key: "tongue", label: "మాతృభాష" },
      { key: "profession", label: "వృత్తి" },
      { key: "city", label: "నగరం" },
    ],
  },

  education: {
    en: {
      title: "Global Education",
      subtitle: "An academic journey across borders",
      stages: [
        { place: "Vikas High School", city: "Siddipet", note: "Where curiosity first took root." },
        { place: "Wesley Degree College", city: "Hyderabad", note: "A foundation built in the city." },
        { place: "Anglia Ruskin University", city: "Cambridge, UK", note: "A chapter that widened the world." },
        { place: "Master's in International Business Management", city: "Cambridge, UK", note: "Knowledge shaped into purpose." },
      ],
    },
    te: {
      title: "ప్రపంచ దృష్టిని ఇచ్చిన విద్య",
      subtitle: "సరిహద్దులు దాటిన విద్యా ప్రయాణం",
      stages: [
        { place: "వికాస్ హై స్కూల్", city: "సిద్దిపేట", note: "ఆసక్తి మొదట వేరూనిన చోటు." },
        { place: "వెస్లీ డిగ్రీ కళాశాల", city: "హైదరాబాద్", note: "నగరంలో నిర్మించిన పునాది." },
        { place: "ఆంగ్లియా రస్కిన్ విశ్వవిద్యాలయం", city: "కేంబ్రిడ్జ్, యూకే", note: "ప్రపంచాన్ని విస్తరించిన అధ్యాయం." },
        { place: "ఇంటర్నేషనల్ బిజినెస్ మేనేజ్‌మెంట్‌లో మాస్టర్స్", city: "కేంబ్రిడ్జ్, యూకే", note: "జ్ఞానం లక్ష్యంగా మారిన చోటు." },
      ],
    },
  },

  journey: {
    en: {
      title: "A Journey Across Places",
      stops: [
        { place: "Siddipet", word: "Roots", line: "Where family, identity and values began." },
        { place: "Hyderabad", word: "Foundation", line: "Where education and ambition took shape." },
        { place: "Cambridge", word: "Perspective", line: "A chapter that brought independence, global exposure and personal growth." },
        { place: "Hyderabad", word: "Purpose", line: "A return home to build a stable, meaningful life." },
      ],
    },
    te: {
      title: "ప్రదేశాల మధ్య ప్రయాణం",
      stops: [
        { place: "సిద్దిపేట", word: "మూలాలు", line: "కుటుంబం, గుర్తింపు, విలువలు మొదలైన చోటు." },
        { place: "హైదరాబాద్", word: "పునాది", line: "విద్య, లక్ష్యం రూపుదిద్దుకున్న చోటు." },
        { place: "కేంబ్రిడ్జ్", word: "దృష్టి", line: "స్వాతంత్ర్యం, ప్రపంచ అనుభవం, వ్యక్తిగత ఎదుగుదల ఇచ్చిన అధ్యాయం." },
        { place: "హైదరాబాద్", word: "లక్ష్యం", line: "స్థిరమైన, అర్థవంతమైన జీవితాన్ని నిర్మించడానికి తిరిగి స్వస్థలానికి." },
      ],
    },
  },

  career: {
    en: {
      title: "Purpose in Profession",
      body: "A career built on stability, responsibility and steady growth — work approached with discipline and an eye on the future.",
    },
    te: {
      title: "వృత్తిలో లక్ష్యం",
      body: "స్థిరత్వం, బాధ్యత, నిరంతర ఎదుగుదలపై నిర్మించిన వృత్తి — క్రమశిక్షణతో, భవిష్యత్తుపై దృష్టితో.",
    },
  },

  family: {
    en: {
      title: "The Family That Shaped Him",
      line: "A family rooted in agriculture, hard work, simplicity and mutual respect.",
    },
    te: {
      title: "ఆయనను తీర్చిదిద్దిన కుటుంబం",
      line: "వ్యవసాయం, కష్టం, సరళత, పరస్పర గౌరవంతో పెరిగిన కుటుంబం.",
    },
  },

  roots: {
    en: {
      title: "Rooted in the Land",
      body: "Telangana soil, paddy fields and early light — a connection to place that gives stability, pride and identity.",
    },
    te: {
      title: "నేలతో అనుబంధం",
      body: "తెలంగాణ నేల, వరి పొలాలు, ఉదయపు వెలుగు — స్థిరత్వం, గర్వం, గుర్తింపు ఇచ్చే నేలతో అనుబంధం.",
    },
  },

  personality: {
    en: {
      title: "The Qualities He Carries",
      traits: ["Grounded", "Respectful", "Responsible", "Family-oriented", "Calm", "Ambitious", "Caring", "Independent", "Adaptable", "Honest"],
    },
    te: {
      title: "ఆయన వ్యక్తిత్వం",
      traits: ["నేలతో అనుబంధం", "గౌరవం", "బాధ్యత", "కుటుంబ ప్రాధాన్యం", "ప్రశాంతత", "లక్ష్యం", "శ్రద్ధ", "స్వాతంత్ర్యం", "అనుకూలత", "నిజాయితీ"],
    },
  },

  hobbies: {
    en: {
      title: "Beyond the Everyday",
      subtitle: "The things that keep him grounded and glad",
      items: [
        { icon: "dumbbell", title: "Morning Workout", note: "Gym and a run to begin each day with energy and discipline." },
        { icon: "trophy", title: "Weekend Badminton", note: "A favourite way to unwind and stay active with friends." },
        { icon: "film", title: "Cinema & Films", note: "A genuine love for good stories told on screen." },
        { icon: "newspaper", title: "Daily News", note: "Staying informed and curious about the world." },
        { icon: "plane", title: "Travel", note: "Exploring new places, cultures and perspectives." },
        { icon: "music", title: "Music", note: "A quiet companion through work and rest." },
      ],
    },
    te: {
      title: "Beyond the Everyday",
      subtitle: "The things that keep him grounded and glad",
      items: [
        { icon: "dumbbell", title: "Morning Workout", note: "Gym and a run to begin each day with energy and discipline." },
        { icon: "trophy", title: "Weekend Badminton", note: "A favourite way to unwind and stay active with friends." },
        { icon: "film", title: "Cinema & Films", note: "A genuine love for good stories told on screen." },
        { icon: "newspaper", title: "Daily News", note: "Staying informed and curious about the world." },
        { icon: "plane", title: "Travel", note: "Exploring new places, cultures and perspectives." },
        { icon: "music", title: "Music", note: "A quiet companion through work and rest." },
      ],
    },
  },

  dayInLife: {
    en: {
      title: "A Day in His Life",
      blocks: [
        { phase: "Morning", line: "A calm start, planning the day and staying connected with family." },
        { phase: "Work", line: "Focused, organised and committed to professional growth." },
        { phase: "Evening", line: "Relaxation, personal interests and meaningful conversations." },
        { phase: "Weekend", line: "Family, travel, good food, friends and new experiences." },
      ],
    },
    te: {
      title: "ఆయన ఒక రోజు",
      blocks: [
        { phase: "ఉదయం", line: "ప్రశాంతమైన మొదలు, రోజును ప్లాన్ చేస్తూ కుటుంబంతో అనుబంధం." },
        { phase: "పని", line: "దృష్టితో, క్రమబద్ధంగా, వృత్తి ఎదుగుదలకు అంకితం." },
        { phase: "సాయంత్రం", line: "విశ్రాంతి, వ్యక్తిగత ఆసక్తులు, అర్థవంతమైన సంభాషణలు." },
        { phase: "వారాంతం", line: "కుటుంబం, ప్రయాణం, మంచి ఆహారం, స్నేహితులు, కొత్త అనుభవాలు." },
      ],
    },
  },

  values: {
    en: {
      title: "A Relationship Built with Meaning",
      panels: [
        { title: "Mutual Respect", body: "A partnership where both individuals feel heard, valued and supported." },
        { title: "Honest Communication", body: "Speaking openly and listening with genuine care." },
        { title: "Family Connection", body: "Two families coming together with warmth and trust." },
        { title: "Emotional Understanding", body: "Standing by each other through every season of life." },
        { title: "Trust", body: "The quiet foundation that makes everything else possible." },
        { title: "Shared Responsibility", body: "Building a home and a future as equals." },
        { title: "Career Encouragement", body: "Supporting each other's ambitions and growth." },
        { title: "Growing Together", body: "Two people, one journey, learning side by side." },
      ],
    },
    te: {
      title: "అర్థవంతమైన బంధం",
      panels: [
        { title: "పరస్పర గౌరవం", body: "ఇద్దరూ గౌరవంగా, విలువగా, మద్దతుగా భావించే బంధం." },
        { title: "నిజాయితీగా మాట్లాడటం", body: "మనస్ఫూర్తిగా మాట్లాడటం, శ్రద్ధగా వినడం." },
        { title: "కుటుంబ అనుబంధం", body: "ఆప్యాయత, నమ్మకంతో కలిసే రెండు కుటుంబాలు." },
        { title: "భావోద్వేగ అవగాహన", body: "జీవితంలోని ప్రతి దశలో ఒకరికొకరు తోడుగా." },
        { title: "నమ్మకం", body: "మిగతావన్నీ సాధ్యం చేసే నిశ్శబ్ద పునాది." },
        { title: "పంచుకునే బాధ్యత", body: "సమానంగా ఒక ఇంటిని, భవిష్యత్తును నిర్మించడం." },
        { title: "వృత్తికి ప్రోత్సాహం", body: "ఒకరి లక్ష్యాలను, ఎదుగుదలను మరొకరు ప్రోత్సహించడం." },
        { title: "కలిసి ఎదగడం", body: "ఇద్దరు మనుషులు, ఒక ప్రయాణం, పక్కపక్కనే నేర్చుకుంటూ." },
      ],
    },
  },

  partner: {
    en: {
      title: "Hoping to Meet a Meaningful Life Partner",
      body: "He hopes to meet someone kind, emotionally mature, well-mannered and family-oriented — someone who values communication, mutual respect, trust and supporting each other's aspirations; a person with whom life can be built with peace, friendship, warmth and shared purpose.",
    },
    te: {
      title: "అందమైన జీవిత భాగస్వామ్యం కోసం",
      body: "దయగల, భావోద్వేగపరంగా పరిణతి చెందిన, మర్యాదగల, కుటుంబ ప్రాధాన్యమున్న వ్యక్తిని కలవాలని ఆయన ఆశిస్తున్నారు — మాటను, పరస్పర గౌరవాన్ని, నమ్మకాన్ని, ఒకరి ఆశయాలకు మరొకరు తోడుగా నిలవడాన్ని విలువైనదిగా భావించే వ్యక్తి; ప్రశాంతత, స్నేహం, ఆప్యాయత, ఉమ్మడి లక్ష్యంతో జీవితాన్ని నిర్మించగల తోడు.",
    },
  },

  poetry: {
    en: [
      { te: "మనసులు కలిసినప్పుడు, ప్రయాణం కథగా మారుతుంది.", en: "When two hearts meet, the journey becomes a story." },
      { te: "బంధం అనేది ఇద్దరి మధ్య మాట మాత్రమే కాదు, రెండు కుటుంబాల మధ్య నమ్మకం.", en: "A bond is not only a word between two — it is trust between two families." },
      { te: "జీవితం కలిసి నడవడానికి, ముందుగా ఒకరినొకరు అర్థం చేసుకోవాలి.", en: "To walk through life together, we must first understand one another." },
      { te: "వేర్లు సంప్రదాయాల్లో, చూపు భవిష్యత్తుపై.", en: "Roots in tradition, eyes on the future." },
    ],
    // Poetry is intentionally identical across languages (Telugu line + EN meaning).
    te: [
      { te: "మనసులు కలిసినప్పుడు, ప్రయాణం కథగా మారుతుంది.", en: "When two hearts meet, the journey becomes a story." },
      { te: "బంధం అనేది ఇద్దరి మధ్య మాట మాత్రమే కాదు, రెండు కుటుంబాల మధ్య నమ్మకం.", en: "A bond is not only a word between two — it is trust between two families." },
      { te: "జీవితం కలిసి నడవడానికి, ముందుగా ఒకరినొకరు అర్థం చేసుకోవాలి.", en: "To walk through life together, we must first understand one another." },
      { te: "వేర్లు సంప్రదాయాల్లో, చూపు భవిష్యత్తుపై.", en: "Roots in tradition, eyes on the future." },
    ],
  },

  horoscope: {
    en: {
      title: "The Horoscope Chamber",
      gatedNote: "Horoscope details are shared privately with interested families.",
      reveal: "Request Horoscope Access",
    },
    te: {
      title: "జాతక మందిరం",
      gatedNote: "జాతక వివరాలు ఆసక్తిగల కుటుంబాలతో ప్రైవేట్‌గా పంచుకోబడతాయి.",
      reveal: "జాతక వివరాల కోసం అభ్యర్థించండి",
    },
  },

  gallery: {
    en: { title: "Twelve Frames of a Life", subtitle: "A curated wall of moments", all: "All", close: "Close", of: "of" },
    te: { title: "జీవితంలోని పన్నెండు చిత్రాలు", subtitle: "క్షణాల చిత్రమాలిక", all: "అన్నీ", close: "మూసివేయి", of: "లో" },
  },

  filmstrip: {
    en: {
      title: "Moments in Motion",
      captions: ["A Chapter in Cambridge", "Quiet Confidence", "Close to His Roots", "Open Skies", "In Celebration"],
    },
    te: {
      title: "కదలికలో క్షణాలు",
      captions: ["కేంబ్రిడ్జ్ జ్ఞాపకాలు", "ప్రశాంతమైన ఆత్మవిశ్వాసం", "మూలాలకు దగ్గరగా", "విశాలమైన ఆకాశం", "పండుగ వేళ"],
    },
  },

  contact: {
    en: {
      title: "Begin a Family Conversation",
      requestDetails: "Request Contact Details",
      contactFamily: "Contact Family",
      viewBiodata: "View Formal Biodata",
      shareProfile: "Share Profile",
      downloadBiodata: "Download Private Biodata",
      restricted: "Contact information is shared privately with interested families.",
      accessPrompt: "Enter the access code shared with you",
      accessButton: "Unlock",
      accessError: "That code didn't match. Please check with the family.",
      inquiryTitle: "Send a Family Introduction",
      formName: "Your name",
      formRelation: "Family / relation",
      formContact: "Your contact (phone or email)",
      formMessage: "A short message",
      formSubmit: "Send Introduction",
      formSuccess: "Thank you. Your introduction has been received with warmth.",
      formError: "Something went wrong. Please try again.",
    },
    te: {
      title: "కుటుంబ పరిచయానికి",
      requestDetails: "సంప్రదింపు వివరాలు అభ్యర్థించండి",
      contactFamily: "కుటుంబాన్ని సంప్రదించండి",
      viewBiodata: "బయోడేటా చూడండి",
      shareProfile: "ప్రొఫైల్ పంచుకోండి",
      downloadBiodata: "ప్రైవేట్ బయోడేటా డౌన్‌లోడ్",
      restricted: "సంప్రదింపు వివరాలు ఆసక్తిగల కుటుంబాలతో ప్రైవేట్‌గా పంచుకోబడతాయి.",
      accessPrompt: "మీకు పంచిన యాక్సెస్ కోడ్‌ను నమోదు చేయండి",
      accessButton: "తెరవండి",
      accessError: "కోడ్ సరిపోలలేదు. దయచేసి కుటుంబంతో సరిచూసుకోండి.",
      inquiryTitle: "కుటుంబ పరిచయం పంపండి",
      formName: "మీ పేరు",
      formRelation: "కుటుంబం / సంబంధం",
      formContact: "మీ సంప్రదింపు (ఫోన్ లేదా ఇమెయిల్)",
      formMessage: "చిన్న సందేశం",
      formSubmit: "పరిచయం పంపండి",
      formSuccess: "ధన్యవాదాలు. మీ పరిచయం ఆప్యాయంగా స్వీకరించబడింది.",
      formError: "ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    },
  },

  finale: {
    en: {
      line1: "Perhaps Every Beautiful Story",
      line2: "Begins with One Meaningful Introduction",
      blessing: "May the next chapter begin with happiness, understanding and blessings.",
      sanskrit: "Shubhamastu",
    },
    te: {
      line1: "బహుశా ప్రతి అందమైన కథ",
      line2: "ఒక అర్థవంతమైన పరిచయంతో మొదలవుతుంది",
      blessing: "రాబోయే అధ్యాయం సంతోషం, అవగాహన, ఆశీర్వాదాలతో మొదలవ్వాలి.",
      sanskrit: "శుభమస్తు",
    },
  },

  secret: {
    en: { lotus: "Life is a beautiful story written together.", lotusTe: "జీవితం ఇద్దరూ కలిసి రాసుకునే అందమైన కథ.", blessing: "Two hearts, two families, one beautiful future." },
    te: { lotus: "జీవితం ఇద్దరూ కలిసి రాసుకునే అందమైన కథ.", lotusTe: "జీవితం ఇద్దరూ కలిసి రాసుకునే అందమైన కథ.", blessing: "రెండు హృదయాలు, రెండు కుటుంబాలు, ఒక అందమైన భవిష్యత్తు." },
  },

  nav: {
    en: { intro: "Introduction", story: "Story", education: "Education", career: "Career", family: "Family", gallery: "Gallery", values: "Values", contact: "Contact" },
    te: { intro: "ఆరంభం", story: "కథ", education: "విద్య", career: "వృత్తి", family: "కుటుంబం", gallery: "చిత్రాలు", values: "విలువలు", contact: "సంప్రదింపు" },
  },

  ui: {
    en: { audioOn: "Ambient Experience", audioOff: "Ambient Experience", languageLabel: "Language" },
    te: { audioOn: "సంగీతం", audioOff: "సంగీతం", languageLabel: "భాష" },
  },
} as const;

export type Content = typeof content;

// Convenience accessor. Components may also read content[key][lang] directly.
export function t<K extends keyof Content>(key: K, lang: Lang) {
  return content[key][lang];
}
