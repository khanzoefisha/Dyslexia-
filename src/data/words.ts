import type { WordExercise } from '../types'
import { phoneticEngine } from '../services/PhoneticEngine'

// Mock word library organized by difficulty (1-10)
export const WORD_LIBRARY: WordExercise[] = [
  // Difficulty 1-2: Simple 3-letter words
  {
    id: 'word-1',
    word: 'cat',
    difficulty: 1,
    category: 'animals',
    breakdown: phoneticEngine.breakdownWord('cat'),
  },
  {
    id: 'word-2',
    word: 'dog',
    difficulty: 1,
    category: 'animals',
    breakdown: phoneticEngine.breakdownWord('dog'),
  },
  {
    id: 'word-3',
    word: 'sun',
    difficulty: 1,
    category: 'nature',
    breakdown: phoneticEngine.breakdownWord('sun'),
  },
  {
    id: 'word-4',
    word: 'hat',
    difficulty: 1,
    category: 'objects',
    breakdown: phoneticEngine.breakdownWord('hat'),
  },
  {
    id: 'word-5',
    word: 'pen',
    difficulty: 1,
    category: 'objects',
    breakdown: phoneticEngine.breakdownWord('pen'),
  },

  // Difficulty 3-4: Simple 4-5 letter words
  {
    id: 'word-6',
    word: 'book',
    difficulty: 3,
    category: 'objects',
    breakdown: phoneticEngine.breakdownWord('book'),
  },
  {
    id: 'word-7',
    word: 'tree',
    difficulty: 3,
    category: 'nature',
    breakdown: phoneticEngine.breakdownWord('tree'),
  },
  {
    id: 'word-8',
    word: 'fish',
    difficulty: 3,
    category: 'animals',
    breakdown: phoneticEngine.breakdownWord('fish'),
  },
  {
    id: 'word-9',
    word: 'bird',
    difficulty: 3,
    category: 'animals',
    breakdown: phoneticEngine.breakdownWord('bird'),
  },
  {
    id: 'word-10',
    word: 'moon',
    difficulty: 3,
    category: 'nature',
    breakdown: phoneticEngine.breakdownWord('moon'),
  },

  // Difficulty 5-6: Two-syllable words
  {
    id: 'word-11',
    word: 'hello',
    difficulty: 5,
    category: 'common',
    breakdown: phoneticEngine.breakdownWord('hello'),
  },
  {
    id: 'word-12',
    word: 'happy',
    difficulty: 5,
    category: 'emotions',
    breakdown: phoneticEngine.breakdownWord('happy'),
  },
  {
    id: 'word-13',
    word: 'water',
    difficulty: 5,
    category: 'nature',
    breakdown: phoneticEngine.breakdownWord('water'),
  },
  {
    id: 'word-14',
    word: 'garden',
    difficulty: 5,
    category: 'nature',
    breakdown: phoneticEngine.breakdownWord('garden'),
  },
  {
    id: 'word-15',
    word: 'rabbit',
    difficulty: 5,
    category: 'animals',
    breakdown: phoneticEngine.breakdownWord('rabbit'),
  },

  // Difficulty 7-8: Complex two-syllable and three-syllable words
  {
    id: 'word-16',
    word: 'reading',
    difficulty: 7,
    category: 'activities',
    breakdown: phoneticEngine.breakdownWord('reading'),
  },
  {
    id: 'word-17',
    word: 'elephant',
    difficulty: 7,
    category: 'animals',
    breakdown: phoneticEngine.breakdownWord('elephant'),
  },
  {
    id: 'word-18',
    word: 'beautiful',
    difficulty: 7,
    category: 'descriptive',
    breakdown: phoneticEngine.breakdownWord('beautiful'),
  },
  {
    id: 'word-19',
    word: 'butterfly',
    difficulty: 7,
    category: 'animals',
    breakdown: phoneticEngine.breakdownWord('butterfly'),
  },
  {
    id: 'word-20',
    word: 'computer',
    difficulty: 7,
    category: 'technology',
    breakdown: phoneticEngine.breakdownWord('computer'),
  },

  // Difficulty 9-10: Advanced multi-syllable words
  {
    id: 'word-21',
    word: 'wonderful',
    difficulty: 9,
    category: 'descriptive',
    breakdown: phoneticEngine.breakdownWord('wonderful'),
  },
  {
    id: 'word-22',
    word: 'adventure',
    difficulty: 9,
    category: 'activities',
    breakdown: phoneticEngine.breakdownWord('adventure'),
  },
  {
    id: 'word-23',
    word: 'imagination',
    difficulty: 10,
    category: 'abstract',
    breakdown: phoneticEngine.breakdownWord('imagination'),
  },
  {
    id: 'word-24',
    word: 'celebration',
    difficulty: 10,
    category: 'activities',
    breakdown: phoneticEngine.breakdownWord('celebration'),
  },
  {
    id: 'word-25',
    word: 'understanding',
    difficulty: 10,
    category: 'abstract',
    breakdown: phoneticEngine.breakdownWord('understanding'),
  },
]

/**
 * Get words by difficulty level
 */
export function getWordsByDifficulty(difficulty: number): WordExercise[] {
  return WORD_LIBRARY.filter(word => word.difficulty === difficulty)
}

/**
 * Get words by category
 */
export function getWordsByCategory(category: string): WordExercise[] {
  return WORD_LIBRARY.filter(word => word.category === category)
}

/**
 * Get a random word at a specific difficulty
 */
export function getRandomWord(difficulty: number): WordExercise | null {
  const words = getWordsByDifficulty(difficulty)
  if (words.length === 0) return null
  return words[Math.floor(Math.random() * words.length)]
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(WORD_LIBRARY.map(word => word.category)))
}
