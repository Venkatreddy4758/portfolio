export type PhotoCategory =
  | "Portraits"
  | "Tradition"
  | "Family"
  | "Education"
  | "Journey"
  | "Life";

export type Photo = {
  id: number;
  src: string;
  mobileSrc?: string;
  alt: string;
  chapter: string;
  title: string;
  titleTelugu: string;
  location?: string;
  year?: string;
  type: string;
  category: PhotoCategory;
  focalPoint: { desktop: string; mobile: string };
};

export const photos: Photo[] = [
  { id: 1,  src: "/images/venkat/01-hero-portrait.webp", mobileSrc: "/images/venkat/01-hero-portrait-mobile.webp", alt: "Venkat Reddy formal portrait", chapter: "Introduction", title: "A Portrait of Purpose", titleTelugu: "లక్ష్యంతో కూడిన వ్యక్తిత్వం", location: "Hyderabad", year: "2026", type: "hero", category: "Portraits", focalPoint: { desktop: "50% 25%", mobile: "50% 20%" } },
  { id: 2,  src: "/images/venkat/02-traditional.webp", alt: "Venkat Reddy in traditional attire", chapter: "Heritage", title: "Rooted in Tradition", titleTelugu: "సంప్రదాయాల్లో వేర్లు", type: "traditional", category: "Tradition", focalPoint: { desktop: "50% 30%", mobile: "50% 25%" } },
  { id: 3,  src: "/images/venkat/03-outdoor.webp", alt: "Natural outdoor portrait", chapter: "Roots", title: "Open Skies", titleTelugu: "విశాలమైన ఆకాశం", type: "outdoor", category: "Life", focalPoint: { desktop: "50% 30%", mobile: "50% 25%" } },
  { id: 4,  src: "/images/venkat/04-cambridge.webp", alt: "Cambridge / UK memory", chapter: "Education", title: "A Chapter Abroad", titleTelugu: "కేంబ్రిడ్జ్ జ్ఞాపకాలు", location: "Cambridge, UK", type: "education", category: "Education", focalPoint: { desktop: "50% 30%", mobile: "50% 25%" } },
  { id: 5,  src: "/images/venkat/05-professional.webp", alt: "Professional portrait", chapter: "Career", title: "Quiet Confidence", titleTelugu: "ప్రశాంతమైన ఆత్మవిశ్వాసం", type: "professional", category: "Portraits", focalPoint: { desktop: "50% 25%", mobile: "50% 20%" } },
  { id: 6,  src: "/images/venkat/06-casual.webp", alt: "Casual lifestyle portrait", chapter: "Life", title: "At Ease", titleTelugu: "హాయిగా", type: "casual", category: "Life", focalPoint: { desktop: "50% 30%", mobile: "50% 25%" } },
  { id: 7,  src: "/images/venkat/07-family.webp", alt: "Family photograph", chapter: "Family", title: "The Ones Who Shaped Him", titleTelugu: "తీర్చిదిద్దిన కుటుంబం", type: "family", category: "Family", focalPoint: { desktop: "50% 30%", mobile: "50% 30%" } },
  { id: 8,  src: "/images/venkat/08-native.webp", alt: "Native place / agricultural background", chapter: "Roots", title: "Where It Began", titleTelugu: "మొదలైన చోటు", location: "Kistapur, Siddipet", type: "native", category: "Journey", focalPoint: { desktop: "50% 40%", mobile: "50% 35%" } },
  { id: 9,  src: "/images/venkat/09-travel.webp", alt: "Travel photograph", chapter: "Journey", title: "Distances Travelled", titleTelugu: "ప్రయాణాలు", type: "travel", category: "Journey", focalPoint: { desktop: "50% 30%", mobile: "50% 25%" } },
  { id: 10, src: "/images/venkat/10-festival.webp", alt: "Festival / cultural photograph", chapter: "Culture", title: "In Celebration", titleTelugu: "పండుగ వేళ", type: "festival", category: "Tradition", focalPoint: { desktop: "50% 30%", mobile: "50% 25%" } },
  { id: 11, src: "/images/venkat/11-candid.webp", alt: "Candid smiling portrait", chapter: "Character", title: "A Genuine Smile", titleTelugu: "నిజమైన చిరునవ్వు", type: "candid", category: "Portraits", focalPoint: { desktop: "50% 25%", mobile: "50% 20%" } },
  { id: 12, src: "/images/venkat/12-final.webp", alt: "Grand final portrait", chapter: "Blessing", title: "Ready to Begin", titleTelugu: "ఆరంభానికి సిద్ధం", type: "finale", category: "Portraits", focalPoint: { desktop: "50% 25%", mobile: "50% 20%" } },
];

export const photoById = (id: number) => photos.find((p) => p.id === id);
export const photoByType = (type: string) => photos.find((p) => p.type === type);
export const categories: PhotoCategory[] = [
  "Portraits", "Tradition", "Family", "Education", "Journey", "Life",
];
