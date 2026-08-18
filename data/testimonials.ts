export type Locale = 'tm' | 'ru' | 'en'

export type Testimonial = {
  quote: Record<Locale, string>
  name: Record<Locale, string>
  role: Record<Locale, string>
  avatarUrl: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    quote: {
      tm: 'Bu platforma karýeramy düýbünden özgertdi. Web ösüşi kursyny tamamlap, alty aýyň içinde ilkinji işime başladym.',
      ru: 'Эта платформа полностью изменила мою карьеру. Завершив курс по веб-разработке, я устроился на свою первую работу в течение шести месяцев.',
      en: 'This platform completely transformed my career. After completing the web development course, I got my first job within six months.',
    },
    name: {
      tm: 'Merdan Çaryýew',
      ru: 'Мердан Чарыев',
      en: 'Merdan Charyyev',
    },
    role: {
      tm: 'Frontend Dörediji',
      ru: 'Frontend-разработчик',
      en: 'Frontend Developer',
    },
    avatarUrl: '',
    color: 'bg-primary/15 text-primary',
  },
  {
    quote: {
      tm: 'Mugallymlar hakykatdan-da öz ugrunyň ussatlary. Sapaklar düşnükli, amaly we hemişe goldaw bar.',
      ru: 'Преподаватели действительно мастера своего дела. Уроки понятные, практичные, и поддержка всегда на высоте.',
      en: 'The instructors are true experts in their field. The lessons are clear, practical, and there is always support available.',
    },
    name: {
      tm: 'Aýnur Hojaýewa',
      ru: 'Айнур Ходжаева',
      en: 'Aynur Hojayewa',
    },
    role: {
      tm: 'UI/UX Dizaýner',
      ru: 'UI/UX Дизайнер',
      en: 'UI/UX Designer',
    },
    avatarUrl: '/images/students/aynur-hojayewa.jpg',
    color: 'bg-accent/15 text-accent',
  },
  {
    quote: {
      tm: 'Islän wagtym öwrenip bilýärin. Data ylym kursy meniň üçin täze mümkinçilikleriň gapysyny açdy.',
      ru: 'Я могу учиться в любое удобное время. Курс по Data Science открыл для меня новые возможности.',
      en: 'I can learn whenever I want. The Data Science course opened up whole new opportunities for me.',
    },
    name: {
      tm: 'Serdar Ataýew',
      ru: 'Сердар Атаев',
      en: 'Serdar Atayev',
    },
    role: {
      tm: 'Data Analitik',
      ru: 'Data Аналитик',
      en: 'Data Analyst',
    },
    avatarUrl: '/images/students/serdar-atayew.jpg',
    color: 'bg-chart-3/15 text-chart-3',
  },
]

export default testimonials;