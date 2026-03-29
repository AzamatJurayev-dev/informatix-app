# Informatix

## 1. Loyiha haqida

`Informatix` bu Expo va React Native asosida yaratilgan, toliq offline ishlovchi mobil ta'lim ilovasi. Ilova `Informatika fanini oqitishda innovatsion va interaktiv yondashuvlar` mavzusini zamonaviy, interaktiv va himoya uchun taqdimotga tayyor formatda yoritadi.

Loyihada:
- backend yoq
- login yoki registratsiya yoq
- internet talab qilinmaydi
- barcha asosiy kontent lokal JSON fayllarda saqlanadi
- foydalanuvchi progressi `AsyncStorage` orqali qurilmada yoziladi

## 2. Asosiy maqsad

Ilovaning vazifasi oddiy matn korsatuvchi dastur qilish emas, balki:
- talaba va oqituvchilar uchun real mobil platforma hissini berish
- nazariya va interaktiv mashqni bitta mahsulotga birlashtirish
- akademik himoya yoki yakuniy loyiha uchun professional ko‘rinishdagi offline APK tayyorlash

## 3. Texnologiyalar

- Expo SDK 54
- React Native
- Expo Router
- TypeScript
- NativeWind
- AsyncStorage
- React Native Reanimated
- Expo Linear Gradient
- Lokal JSON ma'lumotlar
- EAS Build orqali Android APK

## 4. Loyiha tuzilmasi

```text
app/
  (tabs)/
    _layout.tsx
    index.tsx
    lessons.tsx
    profile.tsx
    quiz.tsx
  lesson/[id].tsx
  method/[id].tsx
  +not-found.tsx
  about.tsx
  favorites.tsx
  flashcards.tsx
  index.tsx
  match-game.tsx
  methods.tsx
  onboarding.tsx
  result.tsx
  search.tsx
  splash.tsx
  statistics.tsx
  true-false.tsx
  _layout.tsx
components/
constants/
context/
data/
hooks/
types/
utils/
assets/
```

## 5. Ekranlar

- `Splash` ekran
- `Onboarding` ekranlari
- `Home` bosh sahifa
- `Lessons` nazariy darslar
- `Lesson Detail`
- `Methods` katalogi
- `Method Detail`
- `Quiz`
- `Flashcards`
- `Matching Game`
- `True / False`
- `Search`
- `Favorites`
- `Statistics`
- `Profile`
- `About`
- `Result`

## 6. Lokal kontent fayllari

Kontent quyidagi JSON fayllarda saqlanadi:

- `data/lessons.json`
- `data/methods.json`
- `data/quizzes.json`
- `data/flashcards.json`
- `data/games.json`

## 7. AsyncStorage orqali saqlanadigan malumotlar

- onboarding tugallangan holati
- tanlangan mavzu rejimi
- saralangan dars va metodlar
- tugallangan darslar
- korilgan flashcardlar
- test natijalari
- true/false natijalari
- matching oyinidagi eng yaxshi natija

## 8. Muhim implementatsiya fayllari

- `app/_layout.tsx`
- `context/app-context.tsx`
- `app/(tabs)/index.tsx`
- `app/(tabs)/quiz.tsx`
- `app/lesson/[id].tsx`
- `app/method/[id].tsx`
- `components/app-header.tsx`
- `components/theme-toggle.tsx`

## 9. Ishga tushirish

```bash
npm install
npm run start
```

Android preview:

```bash
npm run android
```

Cache ni tozalab ishga tushirish tavsiya qilinadi:

```bash
npm run start -- --clear
```

## 10. APK build

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

Production APK uchun:

```bash
eas build --platform android --profile production
```

## 11. Himoya uchun tayyor checklist

- `npm run typecheck` bajarilgan bo‘lishi kerak
- onboarding, lessons, methods, quiz, flashcards, search va statistics sinovdan otgan bo‘lishi kerak
- dark va light rejim tekshirilgan bo‘lishi kerak
- AsyncStorage orqali progress saqlanishi tekshirilgan bo‘lishi kerak
- icon va splash assetlar togri chiqishi tekshirilgan bo‘lishi kerak
- internet uzilgan holatda ham ilova ishlashi tekshirilgan bo‘lishi kerak

## 12. Yakuniy eslatma

Bu loyiha:
- toliq offline-first
- taqdimot uchun mos
- Android APK uchun tayyor
- backend va autentifikatsiyasiz
- oson kengaytiriladigan tuzilishga ega
