// Language translations for Arabic (Syrian Dialect) and Turkish
export type Language = 'ar' | 'tr';

export const translations = {
  ar: {
    // Navigation & Header
    home: 'الرئيسية',
    catalog: 'الكتالوج',
    categories: 'الفئات',
    contact: 'تواصل معنا',
    admin: 'لوحة التحكم',
    language: 'اللغة',
    darkMode: 'الوضع الليلي',
    lightMode: 'الوضع النهاري',
    
    // Hero Section
    heroTitle: 'فراشات هوم',
    heroSubtitle: 'جمالك هو أولويتنا',
    heroDescription: 'اكتشفي مستحضرات تجميل وعناية فاخرة من Homm Life التركية بأسعار لا تقبل المنافسة',
    shopNow: 'اطلبي هلق',
    
    // Products
    products: 'المنتجات',
    price: 'السعر',
    discount: 'الخصم',
    sale: 'عرض',
    oldPrice: 'السعر القديم',
    newPrice: 'السعر الجديد',
    addToCart: 'أضيفي للسلة',
    viewDetails: 'شوفي التفاصيل',
    
    // Categories
    skinCare: 'عناية بالبشرة',
    bodyCare: 'عناية بالجسم',
    hairCare: 'عناية بالشعر',
    makeup: 'مستحضرات تجميل',
    fragrance: 'العطور',
    
    // Footer
    about: 'عن المتجر',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
    contact_us: 'تواصل معنا',
    followUs: 'تابعينا',
    
    // Contact & Inquiry
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    message: 'الرسالة',
    send: 'أرسلي',
    whatsapp: 'تواصل عبر واتساب',
    
    // Admin
    adminPanel: 'لوحة التحكم',
    addProduct: 'إضافة منتج',
    editProduct: 'تعديل المنتج',
    deleteProduct: 'حذف المنتج',
    productName: 'اسم المنتج',
    productDescription: 'وصف المنتج',
    productPrice: 'سعر المنتج',
    productDiscount: 'نسبة الخصم %',
    productImage: 'صورة المنتج',
    category: 'الفئة',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    
    // Messages
    success: 'تم بنجاح',
    error: 'حدث خطأ',
    loading: 'جاري التحميل...',
    noProducts: 'لا توجد منتجات',
    inquirySent: 'تم إرسال استفسارك بنجاح',
  },
  tr: {
    // Navigation & Header
    home: 'Anasayfa',
    catalog: 'Katalog',
    categories: 'Kategoriler',
    contact: 'İletişim',
    admin: 'Yönetim Paneli',
    language: 'Dil',
    darkMode: 'Koyu Mod',
    lightMode: 'Açık Mod',
    
    // Hero Section
    heroTitle: 'Farashat Homm Life',
    heroSubtitle: 'Güzelliğiniz Bizim Önceliğimiz',
    heroDescription: 'Homm Life\'ın lüks güzellik ve bakım ürünlerini rekabetçi fiyatlarla keşfedin',
    shopNow: 'Şimdi Alışveriş Yap',
    
    // Products
    products: 'Ürünler',
    price: 'Fiyat',
    discount: 'İndirim',
    sale: 'İndirim',
    oldPrice: 'Eski Fiyat',
    newPrice: 'Yeni Fiyat',
    addToCart: 'Sepete Ekle',
    viewDetails: 'Detayları Gör',
    
    // Categories
    skinCare: 'Cilt Bakımı',
    bodyCare: 'Vücut Bakımı',
    hairCare: 'Saç Bakımı',
    makeup: 'Makyaj',
    fragrance: 'Parfüm',
    
    // Footer
    about: 'Hakkımızda',
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Şartları',
    contact_us: 'Bize Ulaşın',
    followUs: 'Bizi Takip Edin',
    
    // Contact & Inquiry
    name: 'Ad',
    email: 'E-posta',
    phone: 'Telefon',
    message: 'Mesaj',
    send: 'Gönder',
    whatsapp: 'WhatsApp\'ta İletişime Geç',
    
    // Admin
    adminPanel: 'Yönetim Paneli',
    addProduct: 'Ürün Ekle',
    editProduct: 'Ürünü Düzenle',
    deleteProduct: 'Ürünü Sil',
    productName: 'Ürün Adı',
    productDescription: 'Ürün Açıklaması',
    productPrice: 'Ürün Fiyatı',
    productDiscount: 'İndirim Yüzdesi %',
    productImage: 'Ürün Resmi',
    category: 'Kategori',
    save: 'Kaydet',
    cancel: 'İptal',
    delete: 'Sil',
    edit: 'Düzenle',
    
    // Messages
    success: 'Başarılı',
    error: 'Hata Oluştu',
    loading: 'Yükleniyor...',
    noProducts: 'Ürün Yok',
    inquirySent: 'Sorgunuz Başarıyla Gönderildi',
  },
};

export function t(key: keyof typeof translations.ar, lang: Language = 'ar'): string {
  const dict = translations[lang] as Record<string, string>;
  return dict[key] || key;
}

export function getDirection(lang: Language): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
