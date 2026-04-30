import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  nameAr: string;
  nameTr: string;
  descriptionAr: string;
  descriptionTr: string;
  price: number;
  discountPercentage: number;
  imageUrl: string;
  category: string;
}

// Mock data - will be replaced with tRPC call
const mockProducts: Product[] = [
  {
    id: 1,
    nameAr: 'كريم الوجه المرطب',
    nameTr: 'Yüz Nemlendirici Kremi',
    descriptionAr: 'كريم مرطب فاخر للوجه',
    descriptionTr: 'Yüz için lüks nemlendiricisi',
    price: 150,
    discountPercentage: 30,
    imageUrl: '/placeholder-product.jpg',
    category: 'skinCare',
  },
  {
    id: 2,
    nameAr: 'غسول الجسم',
    nameTr: 'Vücut Yıkama Jeli',
    descriptionAr: 'غسول جسم ناعم وفعال',
    descriptionTr: 'Yumuşak ve etkili vücut yıkama jeli',
    price: 80,
    discountPercentage: 20,
    imageUrl: '/placeholder-product.jpg',
    category: 'bodyCare',
  },
  {
    id: 3,
    nameAr: 'شامبو الشعر',
    nameTr: 'Şampuan',
    descriptionAr: 'شامبو طبيعي للشعر',
    descriptionTr: 'Doğal şampuan',
    price: 120,
    discountPercentage: 25,
    imageUrl: '/placeholder-product.jpg',
    category: 'hairCare',
  },
];

export default function Catalog() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'skinCare', label: t('skinCare', language) },
    { id: 'bodyCare', label: t('bodyCare', language) },
    { id: 'hairCare', label: t('hairCare', language) },
    { id: 'makeup', label: t('makeup', language) },
    { id: 'fragrance', label: t('fragrance', language) },
  ];

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.category === selectedCategory)
    : mockProducts;

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (100 - discount)) / 100;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className={`mb-12 ${isArabic ? 'text-right' : 'text-left'}`}>
          <h1 className="text-4xl font-bold mb-4">{t('catalog', language)}</h1>
          <p className="text-muted-foreground">
            {isArabic
              ? 'اكتشفي مجموعتنا الواسعة من المنتجات الفاخرة'
              : 'Discover our wide collection of luxury products'}
          </p>
        </div>

        {/* Filters */}
        <div className={`mb-12 flex gap-2 flex-wrap ${isArabic ? 'justify-end' : 'justify-start'}`}>
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
          >
            {isArabic ? 'الكل' : 'All'}
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
              const productName = isArabic ? product.nameAr : product.nameTr;
              const productDesc = isArabic ? product.descriptionAr : product.descriptionTr;

              return (
                <div
                  key={product.id}
                  className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Image Container */}
                  <div className="relative h-64 bg-muted flex items-center justify-center overflow-hidden group">
                    <div className="text-6xl group-hover:scale-110 transition-transform">💄</div>
                    {product.discountPercentage > 0 && (
                      <Badge className="absolute top-4 right-4 bg-rose-600 text-white">
                        -{product.discountPercentage}%
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{productName}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{productDesc}</p>

                    {/* Price */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                      <span className="text-2xl font-bold text-rose-600">
                        {discountedPrice.toFixed(2)} {isArabic ? 'ل.س' : '₺'}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="text-sm text-muted-foreground line-through pt-1">
                          {product.price.toFixed(2)} {isArabic ? 'ل.س' : '₺'}
                        </span>
                      )}
                    </div>

                    {/* Button */}
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white">
                      {isArabic ? 'اطلبي هلق' : 'Order Now'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t('noProducts', language)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
