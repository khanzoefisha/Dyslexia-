import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import type { ThemePreferences, DyslexiaFont, ColorOverlay } from '../types'
import { themeEngine, DEFAULT_THEME } from '../services/ThemeEngine'

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    margin: 0.5rem;
    padding: 1rem;
  }
`

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-size: 1.5rem;
`

const Section = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:focus {
    border-color: var(--button-primary);
    outline: none;
  }
`

const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: var(--border-color);
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--button-primary);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--button-primary);
    cursor: pointer;
    border: none;
  }
`

const SliderValue = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
`

const ColorInput = styled.input`
  width: 100%;
  height: 50px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;

  &:focus {
    border-color: var(--button-primary);
    outline: none;
  }
`

const OverlayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
`

const OverlayButton = styled.button<{ selected: boolean; color: string }>`
  padding: 1rem;
  border: 3px solid ${props => props.selected ? 'var(--button-primary)' : 'var(--border-color)'};
  border-radius: 8px;
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.selected ? '600' : '400'};

  &:hover {
    border-color: var(--button-primary);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  background: ${props => props.variant === 'secondary' ? 'white' : 'var(--button-primary)'};
  color: ${props => props.variant === 'secondary' ? 'var(--text-primary)' : 'white'};
  border: ${props => props.variant === 'secondary' ? '2px solid var(--border-color)' : 'none'};
  cursor: pointer;

  &:hover {
    background: ${props => props.variant === 'secondary' ? '#f8f9fa' : 'var(--button-hover)'};
  }
`

const PreviewBanner = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  background: #E8F4F8;
  border-left: 4px solid var(--button-primary);
  border-radius: 4px;
  color: var(--text-primary);
`

interface ThemeCustomizerProps {
  userId: string
  onSave?: () => void
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ userId, onSave }) => {
  const [preferences, setPreferences] = useState<ThemePreferences>(DEFAULT_THEME)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load saved preferences on mount
    themeEngine.loadPreferences(userId).then(setPreferences)
  }, [userId])

  const handleFontChange = (font: DyslexiaFont) => {
    const updated = { ...preferences, font }
    setPreferences(updated)
    if (isPreviewMode) {
      themeEngine.previewSettings(updated)
    } else {
      themeEngine.applyFont(font)
    }
  }

  const handleSpacingChange = (
    type: 'letterSpacing' | 'wordSpacing' | 'lineHeight',
    value: number
  ) => {
    const updated = { ...preferences, [type]: value }
    setPreferences(updated)
    if (isPreviewMode) {
      themeEngine.previewSettings(updated)
    } else {
      themeEngine.setSpacing(
        updated.letterSpacing,
        updated.wordSpacing,
        updated.lineHeight
      )
    }
  }

  const handleColorChange = (color: string) => {
    const updated = { ...preferences, backgroundColor: color }
    setPreferences(updated)
    if (isPreviewMode) {
      themeEngine.previewSettings(updated)
    } else {
      themeEngine.setBackgroundColor(color)
    }
  }

  const handleOverlayChange = (overlay: ColorOverlay) => {
    const updated = { ...preferences, colorOverlay: overlay }
    setPreferences(updated)
    if (isPreviewMode) {
      themeEngine.previewSettings(updated)
    } else {
      themeEngine.applyColorOverlay(overlay)
    }
  }

  const handlePreview = () => {
    setIsPreviewMode(true)
    themeEngine.previewSettings(preferences)
    document.body.classList.add('preview-mode')
  }

  const handleCancelPreview = () => {
    setIsPreviewMode(false)
    themeEngine.exitPreview()
    document.body.classList.remove('preview-mode')
    // Reload saved preferences
    themeEngine.loadPreferences(userId).then(setPreferences)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await themeEngine.savePreferences(userId, preferences)
      if (isPreviewMode) {
        themeEngine.confirmPreview()
        setIsPreviewMode(false)
        document.body.classList.remove('preview-mode')
      }
      onSave?.()
    } catch (error) {
      console.error('Failed to save preferences:', error)
      alert('Failed to save preferences. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const overlayColors: { value: ColorOverlay; label: string; color: string }[] = [
    { value: 'none', label: 'None', color: 'white' },
    { value: 'yellow', label: 'Yellow', color: '#FFF9E6' },
    { value: 'blue', label: 'Blue', color: '#E6F3FF' },
    { value: 'green', label: 'Green', color: '#E6F9F0' },
    { value: 'pink', label: 'Pink', color: '#FFE6F0' },
  ]

  return (
    <Container>
      <Title>Customize Your Reading Experience</Title>

      {isPreviewMode && (
        <PreviewBanner>
          Preview Mode Active - Changes are temporary until you save
        </PreviewBanner>
      )}

      <Section>
        <Label htmlFor="font-select">Font</Label>
        <Select
          id="font-select"
          value={preferences.font}
          onChange={(e) => handleFontChange(e.target.value as DyslexiaFont)}
        >
          <option value="OpenDyslexic">OpenDyslexic</option>
          <option value="Lexend">Lexend</option>
          <option value="ComicSans">Comic Sans</option>
        </Select>
      </Section>

      <Section>
        <Label htmlFor="letter-spacing">
          Letter Spacing
          <SliderValue>{preferences.letterSpacing.toFixed(2)}em</SliderValue>
        </Label>
        <Slider
          id="letter-spacing"
          type="range"
          min="0.08"
          max="0.25"
          step="0.01"
          value={preferences.letterSpacing}
          onChange={(e) => handleSpacingChange('letterSpacing', parseFloat(e.target.value))}
        />
      </Section>

      <Section>
        <Label htmlFor="word-spacing">
          Word Spacing
          <SliderValue>{preferences.wordSpacing.toFixed(2)}em</SliderValue>
        </Label>
        <Slider
          id="word-spacing"
          type="range"
          min="0.12"
          max="0.30"
          step="0.01"
          value={preferences.wordSpacing}
          onChange={(e) => handleSpacingChange('wordSpacing', parseFloat(e.target.value))}
        />
      </Section>

      <Section>
        <Label htmlFor="line-height">
          Line Height
          <SliderValue>{preferences.lineHeight.toFixed(1)}</SliderValue>
        </Label>
        <Slider
          id="line-height"
          type="range"
          min="1.4"
          max="2.5"
          step="0.1"
          value={preferences.lineHeight}
          onChange={(e) => handleSpacingChange('lineHeight', parseFloat(e.target.value))}
        />
      </Section>

      <Section>
        <Label htmlFor="bg-color">Background Color</Label>
        <ColorInput
          id="bg-color"
          type="color"
          value={preferences.backgroundColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </Section>

      <Section>
        <Label>Color Overlay</Label>
        <OverlayGrid>
          {overlayColors.map(({ value, label, color }) => (
            <OverlayButton
              key={value}
              selected={preferences.colorOverlay === value}
              color={color}
              onClick={() => handleOverlayChange(value)}
            >
              {label}
            </OverlayButton>
          ))}
        </OverlayGrid>
      </Section>

      <ButtonGroup>
        {isPreviewMode ? (
          <>
            <Button variant="secondary" onClick={handleCancelPreview}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handlePreview}>
              Preview
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </>
        )}
      </ButtonGroup>
    </Container>
  )
}
