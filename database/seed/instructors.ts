import { db } from "../"; 
import { instructors, type InstructorInsert } from "../schemas/instructors";


export async function seedInstructors() {
  console.log("🌱 Mugallymlar (Instructors) seed başlandy...");

  const instructorData = {
    'serdar-hayydow': {
      name: {
        tm: 'Serdar Haýydow',
        ru: 'Сердар Хайыдов',
        en: 'Serdar Hayydov',
      },
      profession: {
        tm: 'Inžener-dizaýner',
        ru: 'Инженер-дизайнер',
        en: 'Engineer-Designer',
      },
      avatar: '/images/instructors/serdar-hayydow.jpg',
      socials: {
        linkedin: 'https://linkedin.com/in/serdar-hayydow',
        telegram: 'https://t.me/serdar_hayydow',
      },
    },
    'gulshat-annamyradowa': {
      name: {
        tm: 'Gülşat Annamyradowa',
        ru: 'Гульшат Аннамырадова',
        en: 'Gulshat Annamyradova',
      },
      profession: {
        tm: '3D Dizaýner',
        ru: '3D-дизайнер',
        en: '3D Designer',
      },
      avatar: '/images/instructors/gulshat-annamyradowa.jpg',
      socials: {
        instagram: 'https://instagram.com/gulshat_3d',
      },
    },
    'aygul-myradowa': {
      name: {
        tm: 'Aýgül Myradowa',
        ru: 'Айгуль Мурадова',
        en: 'Aygul Myradova',
      },
      profession: {
        tm: 'Frontend Developer',
        ru: 'Frontend-разработчик',
        en: 'Frontend Developer',
      },
      avatar: '/images/instructors/aygul-myradowa.jpg',
      socials: {
        linkedin: 'https://linkedin.com/in/aygul-myradowa',
        github: 'https://github.com/aygul-dev',
      },
    },
    'guwanc-bayramow': {
      name: {
        tm: 'Guwanç Baýramow',
        ru: 'Гуванч Байрамов',
        en: 'Guvanch Bayramov',
      },
      profession: {
        tm: 'Mobil Developer',
        ru: 'Мобильный разработчик',
        en: 'Mobile Developer',
      },
      avatar: '/images/instructors/guwanc-bayramow.jpg',
      socials: {
        linkedin: 'https://linkedin.com/in/guwanc-bayramow',
      },
    },
    'rejep-amanow': {
      name: {
        tm: 'Rejep Amanow',
        ru: 'Реджеп Аманов',
        en: 'Rejep Amanov',
      },
      profession: {
        tm: 'Backend Developer',
        ru: 'Backend-разработчик',
        en: 'Backend Developer',
      },
      avatar: '/images/instructors/rejep-amanow.jpg',
      socials: {
        github: 'https://github.com/rejep-amanow',
        linkedin: 'https://linkedin.com/in/rejep-amanow',
      },
    },
    'jemal-annayeva': {
      name: {
        tm: 'Jemal Annayeva',
        ru: 'Джемал Аннаева',
        en: 'Jemal Annayeva',
      },
      profession: {
        tm: 'Data Scientist',
        ru: 'Дата-сайентист',
        en: 'Data Scientist',
      },
      avatar: '/images/instructors/jemal-annayeva.jpg',
      socials: {
        linkedin: 'https://linkedin.com/in/jemal-annayeva',
      },
    },
  };

  const recordsToInsert: InstructorInsert[] = Object.entries(instructorData).map(
    ([id, data]) => ({
      id,
      name: data.name,
      profession: data.profession,
      avatar: data.avatar,
      socials: data.socials,
    })
  );

  await db
    .insert(instructors)
    .values(recordsToInsert)
    .onConflictDoNothing();

  console.log("✅ Mugallymlar seed üstünlikli tamamlandy!");
}
