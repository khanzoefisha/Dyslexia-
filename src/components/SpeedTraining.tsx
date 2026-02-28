import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import type { DrillType, Drill, ItemResult } from '../types'
import { generateDrill, getDrillTypeName } from '../data/drills'

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333333;
  font-weight: 700;
`

const ModeSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #F5F5DC;
  border-radius: 8px;
`

const ModeButton = styled.button<{ selected: boolean }>`
  padding: 0.875rem 1.5rem;
  background: ${props => props.selected ? 'var(--button-primary)' : 'white'};
  color: ${props => props.selected ? 'white' : '#333333'};
  border: 2px solid ${props => props.selected ? 'var(--button-primary)' : '#CCCCCC'};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    flex: 1;
    justify-content: center;
  }
`

const ModeInfo = styled.div`
  text-align: center;
  padding: 1rem;
  background: #E3F2FD;
  border: 2px solid #2196F3;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  color: #333333;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: 'ℹ️';
    font-size: 1.2rem;
  }
`

const DrillTypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const TypeButton = styled.button<{ selected: boolean }>`
  padding: 1.5rem 1rem;
  background: ${props => props.selected ? 'var(--button-primary)' : 'white'};
  color: ${props => props.selected ? 'white' : '#333333'};
  border: 2px solid ${props => props.selected ? 'var(--button-primary)' : '#CCCCCC'};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const DrillArea = styled.div<{ simplified?: boolean }>`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: ${props => props.simplified ? '#FFFFFF' : '#F5F5DC'};
  border-radius: 12px;
  margin: 2rem 0;
  position: relative;
  border: ${props => props.simplified ? '3px solid #4CAF50' : 'none'};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 300px;
  }
`

const StimulusDisplay = styled.div<{ enlarged?: boolean, simplified?: boolean }>`
  font-size: ${props => props.enlarged ? '8rem' : '6rem'};
  font-weight: 700;
  color: #333333;
  margin-bottom: 2rem;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: font-size 0.5s ease, transform 0.5s ease;
  transform: ${props => props.enlarged ? 'scale(1.1)' : 'scale(1)'};
  background: ${props => props.simplified ? '#FFFFFF' : 'transparent'};
  padding: ${props => props.simplified ? '2rem' : '0'};
  border-radius: ${props => props.simplified ? '16px' : '0'};
  box-shadow: ${props => props.simplified ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'};

  @media (max-width: 768px) {
    font-size: ${props => props.enlarged ? '5rem' : '4rem'};
    min-height: 80px;
  }
`

const VoiceIndicator = styled.div<{ isListening: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${props => props.isListening ? '#FFEBEE' : '#F5F5DC'};
  border: 2px solid ${props => props.isListening ? '#E74C3C' : '#CCCCCC'};
  border-radius: 12px;
  transition: all 0.3s ease;
`

const ListeningStatus = styled.div<{ isListening: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.isListening ? '#E74C3C' : '#555555'};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: ${props => props.isListening ? '"🔴"' : '"🎤"'};
    font-size: 1.5rem;
    animation: ${props => props.isListening ? 'pulse 1s infinite' : 'none'};
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`

const RecognizedText = styled.div`
  font-size: 1.1rem;
  color: #333333;
  font-weight: 500;
  min-height: 30px;
  font-style: italic;
`

const HintBox = styled.div<{ level: number }>`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${props => 
    props.level === 1 ? '#FFF9C4' : // Light yellow for first hint
    props.level === 2 ? '#FFE082' : // Darker yellow for second hint
    '#FFCC80' // Orange for final hint
  };
  border: 3px solid ${props =>
    props.level === 1 ? '#FBC02D' :
    props.level === 2 ? '#FFA726' :
    '#FF9800'
  };
  border-radius: 12px;
  text-align: center;
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const HintTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: '💡';
    font-size: 1.5rem;
  }
`

const HintText = styled.div`
  font-size: 1.2rem;
  color: #555555;
  font-weight: 600;
  line-height: 1.6;
`

const EncouragementText = styled.div`
  font-size: 0.95rem;
  color: #666666;
  margin-top: 0.5rem;
  font-style: italic;
`

const LatencyIndicator = styled.div<{ latency: number }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${props => 
    props.latency < 3000 ? '#E8F5E9' : // Green for fast
    props.latency < 6000 ? '#FFF9C4' : // Yellow for medium
    '#FFEBEE' // Red for slow
  };
  border: 2px solid ${props =>
    props.latency < 3000 ? '#4CAF50' :
    props.latency < 6000 ? '#FBC02D' :
    '#E74C3C'
  };
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333333;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #E0E0E0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
`

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
`

const ProgressText = styled.div`
  text-align: center;
  color: #555555;
  font-size: 0.95rem;
  margin-bottom: 2rem;
`

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  background: ${props => props.variant === 'secondary' ? 'white' : 'var(--button-primary)'};
  color: ${props => props.variant === 'secondary' ? '#333333' : 'white'};
  border: ${props => props.variant === 'secondary' ? '2px solid #CCCCCC' : 'none'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.variant === 'secondary' ? '#f8f9fa' : 'var(--button-hover)'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    flex: 1;
    min-width: 140px;
  }
`

const ResultsCard = styled.div`
  background: #F5F5DC;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
`

const ResultTitle = styled.h3`
  color: #333333;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
`

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--button-primary);
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #555555;
  font-weight: 600;
`

interface SpeedTrainingProps {
  initialDifficulty?: number
}

type TrainingMode = 'manual' | 'voice'

type AdaptiveState = {
  showHint: boolean
  enlargeText: boolean
  simplifyVisual: boolean
  encouragementLevel: number
}

export const SpeedTraining: React.FC<SpeedTrainingProps> = ({ initialDifficulty = 1 }) => {
  const [drillType, setDrillType] = useState<DrillType>('letters')
  const [difficulty, setDifficulty] = useState(initialDifficulty)
  const [currentDrill, setCurrentDrill] = useState<Drill | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [results, setResults] = useState<ItemResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [trainingMode, setTrainingMode] = useState<TrainingMode>('manual')
  const [isListening, setIsListening] = useState(false)
  const [recognizedText, setRecognizedText] = useState('')
  const startTimeRef = useRef<number>(0)
  const recognitionRef = useRef<any>(null)
  
  // Adaptive AI state
  const [adaptiveState, setAdaptiveState] = useState<AdaptiveState>({
    showHint: false,
    enlargeText: false,
    simplifyVisual: false,
    encouragementLevel: 0,
  })
  const [hintTimer, setHintTimer] = useState<number | null>(null)
  const [currentLatency, setCurrentLatency] = useState<number>(0)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVoiceRecognition()
      if (hintTimer) clearTimeout(hintTimer)
    }
  }, [hintTimer])

  // Adaptive AI: Monitor latency and provide hints
  useEffect(() => {
    if (!isActive || !currentDrill) return

    const elapsed = Date.now() - startTimeRef.current
    setCurrentLatency(elapsed)

    // Clear any existing timer
    if (hintTimer) clearTimeout(hintTimer)

    // Thresholds for adaptive feedback (in milliseconds)
    const HINT_THRESHOLD = 4000 // 4 seconds - show hint
    const ENLARGE_THRESHOLD = 6000 // 6 seconds - enlarge text
    const SIMPLIFY_THRESHOLD = 8000 // 8 seconds - simplify visual

    // Schedule progressive hints
    const timer = window.setTimeout(() => {
      if (elapsed >= HINT_THRESHOLD && !adaptiveState.showHint) {
        console.log('AI: Showing hint due to delay')
        setAdaptiveState(prev => ({ ...prev, showHint: true, encouragementLevel: 1 }))
      }
    }, HINT_THRESHOLD)

    const enlargeTimer = window.setTimeout(() => {
      if (elapsed >= ENLARGE_THRESHOLD && !adaptiveState.enlargeText) {
        console.log('AI: Enlarging text due to continued delay')
        setAdaptiveState(prev => ({ ...prev, enlargeText: true, encouragementLevel: 2 }))
      }
    }, ENLARGE_THRESHOLD)

    const simplifyTimer = window.setTimeout(() => {
      if (elapsed >= SIMPLIFY_THRESHOLD && !adaptiveState.simplifyVisual) {
        console.log('AI: Simplifying visual due to frustration')
        setAdaptiveState(prev => ({ ...prev, simplifyVisual: true, encouragementLevel: 3 }))
      }
    }, SIMPLIFY_THRESHOLD)

    setHintTimer(timer)

    return () => {
      clearTimeout(timer)
      clearTimeout(enlargeTimer)
      clearTimeout(simplifyTimer)
    }
  }, [isActive, currentIndex, startTimeRef.current])

  const startDrill = () => {
    const drill = generateDrill(drillType, difficulty, 10)
    setCurrentDrill(drill)
    setCurrentIndex(0)
    setResults([])
    setShowResults(false)
    setIsActive(true)
    setRecognizedText('')
    setAdaptiveState({
      showHint: false,
      enlargeText: false,
      simplifyVisual: false,
      encouragementLevel: 0,
    })
    startTimeRef.current = Date.now()
    
    console.log('Starting drill in mode:', trainingMode)
    
    if (trainingMode === 'voice') {
      // Small delay to ensure state is updated
      setTimeout(() => {
        startVoiceRecognition()
      }, 100)
    }
  }

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Switching to manual mode.')
      setTrainingMode('manual')
      return
    }

    // Stop any existing recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      console.log('Voice recognition started')
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
      console.log('Recognized:', transcript)
      setRecognizedText(transcript)
      
      if (event.results[event.results.length - 1].isFinal) {
        checkAnswer(transcript)
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      
      // Don't restart on certain errors
      if (event.error === 'aborted' || event.error === 'not-allowed') {
        return
      }
    }

    recognition.onend = () => {
      console.log('Voice recognition ended')
      setIsListening(false)
      
      // Restart recognition if drill is still active
      setTimeout(() => {
        if (recognitionRef.current && isActive) {
          try {
            recognitionRef.current.start()
          } catch (error) {
            console.error('Error restarting recognition:', error)
          }
        }
      }, 100)
    }

    recognitionRef.current = recognition
    
    try {
      recognition.start()
      console.log('Starting voice recognition...')
    } catch (error) {
      console.error('Error starting recognition:', error)
      setIsListening(false)
    }
  }

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setIsListening(false)
  }

  const checkAnswer = (spokenText: string) => {
    if (!currentDrill || !isActive) {
      console.log('Cannot check answer: drill not active')
      return
    }

    const currentItem = currentDrill.items[currentIndex]
    const targetText = currentItem.stimulus.toLowerCase()
    
    console.log('Checking answer:', { spokenText, targetText, drillType })
    
    // Check if spoken text matches the target
    let isCorrect = false
    
    if (drillType === 'numbers') {
      // For numbers, check both digit and word form
      const numberWords: { [key: string]: string } = {
        'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
        'ten': '10'
      }
      
      isCorrect = spokenText === targetText || 
                 spokenText.includes(targetText) ||
                 numberWords[spokenText] === targetText
    } else if (drillType === 'letters') {
      // For letters, check exact match or if it's contained
      isCorrect = spokenText === targetText || 
                 spokenText.includes(targetText) ||
                 spokenText === `letter ${targetText}` ||
                 spokenText.endsWith(targetText)
    } else {
      // For words and objects
      isCorrect = spokenText === targetText || 
                 spokenText.includes(targetText)
    }

    console.log('Answer is correct:', isCorrect)

    if (isCorrect) {
      handleNext()
    }
  }

  const handleNext = () => {
    if (!currentDrill || !isActive) return

    const responseTime = Date.now() - startTimeRef.current
    const newResult: ItemResult = {
      itemId: currentDrill.items[currentIndex].id,
      responseTime,
      correct: true,
    }

    const newResults = [...results, newResult]
    setResults(newResults)

    if (currentIndex < currentDrill.items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      startTimeRef.current = Date.now()
      setRecognizedText('')
      // Reset adaptive state for next item
      setAdaptiveState({
        showHint: false,
        enlargeText: false,
        simplifyVisual: false,
        encouragementLevel: 0,
      })
    } else {
      // Drill complete
      setIsActive(false)
      setShowResults(true)
      stopVoiceRecognition()
      if (hintTimer) clearTimeout(hintTimer)
    }
  }

  const calculateStats = () => {
    if (results.length === 0) return { avgTime: 0, accuracy: 0, itemsPerMinute: 0 }

    const totalTime = results.reduce((sum, r) => sum + r.responseTime, 0)
    const avgTime = totalTime / results.length
    const correctCount = results.filter(r => r.correct).length
    const accuracy = (correctCount / results.length) * 100
    const itemsPerMinute = (60000 / avgTime).toFixed(1)

    return {
      avgTime: (avgTime / 1000).toFixed(2),
      accuracy: accuracy.toFixed(0),
      itemsPerMinute,
    }
  }

  const stats = calculateStats()
  const progress = currentDrill ? ((currentIndex + 1) / currentDrill.items.length) * 100 : 0

  return (
    <Container>
      <Title>Speed Training - Rapid Naming</Title>

      <ModeSelector>
        <ModeButton
          selected={trainingMode === 'manual'}
          onClick={() => setTrainingMode('manual')}
          aria-label="Select manual mode"
        >
          <span role="img" aria-label="Hand icon">✋</span>
          <span>Manual Mode</span>
        </ModeButton>
        <ModeButton
          selected={trainingMode === 'voice'}
          onClick={() => setTrainingMode('voice')}
          aria-label="Select voice mode"
        >
          <span role="img" aria-label="Microphone icon">🎤</span>
          <span>Voice Mode</span>
        </ModeButton>
      </ModeSelector>

      {trainingMode === 'voice' && !isActive && (
        <ModeInfo>
          Voice Mode: Speak each item clearly. The system will automatically move to the next item when it recognizes your answer.
        </ModeInfo>
      )}

      {!isActive && !showResults && (
        <>
          <DrillTypeSelector>
            <TypeButton
              selected={drillType === 'letters'}
              onClick={() => setDrillType('letters')}
              aria-label="Select letters drill"
            >
              <span role="img" aria-label="Letters icon" style={{ fontSize: '2rem' }}>🔤</span>
              <span>Letters</span>
            </TypeButton>
            <TypeButton
              selected={drillType === 'numbers'}
              onClick={() => setDrillType('numbers')}
              aria-label="Select numbers drill"
            >
              <span role="img" aria-label="Numbers icon" style={{ fontSize: '2rem' }}>🔢</span>
              <span>Numbers</span>
            </TypeButton>
            <TypeButton
              selected={drillType === 'words'}
              onClick={() => setDrillType('words')}
              aria-label="Select words drill"
            >
              <span role="img" aria-label="Words icon" style={{ fontSize: '2rem' }}>📝</span>
              <span>Words</span>
            </TypeButton>
            <TypeButton
              selected={drillType === 'objects'}
              onClick={() => setDrillType('objects')}
              aria-label="Select objects drill"
            >
              <span role="img" aria-label="Objects icon" style={{ fontSize: '2rem' }}>🎨</span>
              <span>Objects</span>
            </TypeButton>
          </DrillTypeSelector>

          <DrillArea>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ color: '#333333', marginBottom: '1rem', fontWeight: 700 }}>
                Ready to start?
              </h3>
              <p style={{ color: '#555555', marginBottom: '2rem' }}>
                Name each {getDrillTypeName(drillType).toLowerCase()} as quickly as you can!
              </p>
              <Button onClick={startDrill} aria-label="Start drill">
                <span role="img" aria-label="Play icon">▶️</span>
                Start Drill
              </Button>
            </div>
          </DrillArea>
        </>
      )}

      {isActive && currentDrill && (
        <>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
          <ProgressText>
            Item {currentIndex + 1} of {currentDrill.items.length}
          </ProgressText>

          <DrillArea simplified={adaptiveState.simplifyVisual}>
            {/* Latency indicator */}
            <LatencyIndicator latency={currentLatency}>
              ⏱️ {(currentLatency / 1000).toFixed(1)}s
            </LatencyIndicator>

            <StimulusDisplay 
              enlarged={adaptiveState.enlargeText}
              simplified={adaptiveState.simplifyVisual}
            >
              {currentDrill.items[currentIndex].stimulus}
            </StimulusDisplay>

            {/* Adaptive AI Hints */}
            {adaptiveState.showHint && currentDrill.items[currentIndex].hint && (
              <HintBox level={adaptiveState.encouragementLevel}>
                <HintTitle>
                  {adaptiveState.encouragementLevel === 1 && 'Hint'}
                  {adaptiveState.encouragementLevel === 2 && 'Extra Help'}
                  {adaptiveState.encouragementLevel === 3 && 'You Got This!'}
                </HintTitle>
                <HintText>{currentDrill.items[currentIndex].hint}</HintText>
                {currentDrill.items[currentIndex].soundHint && (
                  <EncouragementText>
                    {currentDrill.items[currentIndex].soundHint}
                  </EncouragementText>
                )}
                {adaptiveState.encouragementLevel >= 2 && (
                  <EncouragementText>
                    Take your time! There's no rush. 😊
                  </EncouragementText>
                )}
              </HintBox>
            )}

            {trainingMode === 'voice' ? (
              <VoiceIndicator isListening={isListening}>
                <ListeningStatus isListening={isListening}>
                  {isListening ? 'Listening...' : 'Voice Recognition Active'}
                </ListeningStatus>
                {recognizedText && (
                  <RecognizedText>
                    You said: "{recognizedText}"
                  </RecognizedText>
                )}
                <Button onClick={handleNext} variant="secondary" aria-label="Skip to next item">
                  <span role="img" aria-label="Skip icon">⏭️</span>
                  Skip
                </Button>
              </VoiceIndicator>
            ) : (
              <Button onClick={handleNext} aria-label="Next item">
                <span role="img" aria-label="Next icon">➡️</span>
                Next
              </Button>
            )}
          </DrillArea>
        </>
      )}

      {showResults && (
        <ResultsCard>
          <ResultTitle>🎉 Drill Complete!</ResultTitle>
          
          <StatGrid>
            <StatCard>
              <StatValue>{stats.avgTime}s</StatValue>
              <StatLabel>Avg Response Time</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.accuracy}%</StatValue>
              <StatLabel>Accuracy</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.itemsPerMinute}</StatValue>
              <StatLabel>Items/Minute</StatLabel>
            </StatCard>
          </StatGrid>

          <Controls>
            <Button onClick={startDrill} aria-label="Try again">
              <span role="img" aria-label="Replay icon">🔄</span>
              Try Again
            </Button>
            <Button variant="secondary" onClick={() => setShowResults(false)} aria-label="Change drill type">
              <span role="img" aria-label="Settings icon">⚙️</span>
              Change Type
            </Button>
          </Controls>
        </ResultsCard>
      )}
    </Container>
  )
}
