import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container py-12">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${isArabic ? 'text-right' : 'text-left'}`}>
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Farashat Homm Life</h3>
            <p className="text-sm text-muted-foreground">
              {isArabic
                ? 'متجرك الموثوق لأفضل مستحضرات التجميل والعناية من Homm Life التركية'
                : 'Your trusted store for the best beauty and care products from Turkish Homm Life'}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('about', language)}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('about', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('privacy', language)}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  {t('terms', language)}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('contact_us', language)}</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                {isArabic ? 'البريد: ' : 'Email: '}
                <a href="mailto:info@farashat.com" className="hover:text-accent transition-colors">
                  info@farashat.com
                </a>
              </li>
              <li className="text-muted-foreground">
                {isArabic ? 'الهاتف: ' : 'Phone: '}
                <a href="tel:+905555555555" className="hover:text-accent transition-colors">
                  +90 555 555 5555
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{t('followUs', language)}</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://wa.me/905555555555" className="text-muted-foreground hover:text-accent transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground`}>
          <p>
            © 2024 Farashat Homm Life. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
