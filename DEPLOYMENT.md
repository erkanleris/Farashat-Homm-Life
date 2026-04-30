# نشر موقع Farashat Homm Life على GitHub Pages

## المتطلبات

- حساب GitHub
- مستودع عام (Public Repository)
- Node.js 22+ و pnpm

## خطوات النشر

### 1. تفعيل GitHub Pages

1. اذهب إلى **Settings** في المستودع
2. اختر **Pages** من القائمة الجانبية
3. اختر **Source**: `GitHub Actions`
4. احفظ الإعدادات

### 2. النشر التلقائي

عند كل `push` إلى فرع `main`، سيتم تشغيل GitHub Actions تلقائياً:

```bash
# النشر يحدث تلقائياً عند:
git add .
git commit -m "تحديث الموقع"
git push origin main
```

### 3. مراقبة النشر

1. اذهب إلى **Actions** في المستودع
2. شاهد حالة الـ workflow الحالي
3. انتظر حتى ينتهي البناء والنشر (عادة 2-3 دقائق)

### 4. الوصول إلى الموقع

بعد النشر الناجح، سيكون الموقع متاحاً على:

```
https://erkanleris.github.io/Farashat-Homm-Life/
```

## الملفات المضافة

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `client/public/.nojekyll` - تعطيل معالجة Jekyll

## استكشاف الأخطاء

### الموقع لا يظهر بشكل صحيح

تأكد من:
1. أن الـ workflow انتهى بنجاح (✓ في Actions)
2. أن GitHub Pages مفعل في الإعدادات
3. أن فرع `main` محدث

### الأسلوب (CSS) لا يعمل

تأكد من أن `vite.config.ts` يحتوي على الإعدادات الصحيحة للـ base path.

## ملاحظات مهمة

- الموقع يتم نشره من مجلد `dist` بعد البناء
- كل تحديث على `main` سيؤدي إلى نشر جديد
- قد يستغرق ظهور التحديثات عدة دقائق

## الدعم

للمزيد من المعلومات، اطلع على:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
