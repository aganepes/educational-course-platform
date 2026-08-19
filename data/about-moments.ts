export interface AboutMomentItem {
  id: string;
  image: string;
  title: {
    tm: string;
    ru: string;
    en: string;
  };
  description: {
    tm: string;
    ru: string;
  en: string;
  };
  date: string; // Ýyl ýa-da sene
  category: {
    tm: string;
    ru: string;
    en: string;
  };
}

export const ABOUT_MOMENTS: AboutMomentItem[] = [
  {
    id: "hackathon-2025",
    image: "/images/moments/hackathon.jpg",
    title: {
      tm: "Talyplar Arasynda Hackathon",
      ru: "Студенческий Хакатон",
      en: "Student Hackathon",
    },
    description: {
      tm: "Talyplarymyz 24 sagadyň dowamynda öz komandalary bilen bilelikde amaly taslamalary işläp düzdüler.",
      ru: "Наши студенты в течение 24 часов разрабатывали практические проекты в командах.",
      en: "Our students developed practical projects in teams during a 24-hour marathon.",
    },
    date: "2025",
    category: {
      tm: "Bäsleşik",
      ru: "Соревнование",
      en: "Competition",
    },
  },
  {
    id: "graduation-day",
    image: "/images/moments/graduation.jpg",
    title: {
      tm: "Sertifikat Sowgat Etmek Dabarasy",
      ru: "Церемония вручения сертификатов",
      en: "Graduation & Certificate Ceremony",
    },
    description: {
      tm: "Kursy üstünlikli tamamlan talyplarymyza halkara kysymly sertifikatlar dabaraly gowşuryldy.",
      ru: "Студентам, успешно завершившим курс, были торжественно вручены сертификаты.",
      en: "Graduates successfully completing the course were awarded international certificates.",
    },
    date: "2025",
    category: {
      tm: "Ugratmak",
      ru: "Выпускной",
      en: "Graduation",
    },
  },
  {
    id: "practical-workshop",
    image: "/images/moments/workshop.webp",
    title: {
      tm: "Amaly Tanyşdyryş Workshop-y",
      ru: "Практический Воркшоп",
      en: "Hands-on Workshop",
    },
    description: {
      tm: "Täze talyplar üçin real taslamalar we modern web arhitekturasy boýunça açyk sapak geçirildi.",
      ru: "Для новых студентов был проведен открытый урок по реальным проектам и веб-архитектуре.",
      en: "An open workshop was held for new students on real-world projects and web architecture.",
    },
    date: "2026",
    category: {
      tm: "Sapak",
      ru: "Мастер-класс",
      en: "Workshop",
    },
  },
  {
    id: "tech-meetup",
    image: "/images/moments/meetup.jpg",
    title: {
      tm: "IT Hünärmenleri Bilen Duşuşyk",
      ru: "Встреча с IT-специалистами",
      en: "IT Guest Speaker Event",
    },
    description: {
      tm: "Senagatda tejribesi bolan uly hünärmenler talyplarymyz bilen karyera maslahatlaryny paýlaşdylar.",
      ru: "Опытные специалисты индустрии поделились с нашими студентами советами по карьере.",
      en: "Senior industry experts shared career advice and insight with our students.",
    },
    date: "2026",
    category: {
      tm: "Duşuşyk",
      ru: "Встреча",
      en: "Meetup",
    },
  },
  {
    id: "team-building",
    image: "/images/moments/teambuilding.jpg",
    title: {
      tm: "Mugallymlar we Talyplar Timbildingi",
      ru: "Тимбилдинг для преподавателей и студентов",
      en: "Staff & Student Teambuilding",
    },
    description: {
      tm: "Okuwdan daşary wagtlary gyzykly geçirmek we dostlukly gurşawy berkitmek üçin meýdança gezelenci.",
      ru: "Out-of-class активности для укрепления дружеской атмосферы и неформального общения.",
      en: "Out-of-class activities to strengthen community bonds and have fun.",
    },
    date: "2026",
    category: {
      tm: "Eylence",
      ru: "Мероприятие",
      en: "Community",
    },
  },
];