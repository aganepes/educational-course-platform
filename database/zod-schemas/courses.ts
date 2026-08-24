import { z } from "zod";

export const courseSchema = z.object({
 image: z.string().min(5, "Surat URL doldurulmaly"),
  group: z.enum(["construction", "programming"],{error: "Group diňe 'construction' ýa-da 'programming' bolup biler"}),
  category: z.string().min(3, "Kategoriýa doldurulmaly"),
  subcategory: z.string().min(3, "Subkategoriýa doldurulmaly"),
  title: z.object({
    tm: z.string().min(1, "Türkmençe sözbaşy doldurulmaly"),
    ru: z.string().min(1, "Rusça sözbaşy doldurulmaly"),
    en: z.string().min(1, "Iňlisçe sözbaşy doldurulmaly"),
  }),
  instructorId: z.string().min(3, "Instructor ID doldurulmaly"),
  rating: z.number().min(0).max(5).optional().default(0),
  durationHours: z.number({ error: "Rating näsaz (mysal üçin: '4.8')" }).int().nonnegative("Sagat sany položitel san bolmaly").optional().default(0),
  lessons: z.number().int().nonnegative("Ders sany oňyn san bolmaly").optional().default(0),
  price: z.number().int().nonnegative("Bahasy oňyn san bolmaly").optional().default(0),
  video: z.string().min(1, "Video URL doldurulmaly"),
  publicDurationSeconds: z.number().int().optional().default(360),
});

export const updateCourseSchema = courseSchema.partial().omit('id');

export type CourseInput = z.infer<typeof courseSchema>;