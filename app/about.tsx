import { Text } from "react-native";
import { AppHeader } from "@/components/app-header";
import { BulletList } from "@/components/bullet-list";
import { InfoCard } from "@/components/info-card";
import { ScreenShell } from "@/components/screen-shell";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function AboutScreen() {
  const colors = useThemeColors();

  return (
    <ScreenShell>
      <AppHeader title="Loyiha haqida" subtitle="Ilovaning maqsadi va pedagogik asoslari" eyebrow="Ma'lumot" />

      <InfoCard className="mb-4">
        <Text className="text-xs font-bold uppercase tracking-[2px]" style={{ color: colors.accent }}>
          Qisqa tavsif
        </Text>
        <Text className="mt-3 text-[28px] font-black leading-9" style={{ color: colors.text }}>
          Informatika ta'limi uchun interaktiv mobil platforma
        </Text>
        <Text className="mt-3 text-sm leading-7" style={{ color: colors.secondaryText }}>
          Ilova nazariy darslar, metodlar katalogi, testlar va mini o'yinlarni bitta soddalashtirilgan o'quv tajribasiga birlashtiradi.
        </Text>
      </InfoCard>

      <InfoCard className="mb-4">
        <Text className="mb-4 text-xl font-bold" style={{ color: colors.text }}>
          Ilovaning maqsadi
        </Text>
        <BulletList
          items={[
            "Informatika fanini o'qitishda innovatsion va interaktiv yondashuvlarni zamonaviy mobil formatda taqdim etish.",
            "Nazariy materiallarni test, flashcard va mini o'yinlar bilan bog'lash.",
            "Talaba va o'qituvchilar uchun taqdimotga tayyor, amaliy mobil mahsulot yaratish.",
          ]}
        />
      </InfoCard>

      <InfoCard className="mb-4">
        <Text className="mb-4 text-xl font-bold" style={{ color: colors.text }}>
          Kimlar uchun
        </Text>
        <BulletList
          items={[
            "Pedagogika va informatika yo'nalishidagi talabalar uchun.",
            "Interaktiv metodlar bilan ishlovchi o'qituvchilar uchun.",
            "Bitiruv loyihasi yoki akademik himoya uchun real mobil mahsulot kerak bo'lgan foydalanuvchilar uchun.",
          ]}
        />
      </InfoCard>

      <InfoCard className="mb-4">
        <Text className="mb-4 text-xl font-bold" style={{ color: colors.text }}>
          Nega internet talab qilinmaydi
        </Text>
        <BulletList
          items={[
            "Barcha asosiy kontent ilovaning o'zida saqlanadi.",
            "Progress, saralanganlar va sozlamalar qurilma ichida yoziladi.",
            "Login, backend, API yoki internet aloqasi talab qilinmaydi.",
          ]}
        />
      </InfoCard>

      <InfoCard>
        <Text className="mb-4 text-xl font-bold" style={{ color: colors.text }}>
          Xulosa
        </Text>
        <Text className="text-sm leading-7" style={{ color: colors.secondaryText }}>
          Ushbu ilova informatika ta'limida nazariya, interaktiv mashq, refleksiya va mobil qulaylik uyg'unlashganda
          samaradorlik oshishini ko'rsatadi. Shu sababli u o'quv jarayoni va akademik himoya uchun amaliy mahsulot sifatida xizmat qiladi.
        </Text>
      </InfoCard>
    </ScreenShell>
  );
}
