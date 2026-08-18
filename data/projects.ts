export interface Project {
  id: string;
  title: string;
  description: string;
  fullDetails?: string;
  studentName: string;
  category: "3D Max" | "AutoCAD" | "Full Stack" | "Frontend";
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
    title: "1 Komnatly Öýüň Interýer Dizaýny",
    description:
      "1 komnatly ýaşaýyş öýi üçin taýýarlanan döwrebap içki mebel we ýagtylyk dizaýny.",
    fullDetails:
      "Bu taslama 1 komnatly öýi maksimum derejede giň we amatly peydalanmak üçin dizaýn edildi. Ýagtylyk ssenariýalary Corona Render arkaly realistik ýagdaýda taýýarlandy.",
    studentName: "Aky Ýagmyrow",
    category: "3D Max",
    skills: ["3D Max", "Corona Render", "Interior Design", "Photoshop"],
    imageUrl: "/projectGalleries/3dMax/1 komnat/1.jpg",
    galleryImages: ["/projectGalleries/3dMax/1 komnat/1.jpg"],
    featured: true,
  },
  {
    id: "3d-2",
    title: "Kottej Jaýyň Eksteryer Dizaýny",
    description:
      "Bina fasadynyň we daşky abatlaýyş zolagynyň 3D fotorealistik rendersi.",
    fullDetails:
      "Eksterýer taslamasynda häzirki zaman binagärlik stilleri ulanyldy. Landşaft dizaýny we gije-gündiz ýagtylandyryş sistemalary aýratyn işlendi.",
    studentName: "Sähet Nurakow",
    category: "3D Max",
    skills: ["3D Max", "V-Ray", "Exterior Design"],
    imageUrl: "/projectGalleries/3dMax/2 eksteryer/1.jpg",
    galleryImages: ["/projectGalleries/3dMax/2 eksteryer/1.jpg"],
    featured: true,
  },
  {
    id: "3d-3",
    title: "Sanuzel (Ýuwunylýan Otag) Dizaýny",
    description:
      "Gidroizolýasiýa we modern kafeller proýeksiýasy bilen taýýarlanan sanuzel rendersi.",
    fullDetails:
      "Minimalist stilindäki sanuzel dizaýny. Mebelleriň we kafel teksturalarynyň 3D modelleri takyk ölçegler boýunça ýerleşdirildi.",
    studentName: "Merjen Meredowa",
    category: "3D Max",
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
    title: "Çagalar Otagy (Detskiy 1)",
    description:
      "Oýun we okaw zolaklary göz öňünde tutulyp taýýarlanan çagalar otagynyň proýekti.",
    fullDetails:
      "Çaganyň ýaş aýratynlygyna görä emosional taýdan rahatlandyryjy reňk palitralary saýlanylyp işlendi.",
    studentName: "Dünýä Hojayewa",
    category: "3D Max",
    skills: ["3D Max", "Modeling", "Lighting"],
    imageUrl: "/projectGalleries/3dMax/4 detskiy/1.jpg",
    galleryImages: ["/projectGalleries/3dMax/4 detskiy/1.jpg"],
  },
  {
    id: "3d-5",
    title: "Iki Çagaly Otag Dizaýny (Detskiy 2)",
    description:
      "Eremek we ýatmak zology amatlaşdyrylan giň çagalar otagynyň 3D modeli.",
    fullDetails:
      "Iki çaganyň bilelikde ulanyp biljek funksional mebel sistemalary dizaýn edildi.",
    studentName: "Dünýä Hojayewa",
    category: "3D Max",
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
    title: "Ýaşaýyş Jaýynyň Binagärlik Plany (Plan 1)",
    description:
      "AutoCAD-da ähli standartlara laýyklykda taýýarlanan binanyň doly 2D çyzgy plan proýekti.",
    fullDetails:
      "Binanyň gurluşyk kadalaryna (GOST/SNiP) laýyklykda taýýarlanan binagärlik 2D çyzgylary. Gat planlary we gapy-änjek spesiikasiýalary öz içine alýar.",
    studentName: "Murod Berdiýew",
    category: "AutoCAD",
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
    title: "Gurluşyk we Fasad Plany (Plan 2)",
    description:
      "Binanyň gatlar boýunça ölçegleri we inzhenerlik kesikleri görkezilen binagärlik çyzgysy.",
    fullDetails:
      "Inzhenerlik we konstruktsiýa kesikleri, fasadlaryň beýiklik belgileri görkezilen çyzgylar toplumy.",
    studentName: "Aýlar Annamyradowa",
    category: "AutoCAD",
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
    title: "Tea Site - Çaý Dükany Platformasy",
    description:
      "E-commerce aýratynlyklary bolan häzirki zaman onlaýn çaý dükany we katalog web sahypasy.",
    fullDetails:
      "Next.js 14, Tailwind CSS we React Server Components ulanylyp ýazylan doly funksional web sahypa. Sebete goşmak we harytlary süzmek aýratynlyklary bar.",
    studentName: "Aman Amanow",
    category: "Full Stack",
    skills: ["React", "Next.js", "Tailwind CSS"],
    imageUrl: "/projectGalleries/Web/The Art.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "web-2",
    title: "The Art - Sungat Galereýasy",
    description:
      "Rassamlaryň we dizaýnerleriň işlerini görkezýän minimalist portfolio we galereýa platformasy.",
    fullDetails:
      "Sünnetli animasiýalar üçin GSAP ulanyldy. Tiz işleýän we responsive aragatnaşyk dizaýny.",
    studentName: "Jerren Sähetowa",
    category: "Frontend",
    skills: ["Vue.js", "Tailwind CSS", "GSAP Animation"],
    imageUrl: "/projectGalleries/Web/The Art.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "web-3",
    title: "The Barbers - Dellekxana Bron Ulgamy",
    description:
      "Müşderiler üçin wagt belläp sarğyt etmek aýratynlygy bolan barbershop landing sahypasy.",
    fullDetails:
      "Node.js we Prisma ORM arkaly senenama (calendar) we bron ulgamy birikdirilen web torkunysy.",
    studentName: "Döwlet Geldiýew",
    category: "Full Stack",
    skills: ["Next.js", "TypeScript", "Node.js", "Prisma"],
    imageUrl: "/projectGalleries/Web/The Barbers.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];
