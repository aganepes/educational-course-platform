import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const CONTACT_CONFIG = {
  phones: '+993 (12) 00-00-00 / +993 (65) 00-00-00',
  email: 'info@bilimmerkezi.tm',
  socialLinks: {
    tiktok: 'https://tiktok.com/@hazirki_zaman_merkezi',
    website: '#',
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1313.1006976502845!2d58.376195938551895!3d37.941520508281684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1787135145222!5m2!1sen!2s',
  courseOptions: [
    'fullstack',
    'frontend',
    '3dmax',
    'autocad',
    'graphic'
  ] as const,
  infoCardKeys: [
    { key: 'address', icon: MapPin },
    { key: 'phone', icon: Phone },
    { key: 'email', icon: Mail },
    { key: 'working_hours', icon: Clock },
  ]
}