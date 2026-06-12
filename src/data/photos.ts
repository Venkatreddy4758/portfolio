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

// 10 real photographs, each mapped to a storytelling role. Focal points are
// tuned per photo so faces are never cropped wrong.
export const photos: Photo[] = [
  { id: 1,  src: "/images/venkat/01-hero-portrait.webp", alt: "Venkat Reddy portrait", chapter: "Introduction", title: "A Portrait of Purpose", titleTelugu: "లక్ష్యంతో కూడిన వ్యక్తిత్వం", location: "Hyderabad", year: "2024", type: "hero", category: "Portraits", focalPoint: { desktop: "50% 30%", mobile: "50% 26%" } },
  { id: 2,  src: "/images/venkat/02-traditional.webp", alt: "Venkat Reddy in a vibrant shirt", chapter: "Character", title: "Colour & Ease", titleTelugu: "హాయిగా, ఉల్లాసంగా", type: "traditional", category: "Tradition", focalPoint: { desktop: "50% 22%", mobile: "50% 18%" } },
  { id: 3,  src: "/images/venkat/03-outdoor.webp", alt: "Outdoor portrait by the woods", chapter: "Roots", title: "Open Skies", titleTelugu: "విశాలమైన ఆకాశం", type: "outdoor", category: "Life", focalPoint: { desktop: "42% 30%", mobile: "42% 26%" } },
  { id: 4,  src: "/images/venkat/04-cambridge.webp", alt: "A chapter abroad in the UK", chapter: "Education", title: "A Chapter Abroad", titleTelugu: "విదేశీ జ్ఞాపకాలు", location: "United Kingdom", type: "education", category: "Education", focalPoint: { desktop: "50% 22%", mobile: "50% 18%" } },
  { id: 5,  src: "/images/venkat/05-professional.webp", alt: "Professional editorial portrait", chapter: "Career", title: "Quiet Confidence", titleTelugu: "ప్రశాంతమైన ఆత్మవిశ్వాసం", type: "professional", category: "Portraits", focalPoint: { desktop: "50% 26%", mobile: "50% 22%" } },
  { id: 6,  src: "/images/venkat/06-casual.webp", alt: "Casual lifestyle portrait", chapter: "Life", title: "At Ease", titleTelugu: "హాయిగా", type: "casual", category: "Life", focalPoint: { desktop: "50% 24%", mobile: "50% 20%" } },
  { id: 9,  src: "/images/venkat/09-travel.webp", alt: "By a Highland waterfall", chapter: "Journey", title: "Distances Travelled", titleTelugu: "ప్రయాణాలు", location: "Scotland", type: "travel", category: "Journey", focalPoint: { desktop: "36% 55%", mobile: "36% 55%" } },
  { id: 10, src: "/images/venkat/10-festival.webp", alt: "By a warm bonfire", chapter: "Culture", title: "Warmth & Good Company", titleTelugu: "ఆప్యాయత, స్నేహం", type: "festival", category: "Life", focalPoint: { desktop: "40% 38%", mobile: "40% 34%" } },
  { id: 11, src: "/images/venkat/11-candid.webp", alt: "Candid smiling portrait", chapter: "Character", title: "A Genuine Smile", titleTelugu: "నిజమైన చిరునవ్వు", type: "candid", category: "Portraits", focalPoint: { desktop: "50% 30%", mobile: "50% 26%" } },
  { id: 12, src: "/images/venkat/12-final.webp", alt: "Looking ahead", chapter: "Blessing", title: "Ready to Begin", titleTelugu: "ఆరంభానికి సిద్ధం", type: "finale", category: "Portraits", focalPoint: { desktop: "50% 24%", mobile: "50% 20%" } },
];

export const photoById = (id: number) => photos.find((p) => p.id === id);
export const photoByType = (type: string) => photos.find((p) => p.type === type);
export const categories: PhotoCategory[] = [
  "Portraits", "Tradition", "Education", "Journey", "Life",
];
