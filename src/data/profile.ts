// ─────────────────────────────────────────────────────────────────────────────
// CENTRAL PERSONAL DATA — edit values here; the whole site updates.
// `age` is NOT shown directly in the UI; use getAge(dateOfBirth) from lib/getAge.
// ─────────────────────────────────────────────────────────────────────────────
export const profile = {
  fullName: "Venkat Reddy Regulapally",
  displayName: "Venkat Reddy",
  teluguName: "వెంకట్ రెడ్డి రెగ్యులపల్లి",
  nickname: "Chintu",

  dateOfBirth: "6 October 1998",
  // ISO form used by getAge() — keep in sync with dateOfBirth above.
  dateOfBirthISO: "1998-10-06",
  birthTime: "12:00 AM",
  birthplace: "Siddipet, Telangana",
  height: "5 ft 11 in",
  weight: "74 kg",

  religion: "Hindu",
  caste: "Reddy",
  subCaste: "Motati",
  motherTongue: "Telugu",
  languagesKnown: ["Telugu", "English", "Hindi"],
  diet: "Vegetarian",

  // ── Jathakam / horoscope (privacy-gated). FILL with accurate values; ──
  // ── leave a field as "" to hide it automatically. Do NOT guess these.  ──
  jathakam: {
    gotram: "",
    rasi: "",
    nakshatram: "",
    padam: "",
    lagnam: "",
    kujaDosham: "",
  },

  education: {
    masters:
      "Master's in International Business Management, Anglia Ruskin University, Cambridge, United Kingdom",
    bachelors: "Bachelor's Degree, Wesley Degree College, Hyderabad",
    school: "Vikas High School, Siddipet",
  },

  profession: {
    title: "Software Tester",
    company: "Genpact",
    income: "₹10 LPA",
    location: "Hyderabad",
    workMode: "Work from Home",
  },

  family: {
    grandfather: "Malla Reddy",
    father: { name: "Papi Reddy", occupation: "Farmer" },
    mother: { name: "Laxmi", occupation: "Homemaker" },
    siblings: [
      {
        name: "Manasa Reddy",
        relation: "Sister",
        maritalStatus: "Married",
        profession: "Java Developer",
      },
    ],
    nativePlace: "Kistapur, Chinnakodur Mandal, Siddipet, Telangana",
  },

  interests: ["Travel", "Cricket", "Music", "Food"],

  social: { instagram: "son_of_reddy" },
} as const;

export type Profile = typeof profile;
