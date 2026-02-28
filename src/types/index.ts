// Core type definitions for Pixel Phonics

export type DyslexiaFont = 'OpenDyslexic' | 'Lexend' | 'ComicSans'
export type ColorOverlay = 'yellow' | 'blue' | 'green' | 'pink' | 'none'
export type DrillType = 'letters' | 'numbers' | 'words' | 'objects'
export type SkillArea = 'phonological' | 'rapid-naming'

export interface ThemePreferences {
  font: DyslexiaFont
  letterSpacing: number
  wordSpacing: number
  lineHeight: number
  backgroundColor: string
  colorOverlay: ColorOverlay
}

export interface Phoneme {
  symbol: string
  sound: string
  audioUrl: string
}

export interface Syllable {
  text: string
  phonemes: Phoneme[]
}

export interface PhoneticBreakdown {
  word: string
  syllables: Syllable[]
}

export interface PronunciationError {
  position: number
  spoken: string
  expected: string
  severity: 'minor' | 'moderate' | 'significant'
}

export interface PronunciationResult {
  accuracy: number
  spokenPhonemes: string[]
  targetPhonemes: string[]
  errors: PronunciationError[]
  feedback: string
}

export interface DrillItem {
  id: string
  stimulus: string
  imageUrl?: string
  hint?: string
  soundHint?: string
}

export interface Drill {
  id: string
  type: DrillType
  items: DrillItem[]
  targetSpeed: number
}

export interface ItemResult {
  itemId: string
  responseTime: number
  correct: boolean
}

export interface DrillResult {
  drillId: string
  averageResponseTime: number
  accuracy: number
  itemResults: ItemResult[]
}

export interface Exercise {
  id: string
  type: 'phonological' | 'speed-drill'
  difficulty: number
}

export interface ExerciseResult {
  exerciseId: string
  accuracy: number
  speed: number
  timestamp: Date
}

export interface Lesson {
  phonologicalExercises: Exercise[]
  speedDrills: Exercise[]
  estimatedDuration: number
}

export interface DataPoint {
  timestamp: Date
  value: number
}

export interface TrendData {
  current: number
  history: DataPoint[]
  trend: 'improving' | 'stable' | 'declining'
}

export interface Achievement {
  id: string
  title: string
  description: string
  unlockedAt: Date
}

export interface ProgressReport {
  phonologicalAccuracy: TrendData
  rapidNamingSpeed: TrendData
  overallProgress: number
  achievements: Achievement[]
}

export interface UserProfile {
  id: string
  name: string
  createdAt: Date
  preferences: ThemePreferences
  currentDifficulty: {
    phonological: number
    rapidNaming: number
  }
  totalExercisesCompleted: number
}

export interface WordExercise {
  id: string
  word: string
  difficulty: number
  category: string
  breakdown: PhoneticBreakdown
}

export interface PerformanceRecord {
  id: string
  userId: string
  exerciseId: string
  exerciseType: 'phonological' | 'speed-drill'
  accuracy: number
  speed: number
  timestamp: Date
  difficulty: number
}
