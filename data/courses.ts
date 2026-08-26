import type { InstructorId } from './instructors';

export const courseConfig: any = {
  construction: {
    autocad: {
      subcategories: ['autocad-2d', 'autocad-3d'] as const,
      styles: {
        'autocad-2d': {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-300',
          icon: '📐',
        },
        'autocad-3d': {
          bg: 'bg-indigo-100',
          text: 'text-indigo-800',
          border: 'border-indigo-300',
          icon: '📏',
        },
      },
    },
    '3dsmax': {
      subcategories: ['3dsmax-modeling', '3dsmax-rendering'] as const,
      styles: {
        '3dsmax-modeling': {
          bg: 'bg-purple-100',
          text: 'text-purple-800',
          border: 'border-purple-300',
          icon: '🧊',
        },
        '3dsmax-rendering': {
          bg: 'bg-pink-100',
          text: 'text-pink-800',
          border: 'border-pink-300',
          icon: '🎨',
        },
      },
    },
  },
  programming: {
    frontend: {
      subcategories: ['frontend-react', 'frontend-vue', 'frontend-angular'] as const,
      styles: {
        'frontend-react': {
          bg: 'bg-cyan-100',
          text: 'text-cyan-800',
          border: 'border-cyan-300',
          icon: '⚛️',
        },
        'frontend-vue': {
          bg: 'bg-emerald-100',
          text: 'text-emerald-800',
          border: 'border-emerald-300',
          icon: '🟢',
        },
        'frontend-angular': {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-300',
          icon: '🔺',
        },
      },
    },
    backend: {
      subcategories: ['backend-django', 'backend-nodejs', 'backend-spring-boot'] as const,
      styles: {
        'backend-django': {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-300',
          icon: '🌿',
        },
        'backend-nodejs': {
          bg: 'bg-lime-100',
          text: 'text-lime-800',
          border: 'border-lime-300',
          icon: '🟩',
        },
        'backend-spring-boot': {
          bg: 'bg-teal-100',
          text: 'text-teal-800',
          border: 'border-teal-300',
          icon: '🍃',
        },
      },
    },
    mobile: {
      subcategories: ['mobile-react-native', 'mobile-flutter'] as const,
      styles: {
        'mobile-react-native': {
          bg: 'bg-sky-100',
          text: 'text-sky-800',
          border: 'border-sky-300',
          icon: '📱',
        },
        'mobile-flutter': {
          bg: 'bg-blue-200',
          text: 'text-blue-900',
          border: 'border-blue-400',
          icon: '🦋',
        },
      },
    },
    'data-science': {
      subcategories: ['data-science-python', 'data-science-r'] as const,
      styles: {
        'data-science-python': {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-300',
          icon: '🐍',
        },
        'data-science-r': {
          bg: 'bg-rose-100',
          text: 'text-rose-800',
          border: 'border-rose-300',
          icon: '📊',
        },
      },
    },
  },
};

export type Locale = "tm" | "ru" | "en"

export type Course = {
  id: string
  image: string
  group: "construction" | "programming"
  category: string
  subcategory: string
  title: Record<Locale, string>
  instructorId: InstructorId
  rating: string
  durationHours: number
  publicDurationSeconds: number
  level?: string;
  lessons: number
  price: number
  videoURL: string
}

export const courses: Course[] = [
  // ========================
  // --- CONSTRUCTION ---
  // ========================
  {
    id: "autocad-2d-1",
    image: "autocad-2d.png",
    group: "construction",
    category: "autocad",
    subcategory: "autocad-2d",
    title: {
      tm: "AutoCAD 2D: Dizaýn esaslary",
      ru: "AutoCAD 2D: Основы проектирования",
      en: "AutoCAD 2D: Design Basics",
    },
    instructorId: "serdar-hayydow",
    rating: "4.8",
    durationHours: 16,
    publicDurationSeconds: 360,
    lessons: 72,
    price: 550,
    videoURL: '/api/courses/autocad-2d-1/video/private',
  },
  {
    id: "autocad-3d-1",
    image: "autocad-3d.png",
    group: "construction",
    category: "autocad",
    subcategory: "autocad-3d",
    title: {
      tm: "AutoCAD 3D: Ösen modelleme",
      ru: "AutoCAD 3D: Продвинутое моделирование",
      en: "AutoCAD 3D: Advanced Modeling",
    },
    instructorId: "serdar-hayydow",
    rating: "4.9",
    durationHours: 20,
    publicDurationSeconds: 360,
    lessons: 88,
    price: 650,
    videoURL: '/api/courses/autocad-3d-1/video/private',
  },
  {
    id: "3dsmax-modeling-1",
    image: "3dsmax-model.png",
    group: "construction",
    category: "3dsmax",
    subcategory: "3dsmax-modeling",
    title: {
      tm: "3ds Max: 3D modelleme",
      ru: "3ds Max: 3D-моделирование",
      en: "3ds Max: 3D Modeling",
    },
    instructorId: "gulshat-annamyradowa",
    rating: "4.9",
    durationHours: 22,
    publicDurationSeconds: 360,
    lessons: 94,
    price: 680,
    videoURL: '/api/courses/3dsmax-modeling-1/video/private',
  },
  {
    id: "3dsmax-rendering-1",
    image: "3dsmax-render.png",
    group: "construction",
    category: "3dsmax",
    subcategory: "3dsmax-rendering",
    title: {
      tm: "3ds Max: Wizualizasiýa we render",
      ru: "3ds Max: Визуализация и рендеринг",
      en: "3ds Max: Visualization & Rendering",
    },
    instructorId: "gulshat-annamyradowa",
    rating: "4.7",
    durationHours: 18,
    publicDurationSeconds: 360,
    lessons: 80,
    price: 620,
    videoURL: '/api/courses/3dsmax-rendering-1/video/private',
  },

  // ========================
  // --- PROGRAMMING ---
  // ========================

  // ----- Frontend -----
  {
    id: "frontend-react-1",
    image: "react.png",
    group: "programming",
    category: "frontend",
    subcategory: "frontend-react",
    title: {
      tm: "React bilen Zamanew Web Ösüşi",
      ru: "Современная веб-разработка на React",
      en: "Modern Web Development with React",
    },
    instructorId: "aygul-myradowa",
    rating: "4.9",
    durationHours: 14,
    publicDurationSeconds: 360,
    lessons: 86,
    price: 450,
    videoURL: '/api/courses/frontend-react-1/video/private',
  },
  {
    id: "frontend-vue-1",
    image: "vue.png",
    group: "programming",
    category: "frontend",
    subcategory: "frontend-vue",
    title: {
      tm: "Vue.js bilen Web Ösüş",
      ru: "Веб-разработка на Vue.js",
      en: "Web Development with Vue.js",
    },
    instructorId: "aygul-myradowa",
    rating: "4.7",
    durationHours: 12,
    publicDurationSeconds: 360,
    lessons: 70,
    price: 420,
    videoURL: '/api/courses/frontend-vue-1/video/private',
  },
  {
    id: "frontend-angular-1",
    image: "angular.png",
    group: "programming",
    category: "frontend",
    subcategory: "frontend-angular",
    title: {
      tm: "Angular bilen Web Programmirleme",
      ru: "Веб-разработка на Angular",
      en: "Web Development with Angular",
    },
    instructorId: "aygul-myradowa",
    rating: "4.6",
    durationHours: 15,
    publicDurationSeconds: 360,
    lessons: 78,
    price: 480,
    videoURL: '/api/courses/frontend-angular-1/video/private',
  },

  // ----- Backend -----
  {
    id: "backend-django-1",
    image: "django.png",
    group: "programming",
    category: "backend",
    subcategory: "backend-django",
    title: {
      tm: "Django bilen Web Programmirleme",
      ru: "Веб-разработка на Django",
      en: "Web Development with Django",
    },
    instructorId: "rejep-amanow",
    rating: "4.8",
    durationHours: 20,
    publicDurationSeconds: 360,
    lessons: 90,
    price: 600,
    videoURL: '/api/courses/backend-django-1/video/private',
  },
  {
    id: "backend-nodejs-1",
    image: "nodejs.png",
    group: "programming",
    category: "backend",
    subcategory: "backend-nodejs",
    title: {
      tm: "Node.js bilen Backend Ösüş",
      ru: "Бэкенд-разработка на Node.js",
      en: "Backend Development with Node.js",
    },
    instructorId: "rejep-amanow",
    rating: "4.7",
    durationHours: 18,
    publicDurationSeconds: 360,
    lessons: 82,
    price: 560,
    videoURL: '/api/courses/backend-nodejs-1/video/private',
  },
  {
    id: "backend-spring-1",
    image: "spring.png",
    group: "programming",
    category: "backend",
    subcategory: "backend-spring-boot",
    title: {
      tm: "Spring Boot bilen Backend Ösüş",
      ru: "Бэкенд-разработка на Spring Boot",
      en: "Backend Development with Spring Boot",
    },
    instructorId: "rejep-amanow",
    rating: "4.6",
    durationHours: 22,
    publicDurationSeconds: 360,
    lessons: 96,
    price: 700,
    videoURL: '/api/courses/backend-spring-1/video/private',
  },

  // ----- Mobile -----
  {
    id: "mobile-rn-1",
    image: "rn.png",
    group: "programming",
    category: "mobile",
    subcategory: "mobile-react-native",
    title: {
      tm: "React Native bilen Mobil Programma",
      ru: "Мобильные приложения на React Native",
      en: "Mobile Apps with React Native",
    },
    instructorId: "guwanc-bayramow",
    rating: "4.8",
    durationHours: 16,
    publicDurationSeconds: 360,
    lessons: 74,
    price: 580,
    videoURL: '/api/courses/mobile-rn-1/video/private',
  },
  {
    id: "mobile-flutter-1",
    image: "flutter.png",
    group: "programming",
    category: "mobile",
    subcategory: "mobile-flutter",
    title: {
      tm: "Flutter bilen Mobil Programma",
      ru: "Мобильные приложения на Flutter",
      en: "Mobile Apps with Flutter",
    },
    instructorId: "guwanc-bayramow",
    rating: "4.6",
    durationHours: 14,
    publicDurationSeconds: 360,
    lessons: 68,
    price: 540,
    videoURL: '/api/courses/mobile-flutter-1/video/private',
  },

  // ----- Data Science -----
  {
    id: "ds-python-1",
    image: "python-ds.png",
    group: "programming",
    category: "data-science",
    subcategory: "data-science-python",
    title: {
      tm: "Python Data Ylym we Analitika",
      ru: "Наука о данных на Python",
      en: "Data Science with Python",
    },
    instructorId: "rejep-amanow",
    rating: "4.7",
    durationHours: 18,
    publicDurationSeconds: 360,
    lessons: 98,
    price: 640,
    videoURL: '/api/courses/ds-python-1/video/private',
  },
  {
    id: "ds-r-1",
    image: "r.png",
    group: "programming",
    category: "data-science",
    subcategory: "data-science-r",
    title: {
      tm: "R Programmirleme Statistika üçin",
      ru: "R программирование для статистики",
      en: "R Programming for Statistics",
    },
    instructorId: "rejep-amanow",
    rating: "4.5",
    durationHours: 16,
    publicDurationSeconds: 360,
    lessons: 72,
    price: 520,
    videoURL: '/api/courses/ds-r-1/video/private',
  },
];
