import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe } from 'lucide-react';
import { t, type Language } from '@/lib/i18n';
import { Link } from 'wouter';

export function Header() {
  const { language, setLanguage, direction } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'tr' : 'ar');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white">
              ف
            </div>
            <span className="hidden sm:inline text-foreground">Farashat</span>
          </a>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/">
            <a className="text-sm font-medium hover:text-accent transition-colors">
              {t('home', language)}
            </a>
          </Link>
          <Link href="/catalog">
            <a className="text-sm font-medium hover:text-accent transition-colors">
              {t('catalog', language)}
            </a>
          </Link>
          <Link href="/contact">
            <a className="text-sm font-medium hover:text-accent transition-colors">
              {t('contact', language)}
            </a>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9"
            title={theme === 'dark' ? t('lightMode', language) : t('darkMode', language)}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="w-9 h-9"
            title={t('language', language)}
          >
            <Globe className="h-4 w-4" />
            <span className="ml-1 text-xs font-bold">{language.toUpperCase()}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
