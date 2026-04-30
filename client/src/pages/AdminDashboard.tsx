import { useAuth } from '@/_core/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'wouter';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    nameAr: '',
    nameTr: '',
    descriptionAr: '',
    descriptionTr: '',
    price: '',
    discountPercentage: '',
    categoryId: '1',
  });

  // Fetch products
  const { data: products = [], isLoading: productsLoading } = trpc.products.list.useQuery();
  const { data: categories = [] } = trpc.categories.list.useQuery();

  // Mutations - TODO: Implement when create procedure is ready
  const handleCreateProduct = () => {
    toast.success('Feature coming soon');
  };

  // Check authorization
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {isArabic ? 'غير مصرح' : 'Unauthorized'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {isArabic
              ? 'أنتِ لا تملكين صلاحيات الوصول إلى لوحة التحكم'
              : 'You do not have permission to access the admin panel'}
          </p>
          <Link href="/">
            <a>
              <Button>{isArabic ? 'العودة للرئيسية' : 'Back to Home'}</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateProduct();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{t('adminPanel', language)}</h1>
              <p className="text-muted-foreground">
                {isArabic ? 'إدارة المنتجات والفئات' : 'Manage products and categories'}
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
            >
              <Plus className="h-4 w-4 ml-2" />
              {t('addProduct', language)}
            </Button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-md mb-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isArabic ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    name="nameAr"
                    value={formData.nameAr}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isArabic ? 'اسم المنتج (تركي)' : 'Product Name (Turkish)'}
                  </label>
                  <input
                    type="text"
                    name="nameTr"
                    value={formData.nameTr}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('productPrice', language)}
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('productDiscount', language)}
                  </label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('category', language)}
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {isArabic ? cat.nameAr : cat.nameTr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isArabic ? 'الوصف (عربي)' : 'Description (Arabic)'}
                </label>
                <textarea
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isArabic ? 'الوصف (تركي)' : 'Description (Turkish)'}
                </label>
                <textarea
                  name="descriptionTr"
                  value={formData.descriptionTr}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
                >
                  {t('save', language)}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  {t('cancel', language)}
                </Button>
              </div>
            </form>
          )}

          {/* Products Table */}
          <div className="bg-card rounded-lg shadow-md overflow-hidden">
            {productsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold text-left">
                        {isArabic ? 'المنتج' : 'Product'}
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold text-left">
                        {t('price', language)}
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold text-left">
                        {t('discount', language)}
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold text-left">
                        {isArabic ? 'الإجراءات' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: any) => (
                      <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">
                              {isArabic ? product.nameAr : product.nameTr}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {isArabic ? product.descriptionAr : product.descriptionTr}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {product.price}
                        </td>
                        <td className="px-6 py-4">
                          {product.discountPercentage}%
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('noProducts', language)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
