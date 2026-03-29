import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { palettes, type AppTheme } from "@/constants/theme";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import flashcards from "@/data/flashcards.json";
import lessons from "@/data/lessons.json";
import quizQuestions from "@/data/quizzes.json";
import { FavoriteItem, QuizAttempt } from "@/types/content";
import { getStoredValue, setStoredValue } from "@/utils/storage";

type AppStateContextType = {
  hydrated: boolean;
  onboardingComplete: boolean;
  theme: AppTheme;
  colors: (typeof palettes)[AppTheme];
  favorites: FavoriteItem[];
  completedLessons: string[];
  viewedFlashcards: string[];
  quizAttempts: QuizAttempt[];
  trueFalseAttempts: QuizAttempt[];
  matchBestScore: number;
  setOnboardingComplete: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  toggleFavorite: (item: FavoriteItem) => Promise<void>;
  markLessonComplete: (lessonId: string) => Promise<void>;
  markFlashcardViewed: (flashcardId: string) => Promise<void>;
  saveQuizResult: (score: number, total: number) => Promise<void>;
  saveTrueFalseResult: (score: number, total: number) => Promise<void>;
  saveMatchScore: (score: number) => Promise<void>;
  isFavorite: (type: FavoriteItem["type"], id: string) => boolean;
  highestQuizScore: number;
  overallProgress: number;
};

const AppStateContext = createContext<AppStateContextType | null>(null);

function buildAttempt(score: number, total: number): QuizAttempt {
  return {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    score,
    total,
    createdAt: new Date().toISOString()
  };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [onboardingComplete, setOnboardingValue] = useState(false);
  const [theme, setTheme] = useState<AppTheme>("light");
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [viewedFlashcards, setViewedFlashcards] = useState<string[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [trueFalseAttempts, setTrueFalseAttempts] = useState<QuizAttempt[]>([]);
  const [matchBestScore, setMatchBestScore] = useState(0);

  useEffect(() => {
    async function hydrate() {
      const [
        onboardingValue,
        themeValue,
        favoritesValue,
        completedLessonsValue,
        viewedFlashcardsValue,
        quizAttemptsValue,
        trueFalseAttemptsValue,
        matchBestScoreValue
      ] = await Promise.all([
        getStoredValue(STORAGE_KEYS.onboarding, false),
        getStoredValue<AppTheme>(STORAGE_KEYS.theme, "light"),
        getStoredValue<FavoriteItem[]>(STORAGE_KEYS.favorites, []),
        getStoredValue<string[]>(STORAGE_KEYS.completedLessons, []),
        getStoredValue<string[]>(STORAGE_KEYS.viewedFlashcards, []),
        getStoredValue<QuizAttempt[]>(STORAGE_KEYS.quizAttempts, []),
        getStoredValue<QuizAttempt[]>(STORAGE_KEYS.trueFalseAttempts, []),
        getStoredValue<number>(STORAGE_KEYS.matchBestScore, 0)
      ]);

      setOnboardingValue(onboardingValue);
      setTheme(themeValue);
      setFavorites(favoritesValue);
      setCompletedLessons(completedLessonsValue);
      setViewedFlashcards(viewedFlashcardsValue);
      setQuizAttempts(quizAttemptsValue);
      setTrueFalseAttempts(trueFalseAttemptsValue);
      setMatchBestScore(matchBestScoreValue);
      setHydrated(true);
    }

    hydrate();
  }, []);

  const highestQuizScore = useMemo(
    () => quizAttempts.reduce((best, attempt) => Math.max(best, attempt.score), 0),
    [quizAttempts]
  );

  const overallProgress = useMemo(() => {
    const lessonRatio = completedLessons.length / lessons.length;
    const flashcardRatio = viewedFlashcards.length / flashcards.length;
    const quizRatio = highestQuizScore / quizQuestions.length;
    const trueFalseRatio =
      trueFalseAttempts.length > 0
        ? Math.max(...trueFalseAttempts.map((attempt) => attempt.score / attempt.total))
        : 0;
    const matchRatio = Math.min(matchBestScore / 5, 1);

    return Math.round(((lessonRatio + flashcardRatio + quizRatio + trueFalseRatio + matchRatio) / 5) * 100);
  }, [completedLessons.length, viewedFlashcards.length, highestQuizScore, trueFalseAttempts, matchBestScore]);

  async function setOnboardingComplete() {
    setOnboardingValue(true);
    await setStoredValue(STORAGE_KEYS.onboarding, true);
  }

  async function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    await setStoredValue(STORAGE_KEYS.theme, nextTheme);
  }

  async function toggleFavorite(item: FavoriteItem) {
    const exists = favorites.some((favorite) => favorite.type === item.type && favorite.id === item.id);
    const nextFavorites = exists
      ? favorites.filter((favorite) => !(favorite.type === item.type && favorite.id === item.id))
      : [...favorites, item];

    setFavorites(nextFavorites);
    await setStoredValue(STORAGE_KEYS.favorites, nextFavorites);
  }

  async function markLessonComplete(lessonId: string) {
    if (completedLessons.includes(lessonId)) return;
    const nextLessons = [...completedLessons, lessonId];
    setCompletedLessons(nextLessons);
    await setStoredValue(STORAGE_KEYS.completedLessons, nextLessons);
  }

  async function markFlashcardViewed(flashcardId: string) {
    if (viewedFlashcards.includes(flashcardId)) return;
    const nextCards = [...viewedFlashcards, flashcardId];
    setViewedFlashcards(nextCards);
    await setStoredValue(STORAGE_KEYS.viewedFlashcards, nextCards);
  }

  async function saveQuizResult(score: number, total: number) {
    const nextAttempts = [buildAttempt(score, total), ...quizAttempts];
    setQuizAttempts(nextAttempts);
    await setStoredValue(STORAGE_KEYS.quizAttempts, nextAttempts);
  }

  async function saveTrueFalseResult(score: number, total: number) {
    const nextAttempts = [buildAttempt(score, total), ...trueFalseAttempts];
    setTrueFalseAttempts(nextAttempts);
    await setStoredValue(STORAGE_KEYS.trueFalseAttempts, nextAttempts);
  }

  async function saveMatchScore(score: number) {
    const best = Math.max(matchBestScore, score);
    setMatchBestScore(best);
    await setStoredValue(STORAGE_KEYS.matchBestScore, best);
  }

  function isFavorite(type: FavoriteItem["type"], id: string) {
    return favorites.some((favorite) => favorite.type === type && favorite.id === id);
  }

  const value = useMemo<AppStateContextType>(
    () => ({
      hydrated,
      onboardingComplete,
      theme,
      colors: palettes[theme],
      favorites,
      completedLessons,
      viewedFlashcards,
      quizAttempts,
      trueFalseAttempts,
      matchBestScore,
      setOnboardingComplete,
      toggleTheme,
      toggleFavorite,
      markLessonComplete,
      markFlashcardViewed,
      saveQuizResult,
      saveTrueFalseResult,
      saveMatchScore,
      isFavorite,
      highestQuizScore,
      overallProgress
    }),
    [
      hydrated,
      onboardingComplete,
      theme,
      favorites,
      completedLessons,
      viewedFlashcards,
      quizAttempts,
      trueFalseAttempts,
      matchBestScore,
      highestQuizScore,
      overallProgress
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
