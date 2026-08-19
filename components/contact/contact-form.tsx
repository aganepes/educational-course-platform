"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_CONFIG } from "@/data/contact-config";

export default function ContactForm() {
  const t = useTranslations("contact");
  
  // Form State-leri
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<string>(CONTACT_CONFIG.courseOptions[0])
  const [note, setNote] = useState('')

  // Submit Status State-leri
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = {
      fullName,
      phone,
      course: t(`form.courses.${selectedCourse}`),
      note,
    }

    try {
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1500)) 
      
      console.log('Forma Maglumatlary:', formData)
      setIsSuccess(true)

      // Formany arassalamak
      setFullName('')
      setPhone('')
      setSelectedCourse(CONTACT_CONFIG.courseOptions[0])
      setNote('')

      // 5 sekuntdan soň üstünlikli habaryny gizlemek
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('An error occurred while sending:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          {t("form.title")}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t("form.description")}
        </p>
      </div>

      {/* Üstünlikli Ugradyldy Bildirişi */}
      {isSuccess && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-xs font-medium leading-relaxed">
            {t('form.success_message')}
          </p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              {t("form.full_name_label")}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t("form.full_name_placeholder")}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              {t("form.phone_label")}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("form.phone_placeholder")}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Shadcn UI Select Komponenti */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">
            {t("form.select_course_label")}
          </label>
          <Select
            value={selectedCourse}
            onValueChange={(v) => setSelectedCourse(v?.trim() ?? "")}
          >
            <SelectTrigger className="w-full rounded-xl border-input bg-background py-5 text-sm text-foreground focus:ring-2 focus:ring-primary/50">
              <SelectValue>
                {t(`form.courses.${selectedCourse}`)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border bg-card">
              {CONTACT_CONFIG.courseOptions.map((courseKey) => (
                <SelectItem
                  key={courseKey}
                  value={courseKey}
                  className="rounded-lg text-sm cursor-pointer"
                >
                  {t(`form.courses.${courseKey}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">
            {t("form.note_label")}
          </label>
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("form.note_placeholder")}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl gap-2 py-6 text-sm font-semibold cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {t('form.submitting')}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> {t('form.submit_btn')}
            </>
          )}
        </Button>
      </form>
    </div>
  );
}