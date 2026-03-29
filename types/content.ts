import { Href } from "expo-router";

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  module: string;
  moduleTitle: string;
  moduleDescription: string;
  level: string;
  focusArea: string;
  tags: string[];
  content: string[];
  advantages: string[];
  classroomApplication: string[];
  practicalExamples: string[];
};

export type Method = {
  id: string;
  name: string;
  summary: string;
  group: string;
  groupTitle: string;
  groupDescription: string;
  level: string;
  focusArea: string;
  tags: string[];
  description: string[];
  advantages: string[];
  disadvantages: string[];
  useCase: string[];
  whenToUse: string[];
  educationalValue: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type Flashcard = {
  id: string;
  term: string;
  definition: string;
  example: string;
};

export type MatchingPair = {
  id: string;
  term: string;
  definition: string;
};

export type TrueFalseStatement = {
  id: string;
  statement: string;
  answer: boolean;
  explanation: string;
};

export type FavoriteItem = {
  id: string;
  type: "lesson" | "method";
};

export type QuizAttempt = {
  id: string;
  score: number;
  total: number;
  createdAt: string;
};

export type FeatureLink = {
  title: string;
  description: string;
  icon: string;
  href: Href;
};
