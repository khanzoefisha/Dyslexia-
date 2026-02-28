import type { ThemePreferences, DyslexiaFont, ColorOverlay } from '../types'

// Default theme preferences optimized for dyslexia
export const DEFAULT_THEME: ThemePreferences = {
  font: 'OpenDyslexic',
  letterSpacing: 0.12, // 35% of average letter width
  wordSpacing: 0.16,
  lineHeight: 1.5, // 150% for optimal readability
  backgroundColor: '#FFFDD0', // Cream to reduce dazzle
  colorOverlay: 'none',
}

// Minimum thresholds for readability
export const MIN_LETTER_SPACING = 0.08
export const MIN_WORD_SPACING = 0.12
export const MIN_LINE_HEIGHT = 1.4

class ThemeEngine {
  private currentTheme: ThemePreferences = DEFAULT_THEME
  private previewMode: boolean = false

  /**
   * Apply dyslexia-friendly font to the document
   */
  applyFont(fontFamily: DyslexiaFont): void {
    if (this.previewMode) {
      document.documentElement.style.setProperty('--preview-font-family', this.getFontStack(fontFamily))
    } else {
      document.documentElement.style.setProperty('--font-family', this.getFontStack(fontFamily))
      this.currentTheme.font = fontFamily
    }
  }

  /**
   * Set spacing for letters, words, and lines
   */
  setSpacing(letterSpacing: number, wordSpacing: number, lineHeight: number): void {
    // Ensure minimum thresholds
    const validLetterSpacing = Math.max(letterSpacing, MIN_LETTER_SPACING)
    const validWordSpacing = Math.max(wordSpacing, MIN_WORD_SPACING)
    const validLineHeight = Math.max(lineHeight, MIN_LINE_HEIGHT)

    if (this.previewMode) {
      document.documentElement.style.setProperty('--preview-letter-spacing', `${validLetterSpacing}em`)
      document.documentElement.style.setProperty('--preview-word-spacing', `${validWordSpacing}em`)
      document.documentElement.style.setProperty('--preview-line-height', `${validLineHeight}`)
    } else {
      document.documentElement.style.setProperty('--letter-spacing', `${validLetterSpacing}em`)
      document.documentElement.style.setProperty('--word-spacing', `${validWordSpacing}em`)
      document.documentElement.style.setProperty('--line-height', `${validLineHeight}`)
      
      this.currentTheme.letterSpacing = validLetterSpacing
      this.currentTheme.wordSpacing = validWordSpacing
      this.currentTheme.lineHeight = validLineHeight
    }
  }

  /**
   * Set background color
   */
  setBackgroundColor(color: string): void {
    if (this.isValidBackgroundColor(color)) {
      if (this.previewMode) {
        document.documentElement.style.setProperty('--preview-bg-color', color)
      } else {
        document.documentElement.style.setProperty('--bg-color', color)
        this.currentTheme.backgroundColor = color
      }
    }
  }

  /**
   * Apply color overlay to text
   */
  applyColorOverlay(overlay: ColorOverlay | null): void {
    const overlayValue = overlay || 'none'
    
    if (this.previewMode) {
      document.documentElement.style.setProperty('--preview-color-overlay', this.getOverlayFilter(overlayValue))
    } else {
      document.documentElement.style.setProperty('--color-overlay', this.getOverlayFilter(overlayValue))
      this.currentTheme.colorOverlay = overlayValue
    }
  }

  /**
   * Save preferences to localStorage and optionally to backend
   */
  async savePreferences(userId: string, preferences: ThemePreferences): Promise<void> {
    try {
      // Save to localStorage
      localStorage.setItem(`theme_${userId}`, JSON.stringify(preferences))
      
      // TODO: Save to backend API when available
      // await fetch(`/api/users/${userId}/preferences`, {
      //   method: 'POST',
      //   body: JSON.stringify(preferences)
      // })
      
      this.currentTheme = preferences
    } catch (error) {
      console.error('Failed to save theme preferences:', error)
      throw error
    }
  }

  /**
   * Load preferences from localStorage or backend
   */
  async loadPreferences(userId: string): Promise<ThemePreferences> {
    try {
      // Try localStorage first
      const stored = localStorage.getItem(`theme_${userId}`)
      if (stored) {
        const preferences = JSON.parse(stored) as ThemePreferences
        this.applyTheme(preferences)
        return preferences
      }

      // TODO: Load from backend API when available
      // const response = await fetch(`/api/users/${userId}/preferences`)
      // const preferences = await response.json()
      
      // Return default theme if nothing found
      this.applyTheme(DEFAULT_THEME)
      return DEFAULT_THEME
    } catch (error) {
      console.error('Failed to load theme preferences:', error)
      this.applyTheme(DEFAULT_THEME)
      return DEFAULT_THEME
    }
  }

  /**
   * Preview settings without persisting
   */
  previewSettings(settings: ThemePreferences): void {
    this.previewMode = true
    this.applyFont(settings.font)
    this.setSpacing(settings.letterSpacing, settings.wordSpacing, settings.lineHeight)
    this.setBackgroundColor(settings.backgroundColor)
    this.applyColorOverlay(settings.colorOverlay)
  }

  /**
   * Exit preview mode and revert to current theme
   */
  exitPreview(): void {
    this.previewMode = false
    // Clear preview CSS variables
    document.documentElement.style.removeProperty('--preview-font-family')
    document.documentElement.style.removeProperty('--preview-letter-spacing')
    document.documentElement.style.removeProperty('--preview-word-spacing')
    document.documentElement.style.removeProperty('--preview-line-height')
    document.documentElement.style.removeProperty('--preview-bg-color')
    document.documentElement.style.removeProperty('--preview-color-overlay')
  }

  /**
   * Confirm preview and make it permanent
   */
  confirmPreview(): void {
    // Preview values become current values
    this.previewMode = false
    this.exitPreview()
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): ThemePreferences {
    return { ...this.currentTheme }
  }

  /**
   * Apply a complete theme
   */
  private applyTheme(theme: ThemePreferences): void {
    this.applyFont(theme.font)
    this.setSpacing(theme.letterSpacing, theme.wordSpacing, theme.lineHeight)
    this.setBackgroundColor(theme.backgroundColor)
    this.applyColorOverlay(theme.colorOverlay)
  }

  /**
   * Get font stack for a dyslexia-friendly font
   * Using humanist sans-serifs with open counters and distinct letter shapes
   */
  private getFontStack(font: DyslexiaFont): string {
    const fontStacks: Record<DyslexiaFont, string> = {
      OpenDyslexic: '"OpenDyslexic", "Verdana", "Tahoma", "Arial", sans-serif',
      Lexend: '"Lexend", "Verdana", "Tahoma", "Arial", sans-serif',
      ComicSans: '"Comic Sans MS", "Verdana", "Tahoma", sans-serif',
    }
    return fontStacks[font]
  }

  /**
   * Get CSS filter for color overlay
   */
  private getOverlayFilter(overlay: ColorOverlay): string {
    const overlayFilters: Record<ColorOverlay, string> = {
      yellow: 'sepia(0.3) saturate(1.5) hue-rotate(10deg)',
      blue: 'sepia(0.2) saturate(1.2) hue-rotate(180deg)',
      green: 'sepia(0.2) saturate(1.2) hue-rotate(80deg)',
      pink: 'sepia(0.3) saturate(1.3) hue-rotate(320deg)',
      none: 'none',
    }
    return overlayFilters[overlay]
  }

  /**
   * Validate background color for eye strain reduction
   */
  private isValidBackgroundColor(color: string): boolean {
    // For now, accept any valid CSS color
    // TODO: Add luminance and saturation validation
    return color.length > 0
  }
}

// Export singleton instance
export const themeEngine = new ThemeEngine()
