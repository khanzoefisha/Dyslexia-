import type { PhoneticBreakdown, Syllable, Phoneme } from '../types'

// Simple phonetic dictionary for common words
// In production, this would use a comprehensive phonetic API
const PHONETIC_DICTIONARY: Record<string, PhoneticBreakdown> = {
  cat: {
    word: 'cat',
    syllables: [
      {
        text: 'cat',
        phonemes: [
          { symbol: 'c', sound: '/k/', audioUrl: 'mock-audio-k' },
          { symbol: 'a', sound: '/æ/', audioUrl: 'mock-audio-ae' },
          { symbol: 't', sound: '/t/', audioUrl: 'mock-audio-t' },
        ],
      },
    ],
  },
  dog: {
    word: 'dog',
    syllables: [
      {
        text: 'dog',
        phonemes: [
          { symbol: 'd', sound: '/d/', audioUrl: 'mock-audio-d' },
          { symbol: 'o', sound: '/ɔ/', audioUrl: 'mock-audio-o' },
          { symbol: 'g', sound: '/g/', audioUrl: 'mock-audio-g' },
        ],
      },
    ],
  },
  hello: {
    word: 'hello',
    syllables: [
      {
        text: 'hel',
        phonemes: [
          { symbol: 'h', sound: '/h/', audioUrl: 'mock-audio-h' },
          { symbol: 'e', sound: '/ɛ/', audioUrl: 'mock-audio-e' },
          { symbol: 'l', sound: '/l/', audioUrl: 'mock-audio-l' },
        ],
      },
      {
        text: 'lo',
        phonemes: [
          { symbol: 'l', sound: '/l/', audioUrl: 'mock-audio-l' },
          { symbol: 'o', sound: '/oʊ/', audioUrl: 'mock-audio-oh' },
        ],
      },
    ],
  },
  reading: {
    word: 'reading',
    syllables: [
      {
        text: 'read',
        phonemes: [
          { symbol: 'r', sound: '/r/', audioUrl: 'mock-audio-r' },
          { symbol: 'ea', sound: '/i/', audioUrl: 'mock-audio-ee' },
          { symbol: 'd', sound: '/d/', audioUrl: 'mock-audio-d' },
        ],
      },
      {
        text: 'ing',
        phonemes: [
          { symbol: 'i', sound: '/ɪ/', audioUrl: 'mock-audio-i' },
          { symbol: 'ng', sound: '/ŋ/', audioUrl: 'mock-audio-ng' },
        ],
      },
    ],
  },
  butterfly: {
    word: 'butterfly',
    syllables: [
      {
        text: 'but',
        phonemes: [
          { symbol: 'b', sound: '/b/', audioUrl: 'mock-audio-b' },
          { symbol: 'u', sound: '/ʌ/', audioUrl: 'mock-audio-u' },
          { symbol: 't', sound: '/t/', audioUrl: 'mock-audio-t' },
        ],
      },
      {
        text: 'ter',
        phonemes: [
          { symbol: 't', sound: '/t/', audioUrl: 'mock-audio-t' },
          { symbol: 'er', sound: '/ɚ/', audioUrl: 'mock-audio-er' },
        ],
      },
      {
        text: 'fly',
        phonemes: [
          { symbol: 'f', sound: '/f/', audioUrl: 'mock-audio-f' },
          { symbol: 'l', sound: '/l/', audioUrl: 'mock-audio-l' },
          { symbol: 'y', sound: '/aɪ/', audioUrl: 'mock-audio-ai' },
        ],
      },
    ],
  },
}

class PhoneticEngine {
  private speechSynthesis: SpeechSynthesis | null = null
  private currentUtterance: SpeechSynthesisUtterance | null = null

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis
    }
  }

  /**
   * Break down a word into syllables and phonemes
   */
  breakdownWord(word: string): PhoneticBreakdown {
    const normalized = word.toLowerCase().trim()
    
    // Check dictionary first
    if (PHONETIC_DICTIONARY[normalized]) {
      return PHONETIC_DICTIONARY[normalized]
    }

    // Fallback: simple syllable splitting for unknown words
    return this.simpleSyllableSplit(normalized)
  }

  /**
   * Play a single phoneme sound using Web Speech API
   */
  async playPhoneme(phoneme: string): Promise<void> {
    if (!this.speechSynthesis) {
      console.warn('Speech synthesis not available')
      return
    }

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(phoneme)
      utterance.rate = 0.7 // Slower for clarity
      utterance.pitch = 1.0
      utterance.volume = 1.0

      utterance.onend = () => resolve()
      utterance.onerror = () => resolve()

      this.speechSynthesis!.speak(utterance)
    })
  }

  /**
   * Play the entire phonetic breakdown sequence with highlighting callback
   */
  async playSequence(
    breakdown: PhoneticBreakdown,
    onHighlight: (syllableIndex: number, phonemeIndex: number) => void
  ): Promise<void> {
    if (!this.speechSynthesis) {
      console.warn('Speech synthesis not available')
      return
    }

    // First, speak the whole word
    await this.speakWord(breakdown.word)
    
    // Small pause
    await this.delay(500)

    // Then go through each syllable and phoneme
    for (let sIdx = 0; sIdx < breakdown.syllables.length; sIdx++) {
      const syllable = breakdown.syllables[sIdx]
      
      for (let pIdx = 0; pIdx < syllable.phonemes.length; pIdx++) {
        const phoneme = syllable.phonemes[pIdx]
        
        // Highlight this phoneme
        onHighlight(sIdx, pIdx)
        
        // Speak the phoneme sound
        await this.playPhoneme(phoneme.sound)
        
        // Small pause between phonemes
        await this.delay(300)
      }
      
      // Pause between syllables
      if (sIdx < breakdown.syllables.length - 1) {
        await this.delay(400)
      }
    }
  }

  /**
   * Speak a complete word
   */
  async speakWord(word: string): Promise<void> {
    if (!this.speechSynthesis) {
      console.warn('Speech synthesis not available')
      return
    }

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.rate = 0.8
      utterance.pitch = 1.0
      utterance.volume = 1.0

      utterance.onend = () => resolve()
      utterance.onerror = () => resolve()

      this.currentUtterance = utterance
      this.speechSynthesis!.speak(utterance)
    })
  }

  /**
   * Stop any currently playing speech
   */
  stop(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel()
    }
  }

  /**
   * Simple syllable splitting for unknown words
   * This is a basic implementation - production would use a proper algorithm
   */
  private simpleSyllableSplit(word: string): PhoneticBreakdown {
    const vowels = 'aeiou'
    const syllables: Syllable[] = []
    let currentSyllable = ''
    let currentPhonemes: Phoneme[] = []

    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      currentSyllable += char
      
      currentPhonemes.push({
        symbol: char,
        sound: `/${char}/`,
        audioUrl: `mock-audio-${char}`,
      })

      // Simple rule: split after vowel if next char is consonant
      const isVowel = vowels.includes(char.toLowerCase())
      const nextIsConsonant = i < word.length - 1 && !vowels.includes(word[i + 1].toLowerCase())
      
      if (isVowel && nextIsConsonant && currentSyllable.length >= 2) {
        syllables.push({
          text: currentSyllable,
          phonemes: currentPhonemes,
        })
        currentSyllable = ''
        currentPhonemes = []
      }
    }

    // Add remaining characters as final syllable
    if (currentSyllable.length > 0) {
      syllables.push({
        text: currentSyllable,
        phonemes: currentPhonemes,
      })
    }

    // Ensure at least one syllable
    if (syllables.length === 0) {
      syllables.push({
        text: word,
        phonemes: word.split('').map(char => ({
          symbol: char,
          sound: `/${char}/`,
          audioUrl: `mock-audio-${char}`,
        })),
      })
    }

    return {
      word,
      syllables,
    }
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Export singleton instance
export const phoneticEngine = new PhoneticEngine()

// Export dictionary for testing/development
export { PHONETIC_DICTIONARY }
