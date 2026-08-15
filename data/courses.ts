export type Course = {
  id: string
  image: string
  category: string
  categoryClass: string
  title: string
  instructor: string
  rating: string
  duration: string
  lessons: number
  price: string
  video: string
}

export const categories = [
  'Ählisi',
  'Programmirleme',
  'Dizaýn',
  'Marketing',
  'Data ylym',
  'Dil öwreniş',
] as const

// Free, publicly hosted sample previews
const SAMPLE_1 =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
const SAMPLE_2 =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
const SAMPLE_3 =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'

export const courses: Course[] = [
  {
    id: 'web-dev',
    image: '/images/course-web.png',
    category: 'Programmirleme',
    categoryClass: 'bg-primary/10 text-primary',
    title: 'Noldan Web Ösüşi: HTML, CSS we JavaScript',
    instructor: 'Aýgül Myradowa',
    rating: '4.9',
    duration: '14 sagat',
    lessons: 86,
    price: '450 TMT',
    video: SAMPLE_1,
  },
  {
    id: 'ui-ux',
    image: '/images/course-design.png',
    category: 'Dizaýn',
    categoryClass: 'bg-accent/10 text-accent',
    title: 'UI/UX Dizaýn: Figma bilen Professional Dizaýn',
    instructor: 'Serdar Haýydow',
    rating: '4.8',
    duration: '10 sagat',
    lessons: 64,
    price: '520 TMT',
    video: SAMPLE_2,
  },
  {
    id: 'marketing',
    image: '/images/course-marketing.png',
    category: 'Marketing',
    categoryClass: 'bg-chart-3/15 text-chart-3',
    title: 'Sanly Marketing we Sosial Media Strategiýasy',
    instructor: 'Maýa Nurýagdyýewa',
    rating: '4.9',
    duration: '8 sagat',
    lessons: 52,
    price: '390 TMT',
    video: SAMPLE_3,
  },
  {
    id: 'data-science',
    image: '/images/course-data.png',
    category: 'Data ylym',
    categoryClass: 'bg-chart-3/15 text-chart-3',
    title: 'Python bilen Data Ylym we Analitika',
    instructor: 'Rejep Amanow',
    rating: '4.7',
    duration: '18 sagat',
    lessons: 98,
    price: '640 TMT',
    video: SAMPLE_1,
  },
  {
    id: 'mobile-dev',
    image: '/images/course-mobile.png',
    category: 'Programmirleme',
    categoryClass: 'bg-primary/10 text-primary',
    title: 'React Native bilen Mobil Programma Ösüşi',
    instructor: 'Guwanç Baýramow',
    rating: '4.8',
    duration: '16 sagat',
    lessons: 74,
    price: '580 TMT',
    video: SAMPLE_2,
  },
  {
    id: 'english',
    image: '/images/course-language.png',
    category: 'Dil öwreniş',
    categoryClass: 'bg-chart-4/20 text-chart-4',
    title: 'Iňlis dili: Başlangyçdan Orta derejä çenli',
    instructor: 'Jennet Orazowa',
    rating: '4.9',
    duration: '22 sagat',
    lessons: 120,
    price: '360 TMT',
    video: SAMPLE_3,
  },
]
