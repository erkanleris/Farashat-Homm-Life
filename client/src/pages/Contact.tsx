import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function Contact() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const createInquiry = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      toast.success(t('inquirySent', language));
      setFormData({ name: '', email: '', phone: '', message: '' });
    },
    onError: (error) => {
      toast.error(error.message || t('error', language));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInquiry.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      language: language as 'ar' | 'tr',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className={`max-w-2xl mx-auto ${isArabic ? 'text-right' : 'text-left'}`}>
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('contact', language)}</h1>
            <p className="text-muted-foreground">
              {isArabic
                ? 'تواصلي معنا لأي استفسار أو اقتراح'
                : 'Contact us for any questions or suggestions'}
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-md">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('name', language)} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={isArabic ? 'أدخلي اسمك' : 'Enter your name'}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('email', language)}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('phone', language)}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={isArabic ? 'رقم هاتفك' : 'Your phone number'}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('message', language)} *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder={isArabic ? 'اكتبي رسالتك هنا' : 'Write your message here'}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={createInquiry.isPending}
              className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
            >
              {createInquiry.isPending ? t('loading', language) : t('send', language)}
            </Button>
          </form>

          {/* Contact Info */}
          <div className={`mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 ${isArabic ? 'text-right' : 'text-left'}`}>
            <div>
              <h3 className="font-bold text-lg mb-2">
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </h3>
              <a href="mailto:info@farashat.com" className="text-accent hover:underline">
                info@farashat.com
              </a>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">
                {isArabic ? 'الهاتف' : 'Phone'}
              </h3>
              <a href="tel:+905555555555" className="text-accent hover:underline">
                +90 555 555 5555
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
