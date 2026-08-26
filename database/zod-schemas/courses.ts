import { z } from "zod";

export const courseSchema = z.object({
  image: z.string().min(5, "Surat URL doldurulmaly"),
  group: z.enum(["construction", "programming"], { error: "Group diňe 'construction' ýa-da 'programming' bolup biler" }),
  category: z.string().min(3, "Kategoriýa doldurulmaly"),
  subcategory: z.string().min(3, "Subkategoriýa doldurulmaly"),
  title: z.object({
    tm: z.string().min(1, "Türkmençe sözbaşy doldurulmaly"),
    ru: z.string().min(1, "Rusça sözbaşy doldurulmaly"),
    en: z.string().min(1, "Iňlisçe sözbaşy doldurulmaly"),
  }),
  instructorId: z.string().min(3, "Instructor ID doldurulmaly"),
  rating: z.number({ error: "Rating näsaz (mysal üçin: '4.8')" }).min(0).max(5).optional().default(0),
  durationHours: z.int().nonnegative("Sagat sany položitel san bolmaly").optional().default(0),
  startTime: z.int().nonnegative("Sekund sany položitel san bolmaly").optional().default(0),
  lessons: z.int().nonnegative("Ders sany oňyn san bolmaly").optional().default(0),
  price: z.int().nonnegative("Bahasy oňyn san bolmaly").optional().default(0),
  videoURL: z.string().min(1, "Video URL doldurulmaly"),
  publicDurationSeconds: z.int().optional().default(360),
  isHslReady: z.boolean().optional().default(false),
  level: z.string().min(3).optional()
});

export const updateCourseSchema = courseSchema.partial().omit('id');

export type CourseInput = z.infer<typeof courseSchema>;