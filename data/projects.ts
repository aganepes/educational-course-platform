export interface LocalizedText {
  tm: string;
  ru: string;
  en: string;
}

export interface Project {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  fullDetails?: LocalizedText;
  studentName: string; // Talyplaryň atlary özgerşiz galýar
  category: {
    type: "3d-max" | "autocad" | "full-stack" | "frontend";
    label: LocalizedText;
  };
  skills: string[];
  imageUrl?: string;
  galleryImages?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const PROJECTS_DATA: Project[] = [
  // --- 3D MAX TASLAMALARY ---
  {
    id: "3d-1",
    title: {
      tm: "1 Komnatly Öýüň Interýer Dizaýny",
      ru: "Дизайн интерьера 1-комнатной квартиры",
      en: "Interior Design of a 1-Bedroom Apartment",
    },
    description: {
      tm: "1 komnatly ýaşaýyş öýi üçin taýýarlanan döwrebap içki mebel we ýagtylyk dizaýny.",
      ru: "Современный дизайн мебели и освещения для однокомнатной квартиры.",
      en: "Modern furniture and lighting design tailored for a 1-bedroom apartment.",
    },
    fullDetails: {
      tm: "Bu taslama 1 komnatly öýi maksimum derejede giň we amatly peýdalanmak üçin dizaýn edildi. Ýagtylyk ssenariýalary Corona Render arkaly realistik ýagdaýda taýýarlandy.",
      ru: "Проект разработан для максимально эффективного использования пространства. Сценарии освещения реалистично выполнены в Corona Render.",
      en: "Designed to maximize space efficiency and comfort. Lighting scenarios were realistically crafted using Corona Render.",
    },
    studentName: "Aky Ýagmyrow",
    category: {
      type: "3d-max",
      label: { tm: "3D Max", ru: "3D Max", en: "3D Max" },
    },
    skills: ["3D Max", "Corona Render", "Interior Design", "Photoshop"],
    imageUrl: "/projectGalleries/3dMax/1 komnat/1.jpg",
    galleryImages: ["/projectGalleries/3dMax/1 komnat/1.jpg"],
    featured: true,
  },
  {
    id: "3d-2",
    title: {
      tm: "Kottej Jaýyň Eksterýer Dizaýny",
      ru: "Дизайн экстерьера коттеджа",
      en: "Cottage Exterior Design",
    },
    description: {
      tm: "Bina fasadynyň we daşky abatlaýyş zolagynyň 3D fotorealistik rendersi.",
      ru: "3D фотореалистичный рендер фасада здания и прилегающей территории.",
      en: "3D photorealistic render of the building facade and surrounding landscape.",
    },
    fullDetails: {
      tm: "Eksterýer taslamasynda häzirki zaman binagärlik stilleri ulanyldy. Landşaft dizaýny we gije-gündiz ýagtylandyryş sistemalary aýratyn işlendi.",
      ru: "В проекте экстерьера использованы современные архитектурные стили. Ландшафтный дизайн и системы освещения проработаны отдельно.",
      en: "Modern architectural styles were applied to the exterior project. Landscape design and day/night lighting systems were developed in detail.",
    },
    studentName: "Sähet Nurakow",
    category: {
      type: "3d-max",
      label: { tm: "3D Max", ru: "3D Max", en: "3D Max" },
    },
    skills: ["3D Max", "V-Ray", "Exterior Design"],
    imageUrl: "/projectGalleries/3dMax/2 eksteryer/1.jpg",
    galleryImages: ["/projectGalleries/3dMax/2 eksteryer/1.jpg"],
    featured: true,
  },
  {
    id: "3d-3",
    title: {
      tm: "Sanuzel (Ýuwunylýan Otag) Dizaýny",
      ru: "Дизайн ванной комнаты",
      en: "Bathroom Interior Design",
    },
    description: {
      tm: "Gidroizolýasiýa we modern kafeller proýeksiýasy bilen taýýarlanan sanuzel rendersi.",
      ru: "Рендер ванной комнаты с проекцией гидроизоляции и современной плитки.",
      en: "Bathroom render featuring waterproofing layout and modern tile projections.",
    },
    fullDetails: {
      tm: "Minimalist stilindäki sanuzel dizaýny. Mebelleriň we kafel teksturalarynyň 3D modelleri takyk ölçegler boýunça ýerleşdirildi.",
      ru: "Дизайн ванной в стиле минимализм. 3D-модели мебели и текстуры плитки размещены по точным размерам.",
      en: "Minimalist style bathroom design. 3D models of furniture and tile textures placed according to precise dimensions.",
    },
    studentName: "Merjen Meredowa",
    category: {
      type: "3d-max",
      label: { tm: "3D Max", ru: "3D Max", en: "3D Max" },
    },
    skills: ["3D Max", "Corona Render", "Tile Mapping"],
    imageUrl: "/projectGalleries/3dMax/3 sanuzel/1.jpeg",
    galleryImages: [
      "/projectGalleries/3dMax/3 sanuzel/1.jpeg",
      "/projectGalleries/3dMax/3 sanuzel/2.jpeg",
      "/projectGalleries/3dMax/3 sanuzel/3.jpeg",
    ],
  },
  {
    id: "3d-4",
    title: {
      tm: "Çagalar Otagy (Detskiy 1)",
      ru: "Детская комната (Вариант 1)",
      en: "Kids Room Design (Option 1)",
    },
    description: {
      tm: "Oýun we okaw zolaklary göz öňünde tutulyp taýýarlanan çagalar otagynyň proýekti.",
      ru: "Проект детской комнаты с учетом игровых и учебных зон.",
      en: "Kids room project designed with dedicated play and study zones.",
    },
    fullDetails: {
      tm: "Çaganyň ýaş aýratynlygyna görä emosional taýdan rahatlandyryjy reňk palitralary saýlanylyp işlendi.",
      ru: "Цветовая палитра подбиралась с учетом возраста ребенка для создания комфортной атмосферы.",
      en: "Calming color palettes were carefully selected considering the child's age characteristics.",
    },
    studentName: "Dünýä Hojayewa",
    category: {
      type: "3d-max",
      label: { tm: "3D Max", ru: "3D Max", en: "3D Max" },
    },
    skills: ["3D Max", "Modeling", "Lighting"],
    imageUrl: "/projectGalleries/3dMax/4 detskiy/1.jpg",
    galleryImages: ["/projectGalleries/3dMax/4 detskiy/1.jpg"],
  },
  {
    id: "3d-5",
    title: {
      tm: "Iki Çagaly Otag Dizaýny (Detskiy 2)",
      ru: "Детская комната для двоих детей (Вариант 2)",
      en: "Shared Kids Room for Two (Option 2)",
    },
    description: {
      tm: "Dynç alş we ýatmak zolagy amatlaşdyrylan giň çagalar otagynyň 3D modeli.",
      ru: "3D-модель просторной детской с оптимизированными зонами отдыха и сна.",
      en: "3D model of a spacious kids room with optimized rest and sleep areas.",
    },
    fullDetails: {
      tm: "Iki çaganyň bilelikde ulanyp biljek funksional mebel sistemalary dizaýn edildi.",
      ru: "Разработаны функциональные мебельные системы для совместного использования двумя детьми.",
      en: "Functional furniture systems designed for shared comfortable use by two children.",
    },
    studentName: "Dünýä Hojayewa",
    category: {
      type: "3d-max",
      label: { tm: "3D Max", ru: "3D Max", en: "3D Max" },
    },
    skills: ["3D Max", "Corona Render"],
    imageUrl: "/projectGalleries/3dMax/5 detskiy 2/1.jpeg",
    galleryImages: [
      "/projectGalleries/3dMax/5 detskiy 2/1.jpeg",
      "/projectGalleries/3dMax/5 detskiy 2/2.jpeg",
      "/projectGalleries/3dMax/5 detskiy 2/3.jpeg",
      "/projectGalleries/3dMax/5 detskiy 2/4.jpeg",
    ],
  },

  // --- AUTOCAD TASLAMALARY ---
  {
    id: "cad-1",
    title: {
      tm: "Ýaşaýyş Jaýynyň Binagärlik Plany (Plan 1)",
      ru: "Архитектурный план жилого дома (План 1)",
      en: "Residential Architectural Floor Plan (Plan 1)",
    },
    description: {
      tm: "AutoCAD-da ähli standartlara laýyklykda taýýarlanan binanyň doly 2D çyzgy plan proýekti.",
      ru: "Полный 2D чертеж здания, выполненный в AutoCAD в соответствии со стандартами.",
      en: "Complete 2D floor plan project drafted in AutoCAD adhering to architectural standards.",
    },
    fullDetails: {
      tm: "Binanyň gurluşyk kadalaryna (GOST/SNiP) laýyklykda taýýarlanan binagärlik 2D çyzgylary. Gat planlary we gapy-änjek spesifikasiýalary öz içine alýar.",
      ru: "Архитектурные 2D чертежи согласно строительным нормам (ГОСТ/СНиП). Включает поэтажные планы и спецификации.",
      en: "2D architectural drawings adhering to construction standards (GOST/SNiP). Includes floor plans and schedule specifications.",
    },
    studentName: "Murod Berdiýew",
    category: {
      type: "autocad",
      label: { tm: "AutoCAD", ru: "AutoCAD", en: "AutoCAD" },
    },
    skills: ["AutoCAD 2D", "Architectural Plan", "Drafting"],
    imageUrl: "/projectGalleries/Autocad/plan1/plan 1.jpg",
    galleryImages: [
      "/projectGalleries/Autocad/plan1/plan 1.jpg",
      "/projectGalleries/Autocad/plan1/fasad 1.jpg",
      "/projectGalleries/Autocad/plan1/razrez 1.jpg",
    ],
    featured: true,
  },
  {
    id: "cad-2",
    title: {
      tm: "Gurluşyk we Fasad Plany (Plan 2)",
      ru: "Строительный план и фасад (План 2)",
      en: "Structural & Facade Drafting (Plan 2)",
    },
    description: {
      tm: "Binanyň gatlar boýunça ölçegleri we inzhenerlik kesikleri görkezilen binagärlik çyzgysy.",
      ru: "Чертеж с поэтажными размерами и инженерными разрезами здания.",
      en: "Architectural drafting showing floor dimensions and engineering cross-sections.",
    },
    fullDetails: {
      tm: "Inzhenerlik we konstruktsiýa kesikleri, fasadlaryň beýiklik belgileri görkezilen çyzgylar toplumy.",
      ru: "Комплект чертежей с инженерно-конструктивными разрезами и высотными отметками фасадов.",
      en: "A set of drawings illustrating engineering cuts, structural sections, and elevation marks.",
    },
    studentName: "Aýlar Annamyradowa",
    category: {
      type: "autocad",
      label: { tm: "AutoCAD", ru: "AutoCAD", en: "AutoCAD" },
    },
    skills: ["AutoCAD 2D", "Floor Plans", "Civil Engineering"],
    imageUrl: "/projectGalleries/Autocad/plan2/plan 2.jpg",
    galleryImages: [
      "/projectGalleries/Autocad/plan2/plan 2.jpg",
      "/projectGalleries/Autocad/plan2/fasad 2.jpg",
      "/projectGalleries/Autocad/plan2/razarez 2.jpg",
    ],
  },

  // --- WEB / PROGRAMMALAŞDYRMA TASLAMALARY ---
  {
    id: "web-1",
    title: {
      tm: "Tea Site - Çaý Dükany Platformasy",
      ru: "Tea Site - Платформа магазина чая",
      en: "Tea Site - E-Commerce Tea Store",
    },
    description: {
      tm: "E-commerce aýratynlyklary bolan häzirki zaman onlaýn çaý dükany we katalog web sahypasy.",
      ru: "Современный онлайн-магазин чая с функциями e-commerce и каталогом продукции.",
      en: "Modern online tea shop and catalog website featuring full e-commerce capabilities.",
    },
    fullDetails: {
      tm: "Next.js 14, Tailwind CSS we React Server Components ulanylyp ýazylan doly funksional web sahypa. Sebete goşmak we harytlary süzmek aýratynlyklary bar.",
      ru: "Полнофункциональный веб-сайт на Next.js 14, Tailwind CSS и React Server Components. Есть корзина и фильтрация товаров.",
      en: "Fully functional web platform built using Next.js 14, Tailwind CSS, and React Server Components. Features shopping cart and item filtering.",
    },
    studentName: "Aman Amanow",
    category: {
      type: "full-stack",
      label: { tm: "Full Stack", ru: "Full Stack", en: "Full Stack" },
    },
    skills: ["React", "Next.js", "Tailwind CSS"],
    imageUrl: "/projectGalleries/Web/The Art.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "web-2",
    title: {
      tm: "The Art - Sungat Galereýasy",
      ru: "The Art - Арт-галерея",
      en: "The Art - Online Art Gallery",
    },
    description: {
      tm: "Rassamlaryň we dizaýnerleriň işlerini görkezýän minimalist portfolio we galereýa platformasy.",
      ru: "Минималистичное портфолио и галерея для демонстрации работ художников и дизайнеров.",
      en: "Minimalist portfolio and gallery platform showcasing works of artists and designers.",
    },
    fullDetails: {
      tm: "Sünnetli animasiýalar üçin GSAP ulanyldy. Tiz işleýän we responsive aragatnaşyk dizaýny.",
      ru: "Плавные анимации реализованы с помощью GSAP. Быстродействующий и адаптивный интерфейс.",
      en: "Smooth animations implemented via GSAP. Fast-performing and fully responsive interaction design.",
    },
    studentName: "Jerren Sähetowa",
    category: {
      type: "frontend",
      label: { tm: "Frontend", ru: "Frontend", en: "Frontend" },
    },
    skills: ["Vue.js", "Tailwind CSS", "GSAP Animation"],
    imageUrl: "/projectGalleries/Web/The Art.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "web-3",
    title: {
      tm: "The Barbers - Dellekxana Bron Ulgamy",
      ru: "The Barbers - Система бронирования для барбершопа",
      en: "The Barbers - Barbershop Booking System",
    },
    description: {
      tm: "Müşderiler üçin wagt belläp sargyt etmek aýratynlygy bolan barbershop landing sahypasy.",
      ru: "Лендинг барбершопа с возможностью онлайн-записи и бронирования времени.",
      en: "Barbershop landing page featuring online appointment scheduling for clients.",
    },
    fullDetails: {
      tm: "Node.js we Prisma ORM arkaly senenama (calendar) we bron ulgamy birikdirilen web torunysy.",
      ru: "Веб-приложение с интегрированным календарем и системой бронирования на Node.js и Prisma ORM.",
      en: "Web application integrated with calendar booking logic built using Node.js and Prisma ORM.",
    },
    studentName: "Döwlet Geldiýew",
    category: {
      type: "full-stack",
      label: { tm: "Full Stack", ru: "Full Stack", en: "Full Stack" },
    },
    skills: ["Next.js", "TypeScript", "Node.js", "Prisma"],
    imageUrl: "/projectGalleries/Web/The Barbers.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export function getProjectById(id: string): Project | undefined {
  if (!id) return undefined;
  return PROJECTS_DATA.find((project) => project.id === id);
}