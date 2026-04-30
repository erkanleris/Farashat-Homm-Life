import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';

export function WhatsAppButton() {
  const { language } = useLanguage();
  const phoneNumber = '905555555555'; // Replace with actual number
  const message = language === 'ar' 
    ? 'مرحبا، أود الاستفسار عن المنتجات'
    : 'Merhaba, ürünler hakkında bilgi almak istiyorum';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-white"
      title={t('whatsapp', language)}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
