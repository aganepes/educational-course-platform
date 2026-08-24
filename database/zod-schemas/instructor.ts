import { z } from "zod";

const multilingualSchema = z.object({
  tm: z.string().min(1, "Türkmençe ady/hünäri doldurulmaly"),
  ru: z.string().min(1, "Rusça ady/hünäri doldurulmaly"),
  en: z.string().min(1, "Iňlisçe ady/hünäri doldurulmaly"),
});

const socialLinksSchema = z
  .object({
    linkedin: z.string().url("Dogry URL giriziň").optional().or(z.literal("")),
    telegram: z.string().url("Dogry URL giriziň").optional().or(z.literal("")),
    instagram: z.string().url("Dogry URL giriziň").optional().or(z.literal("")),
    github: z.string().url("Dogry URL giriziň").optional().or(z.literal("")),
    youtube: z.string().url("Dogry URL giriziň").optional().or(z.literal("")),
    twitter: z.string().url("Dogry URL giriziň").optional().or(z.literal("")),
    facebook: z.string().url("Dogry URL giriziň").optional().or(z.literal("")),
  })
  .catchall(z.string().optional());

export const instructorSchema = z.object({
  id: z.string().min(1, "Instructor ID doldurulmaly"),
  name: multilingualSchema,
  profession: multilingualSchema,
  avatar: z.string().min(1, "Avatar URL/path giriziň"),
  socials: socialLinksSchema.default({}),
});

export const updateInstructorSchema = instructorSchema.partial();

export type InstructorInput = z.infer<typeof instructorSchema>;