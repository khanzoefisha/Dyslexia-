import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { themeEngine } from '../services/ThemeEngine'
import type { ColorOverlay } from '../types'

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`

const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: #333333;
  font-size: 1.8rem;
  font-weight: 700;
`

const Subtitle = styled.p`
  color: #555555;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`

const ToggleSection = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const ToggleInfo = styled.div`
  flex: 1;
  min-width: 200px;
`

const ToggleTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const ToggleDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.5;
`

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 40px;
  cursor: pointer;
`

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #4CAF50;
  }

  &:checked + span:before {
    transform: translateX(40px);
  }
`

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 40px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 32px;
    width: 32px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`

const PresetsSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h3`
  color: #333333;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`

const PresetCard = styled.button<{ selected: boolean }>`
  padding: 1.5rem;
  background: ${props => props.selected ? '#E8F5E9' : 'white'};
  border: 3px solid ${props => props.selected ? '#4CAF50' : '#E0E0E0'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: ${props => props.selected ? '#4CAF50' : 'var(--button-primary)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const PresetIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`

const PresetName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 0.25rem;
`

const PresetDescription = styled.div`
  font-size: 0.85rem;
  color: #666666;
  line-height: 1.4;
`

const OverlaySection = styled.div`
  margin-bottom: 2rem;
`

const OverlayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`

const OverlayButton = styled.button<{ selected: boolean, color: string }>`
  padding: 1.5rem 1rem;
  background: ${props => props.color};
  border: 3px solid ${props => props.selected ? '#333333' : 'transparent'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  font-weight: 700;
  color: #333333;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`

const InfoBox = styled.div`
  padding: 1.5rem;
  background: #E3F2FD;
  border-left: 4px solid #2196F3;
  border-radius: 8px;
  margin-top: 2rem;
`

const InfoTitle = styled.h4`
  color: #333333;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const InfoText = styled.p`
  color: #555555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`

interface VisualDyslexiaProps {
  userId: string
}

type PresetType = 'default' | 'high-contrast' | 'minimal'

const PRESETS = {
  default: {
    name: 'Dyslexia Friendly',
    description: 'OpenDyslexic font, cream background, optimal spacing',
    icon: '✨',
    settings: {
      font: 'OpenDyslexic' as const,
      backgroundColor: '#FFFDD0',
      letterSpacing: 0.12,
      wordSpacing: 0.16,
      lineHeight: 1.5,
      colorOverlay: 'none' as ColorOverlay,
    }
  },
  'high-contrast': {
    name: 'High Contrast',
    description: 'Bold text, strong colors, maximum readability',
    icon: '🔆',
    settings: {
      font: 'OpenDyslexic' as const,
      backgroundColor: '#FFFFFF',
      letterSpacing: 0.15,
      wordSpacing: 0.2,
      lineHeight: 1.8,
      colorOverlay: 'none' as ColorOverlay,
    }
  },
  minimal: {
    name: 'Minimal',
    description: 'Clean and simple, reduced visual clutter',
    icon: '🎯',
    settings: {
      font: 'Lexend' as const,
      backgroundColor: '#F5F5F5',
      letterSpacing: 0.1,
      wordSpacing: 0.14,
      lineHeight: 1.6,
      colorOverlay: 'none' as ColorOverlay,
    }
  },
}

const OVERLAYS: { name: string, value: ColorOverlay, color: string }[] = [
  { name: 'None', value: 'none', color: '#FFFFFF' },
  { name: 'Yellow', value: 'yellow', color: '#FFF9C4' },
  { name: 'Blue', value: 'blue', color: '#BBDEFB' },
  { name: 'Green', value: 'green', color: '#C8E6C9' },
  { name: 'Pink', value: 'pink', color: '#F8BBD0' },
]

export const VisualDyslexia: React.FC<VisualDyslexiaProps> = ({ userId }) => {
  const [isEnabled, setIsEnabled] = useState(true)
  const [selectedPreset, setSelectedPreset] = useState<PresetType>('default')
  const [selectedOverlay, setSelectedOverlay] = useState<ColorOverlay>('none')

  useEffect(() => {
    // Load current settings
    themeEngine.loadPreferences(userId).then(prefs => {
      setSelectedOverlay(prefs.colorOverlay)
    })
  }, [userId])

  const handleToggle = () => {
    const newState = !isEnabled
    setIsEnabled(newState)

    if (newState) {
      // Enable dyslexia-friendly mode
      applyPreset(selectedPreset)
    } else {
      // Disable - revert to standard settings
      themeEngine.applyFont('Lexend')
      themeEngine.setBackgroundColor('#FFFFFF')
      themeEngine.setSpacing(0.05, 0.1, 1.2)
      themeEngine.applyColorOverlay('none')
    }
  }

  const applyPreset = (preset: PresetType) => {
    setSelectedPreset(preset)
    const settings = PRESETS[preset].settings

    themeEngine.applyFont(settings.font)
    themeEngine.setBackgroundColor(settings.backgroundColor)
    themeEngine.setSpacing(settings.letterSpacing, settings.wordSpacing, settings.lineHeight)
    themeEngine.applyColorOverlay(settings.colorOverlay)

    // Save preferences
    themeEngine.savePreferences(userId, {
      font: settings.font,
      backgroundColor: settings.backgroundColor,
      letterSpacing: settings.letterSpacing,
      wordSpacing: settings.wordSpacing,
      lineHeight: settings.lineHeight,
      colorOverlay: settings.colorOverlay,
    })
  }

  const handleOverlayChange = (overlay: ColorOverlay) => {
    setSelectedOverlay(overlay)
    themeEngine.applyColorOverlay(overlay)

    // Update saved preferences
    themeEngine.loadPreferences(userId).then(prefs => {
      themeEngine.savePreferences(userId, {
        ...prefs,
        colorOverlay: overlay,
      })
    })
  }

  return (
    <Container>
      <Title>Visual Dyslexia Support</Title>
      <Subtitle>
        Customize your reading experience with dyslexia-friendly fonts, colors, and spacing to reduce visual stress and improve readability.
      </Subtitle>

      <ToggleSection>
        <ToggleInfo>
          <ToggleTitle>Dyslexia-Friendly Mode</ToggleTitle>
          <ToggleDescription>
            Enable optimized settings for easier reading
          </ToggleDescription>
        </ToggleInfo>
        <ToggleSwitch>
          <ToggleInput
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggle}
            aria-label="Toggle dyslexia-friendly mode"
          />
          <ToggleSlider />
        </ToggleSwitch>
      </ToggleSection>

      {isEnabled && (
        <>
          <PresetsSection>
            <SectionTitle>Choose a Preset</SectionTitle>
            <PresetGrid>
              {(Object.keys(PRESETS) as PresetType[]).map(key => (
                <PresetCard
                  key={key}
                  selected={selectedPreset === key}
                  onClick={() => applyPreset(key)}
                  aria-label={`Select ${PRESETS[key].name} preset`}
                >
                  <PresetIcon>{PRESETS[key].icon}</PresetIcon>
                  <PresetName>{PRESETS[key].name}</PresetName>
                  <PresetDescription>{PRESETS[key].description}</PresetDescription>
                </PresetCard>
              ))}
            </PresetGrid>
          </PresetsSection>

          <OverlaySection>
            <SectionTitle>Color Overlay</SectionTitle>
            <OverlayGrid>
              {OVERLAYS.map(overlay => (
                <OverlayButton
                  key={overlay.value}
                  selected={selectedOverlay === overlay.value}
                  color={overlay.color}
                  onClick={() => handleOverlayChange(overlay.value)}
                  aria-label={`Select ${overlay.name} overlay`}
                >
                  {overlay.name}
                </OverlayButton>
              ))}
            </OverlayGrid>
          </OverlaySection>

          <InfoBox>
            <InfoTitle>
              <span role="img" aria-label="Info">💡</span>
              What is Visual Dyslexia Support?
            </InfoTitle>
            <InfoText>
              These settings help reduce visual stress by using specially designed fonts, adjusting spacing between letters and lines, and applying color overlays. This makes reading easier and more comfortable for people with dyslexia.
            </InfoText>
          </InfoBox>
        </>
      )}
    </Container>
  )
}
