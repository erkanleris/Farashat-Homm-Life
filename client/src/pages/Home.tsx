import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-black dark:via-slate-900 dark:to-black -z-10" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-rose-200 dark:bg-rose-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-200 dark:bg-amber-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                {t('heroTitle', language)}
              </h1>
              
              <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {t('heroSubtitle', language)}
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {t('heroDescription', language)}
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link href="/catalog">
                  <a>
                    <Button size="lg" className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white">
                      {t('shopNow', language)}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </Link>
              </div>

              {/* Features */}
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-rose-600">50%</div>
                  <p className="text-sm text-muted-foreground">{isArabic ? 'خصم حتى' : 'Discount up to'}</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">100+</div>
                  <p className="text-sm text-muted-foreground">{isArabic ? 'منتج' : 'Products'}</p>
                </div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 md:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-amber-200 dark:from-rose-900/30 dark:to-amber-900/30 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💄</div>
                  <p className="text-muted-foreground">{isArabic ? 'صورة المنتجات' : 'Product Image'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-card">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t('categories', language)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: '✨', name: 'skinCare' },
              { icon: '🧴', name: 'bodyCare' },
              { icon: '💇', name: 'hairCare' },
              { icon: '💄', name: 'makeup' },
              { icon: '🌸', name: 'fragrance' },
            ].map((cat) => (
              <Link key={cat.name} href={`/catalog?category=${cat.name}`}>
                <a>
                  <div className="p-6 rounded-xl bg-background hover:bg-accent/10 transition-colors cursor-pointer text-center group">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {t(cat.name as any, language)}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-amber-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            {isArabic ? 'جاهزة للتسوق؟' : 'Ready to Shop?'}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {isArabic
              ? 'اكتشفي مجموعتنا الواسعة من مستحضرات التجميل والعناية الفاخرة'
              : 'Discover our wide collection of luxury beauty and care products'}
          </p>
          <Link href="/catalog">
            <a>
              <Button size="lg" variant="secondary">
                {t('shopNow', language)}
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
